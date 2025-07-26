import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

const ProtectorSelect = () => {
  const navigate = useNavigate();

  const handleSelect = (isProtector: boolean) => {
    // TODO: 보호자 여부 저장 처리
    if (isProtector) {
      // 보호자 계정으로 등록
      navigate("/welcome");
    } else {
      // 일반 계정으로 등록
      navigate("/welcome");
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">보호자 계정으로<br />등록하시나요?</h1>
          <p className="text-gray-500 text-base">보호자 계정으로 등록해도<br />나중에 설정을 통해 수정할 수 있어요.</p>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="pb-8 flex flex-col gap-3">
        <Button
          onClick={() => handleSelect(true)}
          variant="secondary"
          size="lg"
          fullWidth
        >
          네
        </Button>
        <Button
          onClick={() => handleSelect(false)}
          variant="primary"
          size="lg"
          fullWidth
        >
          아니요
        </Button>
      </div>
    </div>
  );
};

export default ProtectorSelect; 