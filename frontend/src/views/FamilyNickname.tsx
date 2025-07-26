import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/common/Button";
import BackButton from "../components/common/BackButton";

const FamilyNickname = () => {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state?.phone_number || "";

  const handleNext = () => {
    if (nickname.trim()) {
      console.log("가족 닉네임:", nickname);
      // 권한 설정 페이지로 이동
      navigate("/family-permissions", {
        state: {
          phone_number: phoneNumber,
          nickname: nickname.trim()
        }
      });
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">가족을 어떻게 저장해드릴까요?</h1>
          <p className="text-gray-500 text-base">
            정해주신 내용을 기반으로,<br /> 가족의 별명이 저장돼요.
          </p>
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
                <img src="/icons/close_circle.png" alt="clear" className="w-6 h-6" />
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

export default FamilyNickname; 