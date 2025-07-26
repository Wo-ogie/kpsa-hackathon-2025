import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../lib/api";

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (code) {
      authAPI.loginWithKakao(code)
        .then((res) => {
          const response = res as { session_id: string };
          localStorage.setItem('session_id', response.session_id);
          navigate("/signup");
        });
    }
  }, []);

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback; 