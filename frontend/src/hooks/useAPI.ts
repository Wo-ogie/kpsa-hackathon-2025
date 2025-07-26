import { useState, useCallback } from 'react';
import { authAPI, prescriptionAPI, drugAPI } from '../lib/api';

// Auth 훅들
export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginWithKakao = useCallback(async (code: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.loginWithKakao(code);
      // 토큰 저장
      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
      }
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인 실패');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (userData: {
    nickname: string;
    phone_number: string;
    is_guardian: boolean;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.signup(userData);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입 실패');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCurrentUserId = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.getCurrentUserId();
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : '사용자 정보 조회 실패');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loginWithKakao,
    signup,
    getCurrentUserId,
    loading,
    error,
  };
};

// Prescription 훅들
export const usePrescription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parsePrescription = useCallback(async (text: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await prescriptionAPI.parsePrescription(text);
      console.log(response);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : '처방전 분석 실패');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const registerPrescription = useCallback(async (prescriptionData: {
    drugs: Array<{
      name: string;
      dose_per_time: number;
      times_per_day: number;
      days: number;
    }>;
    hospital: string;
    doctor: string;
    prescriptionDate: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await prescriptionAPI.registerPrescription(prescriptionData);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : '처방전 등록 실패');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    parsePrescription,
    registerPrescription,
    loading,
    error,
  };
};

// Drug 훅들
export const useDrug = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchDrugNames = useCallback(async (query: string) => {
    if (!query.trim()) return [];

    setLoading(true);
    setError(null);
    try {
      const response = await drugAPI.searchDrugNames(query);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : '약 검색 실패');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    searchDrugNames,
    loading,
    error,
  };
}; 