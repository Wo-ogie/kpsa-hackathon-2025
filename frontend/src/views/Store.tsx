import { useState } from "react";
import Point from "../components/common/Point";
import StoreCard from "../components/album/StoreCard";

interface AlbumCardData {
  id: number;
  treeType: string;
  name: string;
  date: string;
  isLiked: boolean;
  image: string;
}
const Store = () => {
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
  return (
    <div >
      <div className="flex">
        <Point point={304} /></div>
      <div className="grid grid-cols-2 gap-4 pt-5">
        {albumData.map((card) => (
          <StoreCard
            key={card.id}
            {...card}
          />
        ))}
      </div>
    </div>
  )
};

export default Store;