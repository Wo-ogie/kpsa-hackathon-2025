import React, { useEffect, useRef, useState } from 'react';
import { plantAPI } from '../../lib/api';
import { ActivePlant, HarvestFruitResponse, Plant } from '@/types/plant';
import Toast from '../../components/ui/toast';

interface GameContainerProps {
  isGrown: boolean;
  onGrownChange: (grown: boolean) => void;
  onAppleHarvest?: () => void;
}

const GameContainer: React.FC<GameContainerProps> = ({ onAppleHarvest }) => {
  const [apples, setApples] = useState<Array<{ id: number; x: number; y: number; isDropping: boolean }>>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastPoints, setToastPoints] = useState(0);
  const [isTreeShrinking, setIsTreeShrinking] = useState(false);
  const treeRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const appleIdCounter = useRef(0)
  const [activePlant, setActivePlant] = useState<ActivePlant | null>(null);


  // activePlant의 id와 growth에 따라 이미지 경로를 결정하는 함수
  const getTreeImagePath = () => {
    if (!activePlant || !activePlant.plant) return "/assets/tree_sm.png";

    const { plant, growth } = activePlant;

    // 축소 애니메이션 중에는 작은 나무 이미지 반환
    if (isTreeShrinking) {
      return "/assets/tree_sm.png";
    }

    if (plant.id === 1) {
      return growth === 100 ? "/assets/tree.png" : "/assets/tree_sm.png";
    } else if (plant.id === 2) {
      return growth === 100 ? "/assets/pear_tree.png" : "/assets/tree_sm.png";
    }

    // 기본값
    return "/assets/tree_sm.png";
  };

  // Tree shaking animation on mount
  useEffect(() => {
    const activePlant = localStorage.getItem('activePlant');
    if (activePlant) {
      const plant = JSON.parse(activePlant) as ActivePlant;
      setActivePlant(plant);
    }
    if (treeRef.current) {
      // treeRef.current.classList.add('animate-pulse');
    }
  }, []);

  // Initialize apples when tree grows (only for apple tree - id 1 with growth 100)
  useEffect(() => {
    const shouldShowApples = activePlant?.plant?.id === 1 && activePlant?.growth === 100;

    console.log('shouldShowApples', shouldShowApples, apples);
    if (shouldShowApples && apples.length === 0) {
      const initialApples = [
        {
          id: appleIdCounter.current++,
          x: 140, // 나무 상단 중앙 (약간 오른쪽)
          y: 60,
          isDropping: false
        },
        {
          id: appleIdCounter.current++,
          x: 80, // 나무 왼쪽 가지
          y: 90,
          isDropping: false
        },
        {
          id: appleIdCounter.current++,
          x: 160, // 나무 오른쪽 가지
          y: 100,
          isDropping: false
        }
      ];
      setApples(initialApples);
    } else if (!shouldShowApples) {
      setApples([]);
    }
  }, [activePlant]);



  const handleAppleClick = (appleId: number, event: React.MouseEvent) => {
    event.stopPropagation(); // 나무 클릭 이벤트 방지

    const clickedApple = apples.find(apple => apple.id === appleId);
    if (!clickedApple || clickedApple.isDropping) return;

    // 사과 떨어뜨리기 애니메이션 시작
    setApples(prev =>
      prev.map(apple =>
        apple.id === appleId ? { ...apple, isDropping: true } : apple
      )
    );

    // 수확 콜백 호출
    if (onAppleHarvest) {
      setTimeout(() => {
        onAppleHarvest();
      }, 800);
    }

    // 사과 제거 (애니메이션 완료 후)
    setTimeout(() => {
      setApples(prev => prev.filter(apple => apple.id !== appleId));
    }, 1000);

    // API 호출 (주석 해제하여 사용)
    plantAPI.harvestFruit().then((res: HarvestFruitResponse) => {
      console.log('수확 완료:', res);
      // 토스트 메시지 표시 points_earned , current_user_point
      setShowToast(true);
      setToastMessage(`사과를 수확해서 총`);
      setToastPoints(res.points_earned);
      localStorage.setItem('point', res.current_user_point.toString());
      localStorage.setItem('activePlant', JSON.stringify(res.active_plant));
      if (res.remaining_fruit_count === 0) {
        // 나무 축소 애니메이션 시작
        setIsTreeShrinking(true);

        // 1초 후 나무 축소 완료
        setTimeout(() => {
          localStorage.removeItem('activePlant');
          plantAPI.getActivePlants()
            .then((res: { active_plant: boolean | ActivePlant }) => {
              if (!res.active_plant) {
                plantAPI.plantTree(1).then((res: Plant) => {
                  console.log('res', res);
                  // 새로운 나무는 growth: 0이므로 작은 상태 유지
                  setIsTreeShrinking(false);
                  // setActivePlant(res as Plant);
                });
              } else {
                const plant = res.active_plant as ActivePlant;
                localStorage.setItem('activePlant', JSON.stringify(plant));
                // 새로운 나무는 growth: 0이므로 작은 상태 유지
                setIsTreeShrinking(false);
                setActivePlant(plant);
              }
            });
        }, 1000);
      }
    });
  };

  return (
    <div className="min-h-[250px] overflow-y-auto px-4 flex items-center justify-center" >
      <Toast
        message={toastMessage}
        points={toastPoints}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      <div className="relative" ref={containerRef}>
        <div className="relative flex justify-center">
          <img
            ref={treeRef}
            src={getTreeImagePath()}
            alt={activePlant?.growth === 100 ? "Grown Tree" : "Small Tree"}
            className={`transition-all duration-1000 ease-in-out z-10 ${
              // 나무 크기에 따른 클래스 적용 (growth가 100이면 큰 나무, 아니면 작은 나무)
              isTreeShrinking ? 'w-12 h-auto' : (activePlant?.growth === 100 ? 'w-48 h-auto' : 'w-12 h-auto')
              } ${activePlant?.growth === 100 ? 'animate-pulse' : '' // 성장 중일 때 깜빡임 효과
              }`}
          />

          {activePlant?.plant?.id === 1 && activePlant?.growth === 100 && !isTreeShrinking && apples.map(apple => (
            <div
              key={apple.id}
              className={`absolute w-8 h-8 cursor-pointer hover:scale-110 transition-all duration-1000 z-30 ${apple.isDropping ? 'animate-bounce' : ''
                }`}
              style={{
                left: `${apple.x - 12}px`,
                top: apple.isDropping ? `${apple.y + 50}px` : `${apple.y - 20}px`,
                transform: apple.isDropping ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
              onClick={(e) => handleAppleClick(apple.id, e)}
            >
              <img src="/assets/apple.svg" alt="Apple" className="w-full h-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameContainer;