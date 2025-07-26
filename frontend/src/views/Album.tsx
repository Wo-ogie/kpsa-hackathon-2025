import { useState } from 'react';
import AlbumCard from '../components/album/AlbumCard';

interface AlbumCardData {
  id: number;
  treeType: string;
  name: string;
  date: string;
  isLiked: boolean;
  image: string;
}

const Album = () => {
  const [albumData, setAlbumData] = useState<AlbumCardData[]>([
    {
      id: 1,
      treeType: "사과나무",
      name: "튼튼이",
      date: "2025. 06. 21",
      isLiked: true,
      image: "/assets/tree.png"
    },
    {
      id: 2,
      treeType: "배나무",
      name: "무럭이",
      date: "2025. 03. 05",
      isLiked: false,
      image: "/assets/tree.png"
    }
  ]);

  const handleLikeToggle = (id: number) => {
    setAlbumData(prev =>
      prev.map(card =>
        card.id === id
          ? { ...card, isLiked: !card.isLiked }
          : card
      )
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 pt-5">
      {albumData.map((card) => (
        <AlbumCard
          key={card.id}
          {...card}
          onLikeToggle={handleLikeToggle}
        />
      ))}
    </div>
  );
};

export default Album;