import React from "react";


const KakaoLoginButton: React.FC<{ text: string, className?: string }> = ({ text = '카카오로 로그인', className }) => {

  const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_APP_KEY || ''
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI || ''

  const handleKakaoLogin = () => {
    window.location.href =
      `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_APP_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  };

  return (
    <button
      onClick={handleKakaoLogin}
      className={`flex items-center bg-[#F8DF02] text-[#212012] font-bold border-none rounded-full px-3 cursor-pointer text-xs hover:bg-yellow-500 transition-colors w-[359px] h-[42px] relative ${className}`}
    >
      <img src="/images/login/kakao_logo.png" alt="kakao_logo" className="w-6 h-6 absolute left-3" />
      <span className="w-full text-center">{text}</span>
    </button>
  );
};

export default KakaoLoginButton; 