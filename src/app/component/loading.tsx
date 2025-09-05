"use client";
import Lottie from "lottie-react";
import loadingAnimation from "@/app/animations/CoffeeTea.json"; // bạn đặt file ở thư mục public

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  );
}
