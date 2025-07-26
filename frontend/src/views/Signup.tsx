import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import BackButton from "../components/common/BackButton";

const Signup = () => {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (nickname.trim()) {
      // TODO: 닉네임 저장 처리
      console.log("닉네임:", nickname);
      // PhoneInput 페이지로 이동하면서 닉네임 전달
      navigate("/phone-input", { state: { nickname: nickname.trim() } });
    }
  };

  const handleClearInput = () => {
    setNickname("");
  };

  const isButtonActive = nickname.trim().length > 0;

  return (
    <div className="min-h-screen flex flex-col mobile-container safe-area-top safe-area-bottom px-6">
      <BackButton />
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">안녕하세요.</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">어떻게 불러드릴까요?</h2>
          <p className="text-gray-500 text-base">정해주신 내용을 기반으로,<br /> 저희가 불러드려요.</p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="별명"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={20}
              className="w-full text-3xl font-medium bg-transparent border-none outline-none placeholder-gray-400 pb-2"
            />
            {nickname && (
              <button
                onClick={handleClearInput}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-1"
              >
                <img src="/icons/close_circle.png" alt="back" className="w-6 h-6" />
              </button>
            )}
          </div>
          <div className={`h-0.5 transition-colors duration-200 ${isButtonActive ? 'bg-orange-primary' : 'bg-gray-300'}`}></div>
        </div>
      </div>

      <div className="pb-8">
        <Button
          onClick={handleNext}
          disabled={!isButtonActive}
          variant={isButtonActive ? 'primary' : 'secondary'}
          size="lg"
          fullWidth
        >
          다음으로
        </Button>
      </div>
    </div>
  );
};

export default Signup; 