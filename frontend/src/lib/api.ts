const API_BASE_URL = import.meta.env.VITE_API_URL;
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;
import { Plant, HarvestFruitResponse, ActivePlant } from '../types/plant'
import { Prescription, PrescriptionResponse } from '../types/prescription'
import { FamilyMember } from '../types'

// 쿠키 및 헤더 저장 함수
const saveHeadersFromResponse = (response: Response) => {
  // Set-Cookie 헤더 처리
  const setCookieHeader = response.headers.get('set-cookie');
  console.log('setCookieHeader', setCookieHeader);
  if (setCookieHeader) {
    // 여러 쿠키가 있을 수 있으므로 배열로 처리
    const cookies = setCookieHeader.split(',').map(cookie => cookie.trim());
    localStorage.setItem('apiCookies', JSON.stringify(cookies));
  }

  // X-User-Id 헤더 처리
  const userId = response.headers.get('X-User-Id');
  if (userId) {
    localStorage.setItem('userId', userId);
  }
};

// API 클라이언트 설정
const apiClient = {
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    // 저장된 User-Id 가져오기
    const savedUserId = localStorage.getItem('userId');

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': savedUserId || '',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      // 응답에서 쿠키 및 헤더 저장
      saveHeadersFromResponse(response);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  },

  post<T>(endpoint: string, data?: Record<string, unknown>): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  put<T>(endpoint: string, data?: Record<string, unknown>): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  },
};

// Auth API
export const authAPI = {
  // 세션 조회
  getSessions: () => apiClient.get('/auth/sessions'),

  // 현재 사용자 ID 조회
  getCurrentUserId: () => apiClient.get('/auth/current-user-id'),

  // 카카오 로그인
  loginWithKakao: (code: string) =>
    apiClient.post('/auth/login/kakao', {
      "authorization_code": code,
      "redirect_url": `${CLIENT_URL}/kakao-callback`
    }),

  // 카카오 토큰 로그인
  loginWithKakaoToken: (token: string) =>
    apiClient.post('/auth/login/kakao/token', { token }),

  // 회원가입
  signup: (userData: {
    nickname: string;
    phone_number: string;
    is_guardian: boolean;
  }) => apiClient.post('/auth/signup', userData),
};

// Prescription API
export const prescriptionAPI = {
  // 처방전 텍스트 분석
  parsePrescription: (text: string) =>
    apiClient.post('/prescriptions/parse', { text }),


  /**
   * 
   * @param prescriptionData {
   * @returns 
   */
  registerPrescription: (prescriptionData: {
    drugs: Array<{
      name: string;
      dose_per_time: number;
      times_per_day: number;
      days: number;
    }>;
    name: string;
    medication_start_date: string;
    medication_times: string[];
  }, userId?: boolean) => {
    if (!userId) {
      return apiClient.post<PrescriptionResponse>('/users/me/prescriptions', prescriptionData)
    } else {
      return apiClient.post<PrescriptionResponse>(`/users/${userId}/prescriptions`, prescriptionData)
    }
  },
};

// Drug API
export const drugAPI = {
  // 약 이름 검색
  searchDrugNames: (query: string): Promise<{ drug_names: string[] }> =>
    apiClient.get<{ drug_names: string[] }>(`/drugs/names/search?name=${query}`),
  getPrescriptions: (user_id: number) =>
    apiClient.get<{ prescriptions: Prescription[] }>(`/users/${user_id}/prescriptions`),
};

// Plant API
export const plantAPI = {
  // 현재 키우고 있는 식물 조회
  getActivePlants: () => apiClient.get<{ active_plant: boolean | Plant }>('/plants/active'),

  // 식물 심기
  plantTree: (plant_id: number) => apiClient.post<Plant>('/plants/plant', { plant_id }),

  // 키우고 있는 식물 열매 수확
  harvestFruit: () =>
    apiClient.post<HarvestFruitResponse>(`/plants/active/harvest`),

  // 키우고 있는 식물의 별명 수정
  updatePlantNickname: (plantId: string, nickname: string) =>
    apiClient.put(`/plants/active/nicknames`, { plantId, nickname }),

  verifyMedication: (medication_time: string, prescription_ids: number[]) =>
    apiClient.post<{ active_plant: Plant }>(`/medications/verify`, { medication_time, prescription_ids }),

  changeNickname: (nickname: string) =>
    apiClient.put<{ active_plant: Plant }>(`/plants/active/nicknames`, { nickname }),
};


export const familyAPI = {
  getFamily: () => apiClient.get<{ family_members: FamilyMember[] }>(`/families`),
  addFamily: (target_phone_number: string, target_nickname: string, allow_view_medication: boolean, allow_alarm: boolean) =>
    apiClient.post<{ family_members: FamilyMember[] }>(`/families`, { target_phone_number, target_nickname, allow_view_medication, allow_alarm }),

  getFamilyAlbum: (family_id: number) =>
    apiClient.get<{ plants: Plant[] }>(`/users/${family_id}/plant-albums`),

  getMyAlbum: () =>
    apiClient.get<{ plants: ActivePlant[] }>(`/users/me/plant-albums`),
};

export default apiClient; 