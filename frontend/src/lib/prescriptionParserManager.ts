import type { OCRTextBlock, PrescriptionBase, PrescriptionType, Medication } from '../types/prescription';

export class PrescriptionParserManager {
  parse(ocrBlocks: OCRTextBlock[]): PrescriptionBase {
    // 기본 파싱 로직 구현
    const text = ocrBlocks.map(block => block.text).join(' ');

    // 간단한 파싱 예시 (실제로는 더 정교한 로직 필요)
    const medications = this.extractMedications(text);
    const issuingPlace = this.extractIssuingPlace(text);
    const prescriber = this.extractPrescriber(text);
    const patientName = this.extractPatientName(text);
    const prescriptionDate = this.extractPrescriptionDate(text);

    return {
      // 기본 환자 정보
      patientName: patientName,
      birthDate: this.extractBirthDate(text),
      patientId: this.extractPatientId(text),

      // 처방 정보
      prescriptionDate: prescriptionDate,
      prescriber: prescriber,
      issuingPlace: issuingPlace,
      doctorName: this.extractDoctorName(text),
      hospitalName: this.extractHospitalName(text),

      // 약물 정보
      medications: medications,

      // 기타 공통 필드
      totalDays: this.extractTotalDays(text),
      insuranceType: this.extractInsuranceType(text),

      // 메타데이터
      sourceType: this.determineSourceType(text),
      confidence: 0.8,
      rawText: text
    };
  }

  private extractMedications(text: string): Medication[] {
    const medications: Medication[] = [];

    // 텍스트에서 약물명 패턴 찾기 (예시)
    const medicinePatterns = [
      /([가-힣]+정)/g,
      /([가-힣]+캡슐)/g,
      /([가-힣]+시럽)/g,
      /([가-힣]+주사액)/g
    ];

    medicinePatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        matches.forEach(match => {
          medications.push({
            name: match,
            dosage: '1정',
            frequency: '1일 3회',
            duration: '7일',
            instructions: '식후 30분 복용',
            quantity: '30',
            unit: '정'
          });
        });
      }
    });

    return medications;
  }

  private extractIssuingPlace(text: string): string {
    // 발행처 추출 로직
    const hospitalPattern = /([가-힣]+병원)/;
    const clinicPattern = /([가-힣]+의원)/;
    const pharmacyPattern = /([가-힣]+약국)/;

    const hospitalMatch = text.match(hospitalPattern);
    const clinicMatch = text.match(clinicPattern);
    const pharmacyMatch = text.match(pharmacyPattern);

    if (hospitalMatch) return hospitalMatch[1];
    if (clinicMatch) return clinicMatch[1];
    if (pharmacyMatch) return pharmacyMatch[1];

    return '알 수 없음';
  }

  private extractPrescriber(text: string): string {
    // 처방자 추출 로직
    const doctorPattern = /([가-힣]+의사)/;
    const pharmacistPattern = /([가-힣]+약사)/;

    const doctorMatch = text.match(doctorPattern);
    const pharmacistMatch = text.match(pharmacistPattern);

    if (doctorMatch) return doctorMatch[1];
    if (pharmacistMatch) return pharmacistMatch[1];

    return '알 수 없음';
  }

  private extractPatientName(text: string): string {
    // 환자명 추출 로직
    const namePattern = /환자명[:\s]*([가-힣]{2,4})/;
    const match = text.match(namePattern);
    return match ? match[1] : '알 수 없음';
  }

  private extractBirthDate(text: string): string {
    // 생년월일 추출 로직
    const birthPattern = /생년월일[:\s]*(\d{4}[년\-\/]\d{1,2}[월\-\/]\d{1,2}[일]?)/;
    const match = text.match(birthPattern);
    return match ? match[1] : '';
  }

  private extractPatientId(text: string): string {
    // 환자 ID 추출 로직
    const idPattern = /환자번호[:\s]*([A-Z0-9]+)/;
    const match = text.match(idPattern);
    return match ? match[1] : '';
  }

  private extractPrescriptionDate(text: string): string {
    // 처방일 추출 로직
    const datePattern = /처방일[:\s]*(\d{4}[년\-\/]\d{1,2}[월\-\/]\d{1,2}[일]?)/;
    const match = text.match(datePattern);
    return match ? match[1] : new Date().toISOString().split('T')[0];
  }

  private extractDoctorName(text: string): string {
    // 의사명 추출 로직
    const doctorPattern = /([가-힣]{2,4})의사/;
    const match = text.match(doctorPattern);
    return match ? match[1] : '';
  }

  private extractHospitalName(text: string): string {
    // 병원명 추출 로직
    const hospitalPattern = /([가-힣]+병원)/;
    const match = text.match(hospitalPattern);
    return match ? match[1] : '';
  }

  private extractTotalDays(text: string): number {
    // 총 복용일수 추출 로직
    const daysPattern = /(\d+)일/;
    const match = text.match(daysPattern);
    return match ? parseInt(match[1]) : 7;
  }

  private extractInsuranceType(text: string): string {
    // 보험 유형 추출 로직
    if (text.includes('국민건강보험')) return '국민건강보험';
    if (text.includes('의료급여')) return '의료급여';
    if (text.includes('자비')) return '자비';
    return '';
  }

  private determineSourceType(text: string): 'hospital' | 'pharmacy' | 'unknown' {
    // 처방전 유형 판별 로직
    if (text.includes('병원') || text.includes('의원') || text.includes('의사')) {
      return 'hospital';
    }
    if (text.includes('약국') || text.includes('약사')) {
      return 'pharmacy';
    }
    return 'unknown';
  }
} 