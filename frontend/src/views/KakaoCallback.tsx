import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_APP_KEY || ''
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI || ''

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      axios.post(
        "https://kauth.kakao.com/oauth/token",
        null,
        {
          params: {
            grant_type: "authorization_code",
            client_id: KAKAO_APP_KEY,
            redirect_uri: REDIRECT_URI,
            code,
          },
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      ).then(() => {
        navigate("/signup");

      }).catch(err => {
        console.error("카카오 로그인 에러:", err);
      });
    }
  }, []);

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback; 