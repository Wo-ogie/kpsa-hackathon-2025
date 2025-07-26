import React, { useState } from "react";

const GardenPage: React.FC = () => {
  const [waterCount, setWaterCount] = useState(0);
  const [level, setLevel] = useState(1);

  // 약 복용(물주기) 버튼 클릭 시 성장
  const handleWater = () => {
    const nextCount = waterCount + 1;
    setWaterCount(nextCount);
    if (nextCount % 3 === 0) {
      setLevel(l => l + 1); // 3회마다 레벨업
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #ccc", borderRadius: 8, textAlign: "center" }}>
      <h2>나만의 정원</h2>
      <div style={{ margin: "24px 0" }}>
        <div style={{ fontSize: 48 }}>{"🌱🌿🌳"[level - 1] || "🌳"}</div>
        <div>정원 레벨: {level}</div>
        <div>약 복용(물주기) 횟수: {waterCount}</div>
      </div>
      <button
        onClick={handleWater}
        style={{ width: "100%", padding: 12, background: "#eee", border: "none", borderRadius: 4, fontWeight: 700, cursor: "pointer" }}
      >
        약 복용(물주기)
      </button>
    </div>
  );
};

export default GardenPage; 