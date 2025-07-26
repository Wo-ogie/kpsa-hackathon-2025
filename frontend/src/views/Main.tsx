import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TreeNameModal from '../components/common/modals/TreeNameModal';
import CircleButton from '../components/common/CircleButton';
import GameContainer from '../components/games/GameContainer';

const Main: React.FC = () => {
  const navigate = useNavigate();
  const [isGrown, setIsGrown] = useState(false);
  const [gardenName, setGardenName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentLevel = 5;
  const currentProgress = 75; // 75%

  // 컴포넌트 마운트 시 저장된 이름 불러오기
  useEffect(() => {
    const savedName = localStorage.getItem('gardenName');
    if (savedName) {
      setGardenName(savedName);
    }
  }, []);

  const handleNameSave = (newName: string) => {
    setGardenName(newName);
    localStorage.setItem('gardenName', newName);
  };

  const handleMedicationAuth = () => {
    console.log("복약 인증 처리");
    navigate('/dose');
  };

  return (
    <div className="bg-white max-w-[412px] mx-auto overflow-hidden relative">
      <div className=" pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center bg-orange-primary rounded-full px-2 py-2">
            <div className="w-8 h-8 text-orange-primary rounded-full bg-white flex items-center justify-center mr-2">
              <span className="text-orange-primary font-bold text-sm">P</span>
            </div>
            <span className="text-white font-semibold">304 P</span>
          </div>

          <div className="flex items-center space-x-4">
            <CircleButton icon="/icons/album.png" label="앨범" />
            <CircleButton icon="/icons/store.png" label="상점" />
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

      <div className="fixed bottom-[5rem] left-1/2 -translate-x-1/2 w-full max-w-[412px] bg-white rounded-t-lg p-4 border z-50">
        <div className="flex justify-between items-center mb-3">
          <span className="text-orange-primary font-semibold">LV.{currentLevel} 사과 나무</span>
          <span className="text-gray-500 text-sm">{currentProgress}%</span>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-orange-primary rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${currentProgress}%` }}
          />
        </div>

        <button
          onClick={handleMedicationAuth}
          className="w-full bg-orange-primary text-white py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-orange-600 transition-colors"
        >
          <span className="text-xl">💧</span>
          <span>복약 인증하고 나무 물 주기</span>
        </button>
      </div>

      <TreeNameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentName={gardenName || "튼튼이"}
        onSave={handleNameSave}
      />
    </div>
  );
};

export default Main;