export interface BackendDrug {
  drug: string;
  dose_per_time: string;
  times_per_day: string;
  days: string;
}

export interface BackendPrescriptionParseResult {
  drugs: BackendDrug[];
}

// Medication 변환 함수
import type { Medication } from './prescription';

export function mapBackendDrugToMedication(drug: BackendDrug): Medication {
  return {
    name: drug.drug,
    dosage: drug.dose_per_time,
    frequency: drug.times_per_day,
    duration: drug.days,
    instructions: '',
  };
} 