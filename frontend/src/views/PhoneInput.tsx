import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/common/Button";

const PhoneInput = () => {
  const [phone1, setPhone1] = useState("010");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const nickname = location.state?.nickname || "사용자";

  const handleNext = () => {
    if (phone1 && phone2 && phone3) {
      const fullPhone = `${phone1}-${phone2}-${phone3}`;
      console.log("전화번호:", fullPhone);
      // TODO: 전화번호 저장 처리
      navigate("/protector-select", { state: { nickname: nickname, phone_number: `${phone1}${phone2}${phone3}` } });
    }
  };

  const isButtonActive = phone1 && phone2 && phone3;

  const handlePhoneChange = (value: string, setter: (value: string) => void, maxLength: number) => {
    if (value.length <= maxLength) {
      setter(value);
    }
  };

  return (
    <div className="min-h-screen flex flex-col mobile-container safe-area-top safe-area-bottom px-6">
      {/* 헤더 */}
      <div className="flex items-center pt-4 pb-6">
        <button onClick={() => navigate(-1)}>
          <img src="/icons/arrow_left.png" alt="back" className="w-6 h-6" />
        </button>
      </div>

      {/* 메인 콘텐츠 - 화면 중앙 */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {nickname}님의 전화번호를 입력해주세요.
          </h1>
          <p className="text-gray-500 text-base">
            나중에 친구 추가할 때,<br /> 입력한 정보를 기반으로 추가돼요.
          </p>
        </div>

        {/* 전화번호 입력 필드 */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={phone1}
              onChange={(e) => handlePhoneChange(e.target.value, setPhone1, 3)}
              className="w-20 text-3xl font-medium bg-transparent border-none outline-none text-center pb-2"
              maxLength={3}
            />
            <span className="text-3xl font-medium text-gray-400">-</span>
            <input
              type="text"
              value={phone2}
              onChange={(e) => handlePhoneChange(e.target.value, setPhone2, 4)}
              placeholder="0000"
              className="w-24 text-3xl font-medium bg-transparent border-none outline-none text-center pb-2 placeholder-gray-400"
              maxLength={4}
            />
            <span className="text-3xl font-medium text-gray-400">-</span>
            <input
              type="text"
              value={phone3}
              onChange={(e) => handlePhoneChange(e.target.value, setPhone3, 4)}
              placeholder="0000"
              className="w-24 text-3xl font-medium bg-transparent border-none outline-none text-center pb-2 placeholder-gray-400"
              maxLength={4}
            />
          </div>
          <div className={`h-0.5 transition-colors duration-200 ${isButtonActive ? 'bg-orange-primary' : 'bg-gray-300'}`}></div>
        </div>
      </div>

      {/* 하단 버튼 */}
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

export default PhoneInput; 