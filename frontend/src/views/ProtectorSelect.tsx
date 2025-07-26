import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { authAPI } from "../lib/api";

const ProtectorSelect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const nickname = location.state?.nickname || "사용자";
  const phone_number = location.state?.phone_number || "";


  const handleSelect = (isProtector: boolean) => {
    authAPI.signup({
      nickname: nickname,
      phone_number: phone_number,
      is_guardian: isProtector
    }).then((res) => {
      const response = res as { nickname: string, is_guardian: boolean, point: number };
      localStorage.setItem('is_guardian', response.is_guardian.toString());
      localStorage.setItem('nickname', response.nickname);
      localStorage.setItem('point', response.point.toString());
      navigate("/welcome");
    });
  };

  return (
    <div className="h-[100dvh] flex flex-col  px-6">
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">보호자 모드로<br />진행하시나요?</h1>
          <p className="text-gray-500 text-base">보호자 계정으로 등록해도<br />나중에 설정을 통해 수정할 수 있어요.</p>
        </div>
      </div>

      <div className="pb-8 flex gap-4">
        <Button
          onClick={() => handleSelect(true)}
          variant="secondary"
          size="lg"
          fullWidth
          className="h-52 text-lg font-semibold bg-orange-100 text-orange-500 hover:bg-orange-200 rounded-xl"

        >
          보호자 모드
        </Button>
        <Button
          onClick={() => handleSelect(false)}
          variant="primary"
          size="lg"
          fullWidth
          className="h-52 text-lg font-semibold bg-orange-500 text-white hover:bg-orange-600 rounded-xl"
        >
          어르신 모드
        </Button>
      </div>
    </div>
  );
};

export default ProtectorSelect; 