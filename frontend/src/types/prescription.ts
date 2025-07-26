// 공통 처방전 데이터 모델
export interface PrescriptionBase {
  // 기본 환자 정보
  patientName: string;
  birthDate: string;
  patientId?: string;

  // 처방 정보
  prescriptionDate: string;
  prescriber: string; // 처방의/약사
  issuingPlace: string; // 병원명/약국명
  doctorName?: string; // 의사명
  hospitalName?: string; // 병원명

  // 약물 정보
  medications: Medication[];

  // 기타 공통 필드
  totalDays?: number;
  insuranceType?: string;

  // 병원/약국별 특이 필드 (동적 확장)
  extraFields?: Record<string, unknown>;

  // 메타데이터
  sourceType: 'hospital' | 'pharmacy' | 'unknown';
  confidence: number;
  rawText: string;
}

// 약물 정보 모델
export interface Medication {
  name: string;
  dose_per_time: number;
  times_per_day: number;
  days: number;
  ingredient?: string;
  extraFields?: Record<string, unknown>;
}

// OCR 텍스트 블록 모델
export interface OCRTextBlock {
  text: string;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
    vertices: Array<{ x: number; y: number }>;
  };
  confidence: number;
  lineIndex?: number;
  columnIndex?: number;
}

// 처방전 유형 분류 결과
export interface PrescriptionType {
  type: 'hospital' | 'pharmacy' | 'unknown';
  confidence: number;
  indicators: {
    hasHospitalName: boolean;
    hasPharmacyName: boolean;
    hasDoctorName: boolean;
    hasPharmacistName: boolean;
    hasInsuranceInfo: boolean;
    hasTableStructure: boolean;
  };
}

// OCR 결과 모델
export interface OCRResult {
  success: boolean;
  data?: PrescriptionBase;
  error?: string;
  confidence?: number;
  rawText?: string;
  blocks?: OCRTextBlock[];
  type?: PrescriptionType;
}

// 파서 인터페이스
export interface PrescriptionParser {
  canParse(blocks: OCRTextBlock[], type: PrescriptionType): boolean;
  parse(blocks: OCRTextBlock[], type: PrescriptionType): PrescriptionBase;
}

// 기존 타입들 (하위 호환성 유지)
export type PrescriptionData = PrescriptionBase;

export interface UploadedImage {
  file: File;
  preview: string;
  id: string;
} 