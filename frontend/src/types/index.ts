export interface FamilyMember {
  id: number;
  nickname: string;
  is_guardian: boolean;
  allow_view_medication: boolean;
  allow_alarm: boolean;
  created_at: string;
  updated_at: string;
}