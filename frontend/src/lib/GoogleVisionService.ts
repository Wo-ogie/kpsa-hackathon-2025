import type { OCRResult, OCRTextBlock, PrescriptionType } from '../types/prescription';
import { prescriptionAPI } from './api';
import { PrescriptionParserManager } from './prescriptionParserManager';
import type { BackendPrescriptionParseResult } from '../types/backendPrescription';
import { mapBackendDrugToMedication } from '../types/backendPrescription';

// Google Vision API 응답 타입 정의
interface GoogleVisionTextBlock {
  boundingBox: {
    vertices: Array<{ x: number; y: number }>;
  };
  paragraphs: Array<{
    boundingBox: {
      vertices: Array<{ x: number; y: number }>;
    };
    words: Array<{
      boundingBox: {
        vertices: Array<{ x: number; y: number }>;
      };
      symbols: Array<{
        text: string;
        confidence: number;
      }>;
    }>;
  }>;
}

export class GoogleVisionService {
  private apiKey: string;
  private parserManager: PrescriptionParserManager;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.parserManager = new PrescriptionParserManager();
  }

  async analyzePrescription(imageFile: File): Promise<OCRResult> {
    try {
      console.log('Google Vision API 분석 시작...');

      // 이미지를 base64로 변환
      const base64Image = await this.fileToBase64(imageFile);
      console.log('이미지 base64 변환 완료');

      // Google Vision API 호출 (bounding box 정보 포함)
      const { text, blocks } = await this.detectText(base64Image);
      console.log('Google Vision API 텍스트 추출 완료');

      // Google Vision 블록을 OCRTextBlock으로 변환
      const ocrBlocks = this.convertToOCRTextBlocks(blocks);
      console.log('OCR 블록 변환 완료:', ocrBlocks.length);

      // 하이브리드 접근: 프론트엔드 기본 + 백엔드 정교 파싱
      const result = await this.hybridParsing(ocrBlocks, base64Image, text);

      return result;

    } catch (error) {
      console.error('Google Vision API 분석 실패:', error);
      return {
        success: false,
        error: '처방전을 인식할 수 없습니다. 이미지가 선명한지 확인해주세요.',
        confidence: 0,
        rawText: '',
        blocks: [],
        type: {
          type: 'unknown',
          confidence: 0,
          indicators: {
            hasHospitalName: false,
            hasPharmacyName: false,
            hasDoctorName: false,
            hasPharmacistName: false,
            hasInsuranceInfo: false,
            hasTableStructure: false
          }
        }
      };
    }
  }

  /**
   * 하이브리드 파싱: 프론트엔드 기본 + 백엔드 정교
   */
  private async hybridParsing(ocrBlocks: OCRTextBlock[], base64Image: string, rawText: string): Promise<OCRResult> {
    try {
      // 1. 프론트엔드에서 기본 파싱 (빠른 응답)
      const frontendResult = this.parserManager.parse(ocrBlocks);
      console.log('프론트엔드 기본 파싱 완료:', frontendResult);

      // 2. 백엔드로 전송하여 정교한 파싱 (선택적)
      const backendResult = await this.sendToBackend(rawText);

      if (backendResult && backendResult.success && backendResult.data) {
        console.log('백엔드 정교 파싱 완료:', backendResult);
        // 백엔드 결과를 Medication[]으로 변환
        const backendMedications = backendResult.data;
        return {
          success: true,
          data: {
            ...frontendResult,
            medications: backendMedications,
          },
          confidence: frontendResult.confidence,
          rawText: rawText,
          blocks: ocrBlocks,
          type: {
            type: frontendResult.sourceType,
            confidence: frontendResult.confidence,
            indicators: {
              hasHospitalName: frontendResult.issuingPlace.includes('병원') || frontendResult.issuingPlace.includes('의원'),
              hasPharmacyName: frontendResult.issuingPlace.includes('약국'),
              hasDoctorName: frontendResult.prescriber.length > 0 && !frontendResult.prescriber.includes('약사'),
              hasPharmacistName: frontendResult.prescriber.includes('약사'),
              hasInsuranceInfo: !!frontendResult.insuranceType,
              hasTableStructure: backendMedications.length > 0
            }
          }
        };
      }

      // 3. 프론트엔드 결과 반환 (백엔드 실패 또는 프론트엔드가 더 정확한 경우)
      const type: PrescriptionType = {
        type: frontendResult.sourceType,
        confidence: frontendResult.confidence,
        indicators: {
          hasHospitalName: frontendResult.issuingPlace.includes('병원') || frontendResult.issuingPlace.includes('의원'),
          hasPharmacyName: frontendResult.issuingPlace.includes('약국'),
          hasDoctorName: frontendResult.prescriber.length > 0 && !frontendResult.prescriber.includes('약사'),
          hasPharmacistName: frontendResult.prescriber.includes('약사'),
          hasInsuranceInfo: !!frontendResult.insuranceType,
          hasTableStructure: frontendResult.medications.length > 0
        }
      };

      return {
        success: true,
        data: frontendResult,
        confidence: frontendResult.confidence,
        rawText: rawText,
        blocks: ocrBlocks,
        type: type
      };

    } catch (error) {
      console.error('하이브리드 파싱 중 오류:', error);

      // 오류 시 프론트엔드 결과만 반환
      const fallbackResult = this.parserManager.parse(ocrBlocks);

      const type: PrescriptionType = {
        type: fallbackResult.sourceType,
        confidence: fallbackResult.confidence * 0.5, // 신뢰도 낮춤
        indicators: {
          hasHospitalName: fallbackResult.issuingPlace.includes('병원') || fallbackResult.issuingPlace.includes('의원'),
          hasPharmacyName: fallbackResult.issuingPlace.includes('약국'),
          hasDoctorName: fallbackResult.prescriber.length > 0 && !fallbackResult.prescriber.includes('약사'),
          hasPharmacistName: fallbackResult.prescriber.includes('약사'),
          hasInsuranceInfo: !!fallbackResult.insuranceType,
          hasTableStructure: fallbackResult.medications.length > 0
        }
      };

      return {
        success: true,
        data: fallbackResult,
        confidence: fallbackResult.confidence * 0.5,
        rawText: rawText,
        blocks: ocrBlocks,
        type: type
      };
    }
  }

  /**
 * 백엔드로 데이터 전송
 */
  private async sendToBackend(rawText: string): Promise<{ success: boolean; data: import('../types/prescription').Medication[] } | null> {
    try {
      // 백엔드 파싱 비활성화된 경우 스킵
      if (import.meta.env.VITE_ENABLE_BACKEND_PARSING === 'false') {
        console.log('백엔드 파싱이 비활성화되어 있습니다.');
        return null;
      }

      // 백엔드 API 엔드포인트
      const timeout = parseInt(import.meta.env.VITE_BACKEND_TIMEOUT || '10000');


      // 타임아웃 설정
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await prescriptionAPI.parsePrescription(rawText) as BackendPrescriptionParseResult;
      clearTimeout(timeoutId);

      const medications = response.drugs.map(mapBackendDrugToMedication);
      return { success: true, data: medications };

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('백엔드 요청 타임아웃');
      } else {
        console.error('백엔드 전송 실패:', error);
      }
      return null;
    }
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // data:image/jpeg;base64, 부분 제거
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  private async detectText(base64Image: string): Promise<{ text: string; blocks: GoogleVisionTextBlock[] }> {
    const url = `https://vision.googleapis.com/v1/images:annotate?key=${this.apiKey}`;

    const requestBody = {
      requests: [
        {
          image: {
            content: base64Image
          },
          features: [
            {
              type: 'DOCUMENT_TEXT_DETECTION',
              maxResults: 1
            }
          ],
          imageContext: {
            languageHints: ['ko', 'en'] // 한국어 우선, 영어 보조
          }
        }
      ]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Google Vision API 오류: ${response.status}`);
    }

    const result = await response.json();
    console.log('Google Vision API 전체 결과:', result);

    if (result.responses && result.responses[0] && result.responses[0].fullTextAnnotation) {
      const fullTextAnnotation = result.responses[0].fullTextAnnotation;
      const text = fullTextAnnotation.text || '';
      const blocks = fullTextAnnotation.pages?.[0]?.blocks || [];

      console.log('추출된 텍스트:', text);
      console.log('텍스트 블록들:', blocks);

      return { text, blocks };
    }

    return { text: '', blocks: [] };
  }

  /**
   * Google Vision 블록을 OCRTextBlock으로 변환
   */
  private convertToOCRTextBlocks(blocks: GoogleVisionTextBlock[]): OCRTextBlock[] {
    const ocrBlocks: OCRTextBlock[] = [];

    blocks.forEach(block => {
      block.paragraphs.forEach(paragraph => {
        paragraph.words.forEach(word => {
          const text = word.symbols.map(symbol => symbol.text).join('');
          const vertices = word.boundingBox.vertices;

          // 중심점과 크기 계산
          const centerX = vertices.reduce((sum, v) => sum + v.x, 0) / vertices.length;
          const centerY = vertices.reduce((sum, v) => sum + v.y, 0) / vertices.length;

          const minX = Math.min(...vertices.map(v => v.x));
          const maxX = Math.max(...vertices.map(v => v.x));
          const minY = Math.min(...vertices.map(v => v.y));
          const maxY = Math.max(...vertices.map(v => v.y));

          const width = maxX - minX;
          const height = maxY - minY;

          // 평균 신뢰도 계산
          const avgConfidence = word.symbols.reduce((sum, symbol) => sum + symbol.confidence, 0) / word.symbols.length;

          ocrBlocks.push({
            text: text,
            boundingBox: {
              x: centerX,
              y: centerY,
              width: width,
              height: height,
              vertices: vertices
            },
            confidence: avgConfidence
          });
        });
      });
    });

    console.log('변환된 OCR 블록 수:', ocrBlocks.length);
    return ocrBlocks;
  }
}

// 싱글톤 인스턴스 (API 키는 환경변수에서 가져옴)
export const googleVisionService = new GoogleVisionService(
  import.meta.env.VITE_GOOGLE_CLOUD_API_KEY || ''
); 