import { Prescription } from "./prescription";

export interface FamilyMember {
  id: number;
  nickname: string;
  is_guardian: boolean;
  allow_view_medication: boolean;
  allow_alarm: boolean;
  created_at: string;
  updated_at: string;
}

export interface MedicationHistory {
  id: number;
  prescription: Prescription;
  medication_time: string;
  created_at: string;
  updated_at: string;
}
export interface Notification {
  id: number;
  title: string;
  content: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}