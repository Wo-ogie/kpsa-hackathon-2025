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
    dose_per_time: Number(drug.dose_per_time),
    times_per_day: Number(drug.times_per_day),
    days: Number(drug.days),
    ingredient: '',
  };
} 