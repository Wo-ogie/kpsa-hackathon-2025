import { useEffect, useState } from 'react';
import AlbumCard from '../components/album/AlbumCard';
import { familyAPI } from '../lib/api';
import { ActivePlant } from '../types/plant';

interface AlbumCardData {
  id: number;
  treeType: string;
  name: string;
  date: string;
  isLiked: boolean;
}

const Album = () => {
  const [albumData, setAlbumData] = useState<AlbumCardData[]>([]);

  useEffect(() => {
    familyAPI.getMyAlbum().then((res: { plants: ActivePlant[] }) => {
      const albumData = res.plants.map((plant: ActivePlant) => ({
        id: plant.id,
        treeType: plant.plant.id === 1 ? "사과나무" : "배나무",
        name: plant.nickname,
        date: plant.created_at,
        isLiked: false
      }));
      setAlbumData(albumData);
    });
  }, []);

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
    <div className="grid grid-cols-2 gap-4 pt-5 pb-20">
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