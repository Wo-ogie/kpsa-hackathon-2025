import React from 'react';
import Point from '../common/Point';

interface AlbumCardProps {
  treeType: string;
  name: string;
  date: string;
  image: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  treeType,
  name,
  date,
  image,
}) => {

  return (
    <div
      className="rounded-lg h-40 relative"
      style={{
        background: `linear-gradient(to bottom, #b1f2ff, transparent)`
      }}
    >
      <div className="absolute top-2 left-2 z-10 flex">
        <Point point={304} size="sm" />
      </div>
      <img
        src={image}
        alt={treeType}
        className="absolute inset-0 w-full h-full object-contain"
      />


      <div className="absolute bottom-0 left-0 right-0 px-3 rounded-b-lg">
        <p className="text-xs text-orange-primary mb-1">{treeType}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-orange-primary mb-1">{name}</span>
          <span className="text-xs text-orange-primary text-right">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard; 