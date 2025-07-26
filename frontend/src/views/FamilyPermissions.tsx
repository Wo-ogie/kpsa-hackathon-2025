import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/common/Button";
import CheckBox from "../components/common/CheckBox";
import { familyAPI } from "../lib/api";

const FamilyPermissions = () => {
  const [showMedicationRecords, setShowMedicationRecords] = useState(true);
  const [sendAlarmOnMiss, setSendAlarmOnMiss] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { phone_number, nickname } = location.state || {};

  const createFamily = () => {
    console.log("가족 권한 설정:", {
      phone_number,
      nickname,
      showMedicationRecords,
      sendAlarmOnMiss
    });

    // TODO: 가족 추가 API 호출
    // 가족 추가 완료 후 메인 페이지로 이동
    // navigate("/family");
    familyAPI.addFamily(phone_number, nickname, showMedicationRecords, sendAlarmOnMiss)
      .then((res) => {
        navigate("/family");
      });
  };

  return (
    <div className="min-h-screen flex flex-col mobile-container safe-area-top safe-area-bottom px-6">
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            추가된 가족에게 어떤 권한을 부여할까요?
          </h1>
          <p className="text-gray-500 text-base">
            권한 설정에 따른 가족과의 복용 기록,<br /> 정보 확인이 달라집니다.
          </p>
        </div>

        <div className="mb-8 space-y-6">
          <CheckBox
            id="show-medication-records"
            checked={showMedicationRecords}
            onChange={() => setShowMedicationRecords(!showMedicationRecords)}
            label="자신의 복용기록을 보여주기겠습니까?"
            className="text-lg"
          />

          <CheckBox
            id="send-alarm-on-miss"
            checked={sendAlarmOnMiss}
            onChange={() => setSendAlarmOnMiss(!sendAlarmOnMiss)}
            label="자신의 약물 미복용 시, 알람을 전달하겠습니까?"
            className="text-lg"
          />
        </div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 p-4">
        <Button
          onClick={createFamily}
          variant="primary"
          size="lg"
          fullWidth
        >
          완료
        </Button>
      </div>
    </div>
  );
};

export default FamilyPermissions; 