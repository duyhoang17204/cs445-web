/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function Loading() {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch("/animations/CoffeeTea.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Error loading animation:", err));
  }, []);

  if (!animationData) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#5a3a19]"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <Lottie
        animationData={animationData}
        loop
        className="w-[500px] h-[500px]"
      />
    </div>
  );
}
