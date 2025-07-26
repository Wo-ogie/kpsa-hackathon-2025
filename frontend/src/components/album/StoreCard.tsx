import React from 'react';
import Point from '../common/Point';

interface AlbumCardProps {
  id: number;
  treeType: string;
  point: number;
  image: string;
  isLocked: boolean;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  treeType,
  point,
  image,
  isLocked
}) => {

  return (
    <div
      className="rounded-lg h-40 relative"
      style={{
        background: `linear-gradient(to bottom, #b1f2ff, transparent)`
      }}
    >
      <div className="absolute top-2 left-2 z-10 flex">
        <Point point={point} size="sm" />
      </div>
      <img
        src={image}
        alt={treeType}
        className="absolute inset-0 w-full h-full object-contain"
      />

      {isLocked && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg">
          <img src="/images/lock.png" alt="lock" className="w-10 h-10" />
        </div>
      )}


      <div className="absolute bottom-0 left-0 right-0 px-3 rounded-b-lg">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-orange-primary mb-1">{treeType}</span>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard; 