"use client";
import React, { useState } from "react";

export default function ButtonAdd() {
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    setAdded(true);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-fit h-[72px] p-3.5 rounded-[50px] text-4xl font-normal transition-colors
                 ${
                   added
                     ? "bg-[#F0C072] text-[#452F0B] "
                     : "bg-[#5B3B0E] hover:bg-[#A8792B] text-[#D9CEBC] "
                 } 
                 `}
    >
      {added ? "Đã thêm vào giỏ hàng" : "Thêm vào giỏ hàng"}
    </button>
  );
}
