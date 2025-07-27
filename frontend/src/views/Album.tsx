import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AlbumCard from '../components/album/AlbumCard';
import { familyAPI } from '../lib/api';
import { ActivePlant, Plant } from '../types/plant';

interface AlbumCardData {
  id: number;
  treeType: string;
  name: string;
  date: string;
  isLiked: boolean;
}

const Album = () => {
  const location = useLocation();
  const [albumData, setAlbumData] = useState<AlbumCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Family member info from navigation state
  const familyInfo = location.state as { family_id?: number; family_name?: string } | null;

  useEffect(() => {
    const loadAlbumData = async () => {
      try {
        setIsLoading(true);
        
        if (familyInfo?.family_id) {
          // Load family member's album data
          const res = await familyAPI.getFamilyAlbum(familyInfo.family_id);
          const albumData = res.plants.map((plant: Plant, index: number) => ({
            id: plant.id,
            treeType: plant.name || (plant.id === 1 ? "사과나무" : "배나무"),
            name: `${plant.name || (plant.id === 1 ? "사과나무" : "배나무")} ${index + 1}`,
            date: new Date().toISOString(), // Family albums don't have created_at, use current date
            isLiked: false
          }));
          setAlbumData(albumData);
        } else {
          // Load current user's album data
          const res = await familyAPI.getMyAlbum();
          const albumData = res.plants.map((plant: ActivePlant) => ({
            id: plant.id,
            treeType: plant.plant.id === 1 ? "사과나무" : "배나무",
            name: plant.nickname,
            date: plant.created_at,
            isLiked: false
          }));
          setAlbumData(albumData);
        }
      } catch (error) {
        console.error('Failed to load album data:', error);
        setAlbumData([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadAlbumData();
  }, [familyInfo]);

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
    <div className="min-h-screen bg-white">
      {/* Header with family member name if applicable */}
      {familyInfo?.family_name && (
        <div className="p-4 bg-orange-50 border-b border-orange-100">
          <p className="text-sm text-orange-700 font-medium">
            {familyInfo.family_name}님의 앨범
          </p>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      ) : albumData.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 p-4 pb-20">
          {albumData.map((card) => (
            <AlbumCard
              key={card.id}
              {...card}
              onLikeToggle={handleLikeToggle}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-20 text-gray-500">
          {familyInfo?.family_name ? 
            `${familyInfo.family_name}님의 앨범이 비어있습니다.` : 
            '앨범이 비어있습니다.'
          }
        </div>
      )}
    </div>
  );
};

export default Album;