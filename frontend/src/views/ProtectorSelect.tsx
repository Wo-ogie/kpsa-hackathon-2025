import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import apiClient from "../lib/api";

const ProtectorSelect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const nickname = location.state?.nickname || "사용자";
  const phone_number = location.state?.phone_number || "";


  const handleSelect = (isProtector: boolean) => {
    apiClient.post('/auth/signup', {
      nickname: nickname,
      phone_number: phone_number,
      is_guardian: isProtector
    }).then((res) => {
      console.log(res)
      navigate("/welcome");
    });
  };

  return (
    <div className="h-[100dvh] flex flex-col  px-6">
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">보호자 계정으로<br />등록하시나요?</h1>
          <p className="text-gray-500 text-base">보호자 계정으로 등록해도<br />나중에 설정을 통해 수정할 수 있어요.</p>
        </div>
      </div>

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