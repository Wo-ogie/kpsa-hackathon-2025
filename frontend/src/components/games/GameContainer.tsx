import React, { useEffect, useRef, useState } from 'react';

interface GameContainerProps {
  isGrown: boolean;
  onGrownChange: (grown: boolean) => void;
}

const GameContainer: React.FC<GameContainerProps> = ({ isGrown, onGrownChange }) => {
  const [waterDrops, setWaterDrops] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isWatering, setIsWatering] = useState(false);
  const [waterCount, setWaterCount] = useState(0);
  const [showGrowthAnimation, setShowGrowthAnimation] = useState(false);
  const treeRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropIdCounter = useRef(0);

  const GROWTH_THRESHOLD = 5;

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
            onGrownChange(true);
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

  return (
    <div className="flex-1 overflow-y-auto px-4" style={{ height: 'calc(100vh - 200px)' }}>
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-md">
          <div className="relative flex justify-center mb-6">
            <img
              ref={treeRef}
              src={isGrown ? "/assets/tree.png" : "/assets/tree.png"}
              alt={isGrown ? "Tree" : "Sprout"}
              className={`w-48 h-auto cursor-pointer transition-transform duration-100 ease-in-out z-10 hover:scale-105 ${showGrowthAnimation ? 'scale-110' : ''
                }`}
              onClick={handleTreeClick}
            />

            {/* Water drops */}
            {waterDrops.map(drop => (
              <img
                key={drop.id}
                src="/assets/water_drop.png"
                alt="Water Drop"
                className="absolute w-6 h-6 pointer-events-none z-30 animate-bounce"
                style={{
                  left: `${drop.x}px`,
                  top: `${drop.y}px`
                }}
              />
            ))}

            {/* Growth celebration */}
            {showGrowthAnimation && (
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
                <div className="absolute -left-8 -top-4 text-2xl animate-ping">✨</div>
                <div className="absolute left-4 -top-6 text-2xl animate-ping" style={{ animationDelay: '0.3s' }}>🌟</div>
                <div className="absolute -left-4 top-4 text-2xl animate-ping" style={{ animationDelay: '0.6s' }}>✨</div>
                <div className="absolute left-1/2 -top-12 transform -translate-x-1/2 bg-gradient-to-r from-red-400 to-yellow-400 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg animate-bounce">
                  성장했어요!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameContainer; 