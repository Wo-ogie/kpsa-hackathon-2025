import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TreeNameModal from '../components/common/modals/TreeNameModal';
import GameContainer from '../components/games/GameContainer';
import Point from '../components/common/Point';
import { plantAPI } from '../lib/api';
import { ActivePlant } from '../types/plant';
import SimpleTTSAlarm from '../components/alarm/SimpleTTSAlarm';
import FamilyRequestModal from '../components/common/modals/FamilyRequestModal';

const PatientMain: React.FC = () => {
  const navigate = useNavigate();
  const [isGrown, setIsGrown] = useState(false);
  const [gardenName, setGardenName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePlant, setActivePlant] = useState<ActivePlant | null>(null);
  const [growth, setGrowth] = useState(0);
  const [point] = useState(Number(localStorage.getItem('point')) || 0);
  const [showFamilyRequest, setShowFamilyRequest] = useState(false);
  const [requestPhoneNumber, setRequestPhoneNumber] = useState("");


  // 컴포넌트 마운트 시 저장된 이름 불러오기
  useEffect(() => {
    const savedName = localStorage.getItem('gardenName');
    if (savedName) {
      setGardenName(savedName);
    }

    plantAPI.getActivePlants()
      .then((res: { active_plant: boolean | ActivePlant }) => {
        if (!res.active_plant) {
          plantAPI.plantTree(1).then(() => {
          });
        } else {
          const plant = res.active_plant as ActivePlant;
          localStorage.setItem('activePlant', JSON.stringify(plant));
          setActivePlant(plant);
          setGrowth(plant.growth);
        }
      });
  }, []);

  // 3초 후 가족 등록 신청 모달 표시
  useEffect(() => {
    const timer = setTimeout(() => {
      setRequestPhoneNumber("김춘자");
      setShowFamilyRequest(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);



  const handleNameSave = (newName: string) => {
    setGardenName(newName);
    plantAPI.changeNickname(newName).then((res: { active_plant: ActivePlant }) => {
      localStorage.setItem('gardenName', res.active_plant.nickname);
    });
  };

  const handleMedicationAuth = () => {
    navigate('/dose');
  };

  const handleViewFamily = () => {
    navigate('/family');
  };

  // 가족 등록 신청 수락
  const handleFamilyRequestAccept = () => {
    setShowFamilyRequest(false);
    navigate('/family'); // 가족 탭으로 이동
  };

  // 가족 등록 신청 거절
  const handleFamilyRequestReject = () => {
    setShowFamilyRequest(false);

  };

  return (

    <div className="min-h-screen bg-white max-w-[412px] mx-auto overflow-hidden relative">

      <div className="p-4">
        <div className="flex justify-between items-center ">
          <button
            onClick={() => navigate('/settings')}
            className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 bg-orange-primary transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <Point point={point} />
        </div>
      </div >

      {/* 나무 이름 표시 */}
      < div className="mb-4 flex justify-center" onClick={() => setIsModalOpen(true)}>
        <div className="bg-orange-100 text-2xl font-semibold text-gray-900 px-4 py-2 inline-block text-orange-primary rounded-full">
          {gardenName || "사과나무"}
        </div>
      </div >

      {/* 나무 키우기 게임 영역 */}
      < GameContainer
        isGrown={isGrown}
        onGrownChange={setIsGrown}
      />

      {/* 나무 정보 섹션 */}
      < div className="p-4 bg-white border-b border-gray-100" >
        <div className="flex items-center space-x-3">
          <div className="bg-orange-50 rounded-lg p-2 border border-orange-200">
            <img src="/icons/tree.png" alt="tree" className="w-8 h-auto" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-orange-primary font-bold text-lg">{activePlant?.nickname}</span>
              <span className="text-gray-900 font-bold text-lg">{gardenName}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-primary rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${growth}%` }}
                />
              </div>
              <span className="text-orange-primary font-bold text-sm">{growth}%</span>
            </div>
          </div>
        </div>
      </div >

      {/* 액션 버튼들 */}
      < div className="p-4 flex gap-2" >
        <button
          onClick={handleMedicationAuth}
          className="w-full bg-orange-primary h-48 text-white py-5 rounded-xl font-semibold flex items-center justify-center space-x-3 hover:bg-orange-600 transition-colors shadow-lg"
        >
          <img src="/icons/drop.png" alt="family" className="w-7 h-7" />
          <span className="text-xl">복약 인증하고<br /> 나무 물 주기</span>
        </button>

        <button
          onClick={handleViewFamily}
          className="w-full bg-[#5B92B5] text-white py-5 rounded-xl font-semibold flex items-center justify-center space-x-3 hover:bg-[#5B92B5] transition-colors shadow-lg"
        >
          <img src="/icons/family_.png" alt="family" className="w-7 h-7" />
          <span className="text-xl">가족</span>
        </button>
      </div >

      {/* 나무 이름 변경 모달 */}
      < TreeNameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleNameSave}
        currentName={gardenName}
      />

      {/* TTS 알람 컴포넌트 */}
      <SimpleTTSAlarm />

      {/* 가족 등록 신청 모달 */}
      <FamilyRequestModal
        isOpen={showFamilyRequest}
        onClose={() => setShowFamilyRequest(false)}
        onAccept={handleFamilyRequestAccept}
        onReject={handleFamilyRequestReject}
        phoneNumber={requestPhoneNumber}
      />

    </div >
  );
};

export default PatientMain; 