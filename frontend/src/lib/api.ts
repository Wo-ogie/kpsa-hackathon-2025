const API_BASE_URL = import.meta.env.VITE_API_URL;
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;

// 쿠키 저장 함수
const saveCookiesFromResponse = (response: Response) => {
  const setCookieHeader = response.headers.get('set-cookie');
  console.log('setCookieHeader', setCookieHeader);
  if (setCookieHeader) {
    // 여러 쿠키가 있을 수 있으므로 배열로 처리
    const cookies = setCookieHeader.split(',').map(cookie => cookie.trim());
    localStorage.setItem('apiCookies', JSON.stringify(cookies));
  }
};

// API 클라이언트 설정
const apiClient = {
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    // 저장된 쿠키 가져오기
    const savedCookies = localStorage.getItem('apiCookies');
    let cookieHeader = '';
    const cookies = document.cookie;
    console.log('cookies', cookies);

    if (savedCookies) {
      try {
        const cookies = JSON.parse(savedCookies);
        cookieHeader = cookies.join('; ');
      } catch (error) {
        console.error('쿠키 파싱 오류:', error);
      }
    }

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(cookieHeader && { 'Cookie': cookieHeader }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      // 응답에서 쿠키 저장
      saveCookiesFromResponse(response);

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


  /**
   * 
   * @param prescriptionData {
  "name": "string",
  "medication_start_date": "2025-07-26",
  "medication_times": [
    "MORNING"
  ],
  "drugs": [
    {
      "name": "string",
      "dose_per_time": 0,
      "times_per_day": 1,
      "days": 0
    }
  ]
}
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
  }) => apiClient.post('/prescriptions', prescriptionData),
};

// Drug API
export const drugAPI = {
  // 약 이름 검색
  searchDrugNames: (query: string): Promise<{ drug_names: string[] }> =>
    apiClient.get<{ drug_names: string[] }>(`/drugs/names/search?name=${query}`),
};

export default apiClient; 