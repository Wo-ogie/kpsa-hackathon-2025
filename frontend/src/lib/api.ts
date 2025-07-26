const API_BASE_URL = import.meta.env.VITE_API_URL;
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;

// API 클라이언트 설정
const apiClient = {
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // 토큰이 있으면 헤더에 추가
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);

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

  post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
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
    is_guardian: string;
  }) => apiClient.post('/auth/signup', userData),
};

// Prescription API
export const prescriptionAPI = {
  // 처방전 텍스트 분석
  parsePrescription: (text: string) =>
    apiClient.post('/prescriptions/parse', { text }),

  // 처방전 등록
  registerPrescription: (prescriptionData: {
    drugs: Array<{
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
    }>;
    hospital: string;
    doctor: string;
    prescriptionDate: string;
  }) => apiClient.post('/prescriptions', prescriptionData),
};

// Drug API
export const drugAPI = {
  // 약 이름 검색
  searchDrugNames: (query: string) =>
    apiClient.get(`/drugs/names/search?q=${encodeURIComponent(query)}`),
};

export default apiClient; 