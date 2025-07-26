import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TreeNameModal from '../components/common/modals/TreeNameModal';
import CircleButton from '../components/common/CircleButton';
import GameContainer from '../components/games/GameContainer';
import Point from '../components/common/Point';
import Toast from '../components/ui/toast';
import { plantAPI } from '../lib/api';
import { Plant } from '../types/plant';


const Main: React.FC = () => {
  const navigate = useNavigate();
  const [isGrown, setIsGrown] = useState(false);
  const [gardenName, setGardenName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [point, setPoint] = useState(Number(localStorage.getItem('point')) || 0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastPoints, setToastPoints] = useState(0);
  const [activePlant, setActivePlant] = useState<Plant | null>(null);
  const [growth, setGrowth] = useState(0);


  // 컴포넌트 마운트 시 저장된 이름 불러오기
  useEffect(() => {
    const savedName = localStorage.getItem('gardenName');
    if (savedName) {
      setGardenName(savedName);
    }

    plantAPI.getActivePlants()
      .then((res: { active_plant: boolean | Plant }) => {
        if (!res.active_plant) {
          plantAPI.plantTree(1).then((res: Plant) => {
            console.log('res', res);
          });
        } else {
          const plant = res.active_plant as Plant;
          localStorage.setItem('activePlant', JSON.stringify(plant));
          setActivePlant(plant);
          setGrowth(plant.growth);
        }
      });
  }, []);

  const handleNameSave = (newName: string) => {
    setGardenName(newName);
    plantAPI.changeNickname(newName).then((res: { active_plant: Plant }) => {
      localStorage.setItem('gardenName', res.active_plant.nickname);
    });
  };

  const handleMedicationAuth = () => {
    navigate('/dose');
  };

  return (
    <div className="min-h-screen bg-white max-w-[412px] mx-auto overflow-hidden relative">
      <div className=" pb-4">
        <div className="flex justify-between items-start">
          <Point point={point} />
          <div className="flex items-center space-x-4">
            <CircleButton icon="/icons/album.png" label="앨범" onClick={() => navigate('/album')} />
            <CircleButton icon="/icons/store.png" label="상점" onClick={() => navigate('/store')} />
          </div>
        </div>
      </div>

      <div className="mb-4 flex justify-center" onClick={() => setIsModalOpen(true)}>
        <div className="bg-peach-lighter text-2xl font-semibold text-gray-900 px-4 py-2 inline-block text-orange-primary rounded-full">
          {gardenName || "사과나무"}
        </div>
      </div>

      {/* 나무 키우기 게임 영역 */}
      <GameContainer
        isGrown={isGrown}
        onGrownChange={setIsGrown}
      />

      <div className="fixed bottom-[5rem] left-1/2 -translate-x-1/2 w-full max-w-[380px] bg-white rounded p-4 border z-50">
        {/* 상단 섹션 - 식물 정보 */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-white rounded-lg p-2 border border-gray-200">
            <img src="/icons/tree.png" alt="tree" className="w-8 h-auto" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-orange-primary font-bold text-lg">LV. 5</span>
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

        {/* 하단 섹션 - 액션 버튼 */}
        <button
          onClick={handleMedicationAuth}
          className="w-full bg-orange-primary text-white py-4 rounded-lg font-semibold flex items-center justify-center space-x-3 hover:bg-orange-600 transition-colors border"
        >
          <span className="text-lg">복약 인증하고 나무 물 주기</span>
        </button>
      </div>

      <TreeNameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentName={gardenName || "튼튼이"}
        onSave={handleNameSave}
      />

      <Toast
        message={toastMessage}
        points={toastPoints}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default Main;