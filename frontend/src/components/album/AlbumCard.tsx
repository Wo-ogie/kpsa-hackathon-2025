import React from 'react';

interface AlbumCardProps {
  id: number;
  treeType: string;
  name: string;
  date: string;
  isLiked: boolean;
  onLikeToggle?: (id: number) => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  id,
  treeType,
  name,
  date,
  isLiked,
  onLikeToggle
}) => {
  const handleLikeClick = () => {
    if (onLikeToggle) {
      onLikeToggle(id);
    }
  };

  return (
    <div
      className="rounded-lg h-40 relative"
      style={{
        background: `linear-gradient(to bottom, #b1f2ff, transparent)`
      }}
    >
      <img
        src={treeType === "사과나무" ? "/assets/apple_tree.png" : "/assets/pear_tree.png"}
        alt={treeType}
        className="absolute inset-0 w-full h-full object-contain"
      />

      <button
        className="absolute top-2 right-2 z-5"
        onClick={handleLikeClick}
      >
        <svg
          className={`w-5 h-5 ${isLiked ? 'text-orange-500 fill-current' : 'text-gray-400'} hover:scale-110 transition-transform`}
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      </button>

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