import Point from "../components/common/Point";
import StoreCard from "../components/album/StoreCard";

const Store = () => {
  const storeData = [
    {
      id: 1,
      treeType: "사과나무",
      point: 0,
      image: "/assets/tree.png",
      isLocked: false
    },
    {
      id: 2,
      treeType: "배나무",
      point: 10,
      image: "/assets/tree.png",
      isLocked: false
    },
    {
      id: 3,
      treeType: "코코넛나무",
      point: 20,
      image: "/assets/tree.png",
      isLocked: true
    },
    {
      id: 4,
      treeType: "감나무",
      point: 40,
      image: "/assets/tree.png",
      isLocked: true
    },
    {
      id: 5,
      treeType: "복숭아나무",
      point: 50,
      image: "/assets/tree.png",
      isLocked: true
    },
    {
      id: 6,
      treeType: "레몬나무",
      point: 50,
      image: "/assets/tree.png",
      isLocked: true
    },

  ];
  return (
    <div >
      <div className="flex">
        <Point point={304} /></div>
      <div className="grid grid-cols-2 gap-4 pt-5">
        {storeData.map((card) => (
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