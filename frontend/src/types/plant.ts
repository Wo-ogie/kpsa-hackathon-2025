// 기본 식물 정보 타입
export interface Plant {
  id: number;
  name: string;
  max_fruit_count: number;
  point_per_fruit: number;
  unlock_price: number;
  plant_price: number;
  growth_increment: number;
}

// 사용자의 활성 식물 타입
export interface ActivePlant {
  id: number;
  nickname: string;
  growth: number;
  fruit_count: number;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
  plant: Plant;
}

// 과일 수확 API 응답 타입
export interface HarvestFruitResponse {
  active_plant: ActivePlant;
  current_user_point: number;
  points_earned: number;
  remaining_fruit_count: number;
}

// 사용자 포인트 정보 타입
export interface UserPointInfo {
  current_user_point: number;
  points_earned: number;
}