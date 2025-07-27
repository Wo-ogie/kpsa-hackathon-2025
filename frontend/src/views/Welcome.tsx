import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col mobile-container safe-area-top safe-area-bottom px-6">
      {/* 헤더 */}
      <div className="flex items-center pt-4 pb-6">
        <button onClick={() => navigate(-1)}>
          <img src="/icons/arrow_left.png" alt="back" className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="relative flex items-center justify-center mb-12">
          <div className="absolute w-[320px] h-[320px] rounded-full bg-orange-100 opacity-60"></div>
          <div className="absolute w-[220px] h-[220px] rounded-full bg-orange-100 opacity-80"></div>
          <div className="absolute w-[140px] h-[140px] rounded-full bg-orange-200 opacity-90"></div>
          <div className="relative w-[128px] h-[128px] flex items-center justify-center text-[80px]">
            <span role="img" aria-label="clap">👏</span>
          </div>
        </div>
      </div>
      <div className="text-center mb-12 relative top-[-100px]">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">환영합니다!</h1>
        <h2 className="text-2xl font-bold text-gray-900">바로 약속열매를 사용해보세요!</h2>
      </div>

      {/* 하단 버튼 */}
      <div className="pb-8">
        <Button
          onClick={() => {
            const isGuardian = localStorage.getItem('is_guardian') === 'true';
            console.log('사용자 타입:', isGuardian ? '보호자' : '어르신');
            console.log('localStorage is_guardian:', localStorage.getItem('is_guardian'));
            navigate("/main");
          }}
          variant="primary"
          size="lg"
          fullWidth
        >
          바로가기
        </Button>
      </div>
    </div>
  );
};

export default Welcome; 