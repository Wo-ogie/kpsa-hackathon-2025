import React, { useEffect, useRef, useState } from 'react';

const MainContainer: React.FC = () => {
  const [waterDrops, setWaterDrops] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isWatering, setIsWatering] = useState(false);
  const [waterCount, setWaterCount] = useState(0);
  const [isGrown, setIsGrown] = useState(false);
  const [showGrowthAnimation, setShowGrowthAnimation] = useState(false);
  const [gardenName, setGardenName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState("");
  const treeRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropIdCounter = useRef(0);

  const GROWTH_THRESHOLD = 5;

  // 컴포넌트 마운트 시 저장된 이름 불러오기
  useEffect(() => {
    const savedName = localStorage.getItem('gardenName');
    if (savedName) {
      setGardenName(savedName);
    }
  }, []);

  // Tree shaking animation on mount
  useEffect(() => {
    if (treeRef.current) {
      treeRef.current.classList.add('animate-pulse');
    }
  }, []);

  const handleTreeClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (isWatering || showGrowthAnimation) return;

    setIsWatering(true);

    const containerRect = containerRef.current?.getBoundingClientRect();

    if (containerRect) {
      // Calculate click position relative to container
      const x = event.clientX - containerRect.left;
      const y = event.clientY - containerRect.top;

      // Create multiple water drops for better effect
      const newDrops: Array<{ id: number, x: number, y: number }> = [];
      for (let i = 0; i < 3; i++) {
        newDrops.push({
          id: dropIdCounter.current++,
          x: x + (Math.random() - 0.5) * 40, // Spread drops around click point
          y: y - 20 + (Math.random() - 0.5) * 20
        });
      }

      setWaterDrops(prev => [...prev, ...newDrops]);

      // Increment water count
      const newWaterCount = waterCount + 1;
      setWaterCount(newWaterCount);

      // Add extra shake to tree when watered
      if (treeRef.current) {
        treeRef.current.classList.add('animate-bounce');
        setTimeout(() => {
          treeRef.current?.classList.remove('animate-bounce');
        }, 600);
      }

      // Check if plant should grow
      if (newWaterCount >= GROWTH_THRESHOLD && !isGrown) {
        setTimeout(() => {
          setShowGrowthAnimation(true);
          setTimeout(() => {
            setIsGrown(true);
            setShowGrowthAnimation(false);
          }, 1500); // Growth animation duration
        }, 1000); // Wait for water animation to finish
      }

      // Remove water drops after animation
      setTimeout(() => {
        setWaterDrops(prev => prev.filter(drop => !newDrops.find(newDrop => newDrop.id === drop.id)));
        setIsWatering(false);
      }, 1000);
    }
  };

  const handleNameEdit = () => {
    setTempName(gardenName);
    setIsEditingName(true);
  };

  const handleNameSave = () => {
    if (tempName.trim()) {
      setGardenName(tempName.trim());
      localStorage.setItem('gardenName', tempName.trim());
      setIsEditingName(false);
    }
  };

  const handleNameCancel = () => {
    setIsEditingName(false);
    setTempName("");
  };

  return (
    <div
      className="flex flex-col items-center p-8 min-h-[80vh] bg-gradient-to-br from-sky-300 to-green-200 font-sans"
      ref={containerRef}
    >
      <div className="mb-6">
        {isEditingName ? (
          <div className="flex gap-2 justify-center items-center">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="정원 이름을 입력하세요"
              className="px-3 py-2 border border-gray-300 rounded-md text-base flex-1 max-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={20}
              autoFocus
            />
            <button
              onClick={handleNameSave}
              className="px-3 py-2 bg-green-500 text-white border-none rounded-md cursor-pointer text-sm hover:bg-green-600 transition-colors"
            >
              저장
            </button>
            <button
              onClick={handleNameCancel}
              className="px-3 py-2 bg-red-500 text-white border-none rounded-md cursor-pointer text-sm hover:bg-red-600 transition-colors"
            >
              취소
            </button>
          </div>
        ) : (
          <div className="flex gap-2 justify-center items-center">
            <h2 className="m-0 text-2xl font-bold text-green-800">
              {gardenName || "나의 정원"}
            </h2>
            <button
              onClick={handleNameEdit}
              className="px-2 py-1 bg-blue-500 text-white border-none rounded-md cursor-pointer text-xs hover:bg-blue-600 transition-colors"
            >
              이름 변경
            </button>
          </div>
        )}
      </div>

      <h2 className="text-green-800 mb-2 text-2xl">🌳 나무 키우기</h2>
      <p className="text-green-700 mb-4 text-lg">
        {isGrown ? '멋진 나무로 자랐어요! 🎉' : '새싹을 클릭해서 물을 주세요!'}
      </p>

      {/* Progress indicator */}
      <div className="flex flex-col items-center mb-8 gap-2">
        <div className="text-lg font-bold text-green-800 bg-white/80 px-4 py-2 rounded-full shadow-lg">
          💧 물준 횟수: {waterCount}/{GROWTH_THRESHOLD}
        </div>
        <div className="w-[300px] h-5 bg-white/30 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500 ease-in-out shadow-lg"
            style={{ width: `${(waterCount / GROWTH_THRESHOLD) * 100}%` }}
          />
        </div>
      </div>

      <div className="relative flex flex-col items-center w-[600px] h-[500px] bg-gradient-radial from-green-400 to-green-600 rounded-[20px] p-8 shadow-2xl overflow-hidden">
        <img
          ref={treeRef}
          src={isGrown ? "/assets/tree.png" : "/assets/sprout.png"}
          alt={isGrown ? "Tree" : "Sprout"}
          className={`w-[300px] h-auto cursor-pointer transition-transform duration-100 ease-in-out z-10 hover:scale-105 ${showGrowthAnimation ? 'animate-pulse scale-110' : ''
            }`}
          onClick={handleTreeClick}
        />

        {/* Water drops */}
        {waterDrops.map(drop => (
          <img
            key={drop.id}
            src="/assets/water_drop.png"
            alt="Water Drop"
            className="absolute w-8 h-8 pointer-events-none z-30 animate-bounce"
            style={{
              left: `${drop.x}px`,
              top: `${drop.y}px`
            }}
          />
        ))}

        {/* Growth celebration */}
        {showGrowthAnimation && (
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
            <div className="absolute -left-10 -top-5 text-3xl animate-ping">✨</div>
            <div className="absolute left-5 -top-8 text-3xl animate-ping" style={{ animationDelay: '0.3s' }}>🌟</div>
            <div className="absolute -left-5 top-5 text-3xl animate-ping" style={{ animationDelay: '0.6s' }}>✨</div>
            <div className="absolute left-1/2 -top-15 transform -translate-x-1/2 bg-gradient-to-r from-red-400 to-yellow-400 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg animate-bounce">
              성장했어요!
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-white/90 px-4 py-2 rounded-full text-sm text-green-800 shadow-lg animate-pulse">
            {isGrown
              ? '🎉 완전히 자란 나무입니다!'
              : `👆 ${isGrown ? '나무' : '새싹'}를 클릭해보세요! (${GROWTH_THRESHOLD - waterCount}번 더 필요)`
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;