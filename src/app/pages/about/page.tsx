"use client";
import React from "react";

import Image from "next/image";
import bannerabout from "@/app/image/bannerabout.png";
import story1 from "@/app/image/story1.png";
import story2 from "@/app/image/story2.png";
import story3 from "@/app/image/story3.png";

export default function page() {
  return (
    <div className="bg-[#D9CEBC] text-[#5B3B0E]">
      <div className="w-full h-[600px] relative">
        <Image src={bannerabout} alt="Tan Cafe" fill className="object-cover" />
      </div>

      <div className="max-w-[1190px] mx-auto px-6 py-12">
        <h2 className="text-5xl font-extrabold mb-4">Câu chuyện Tan.</h2>
        <p className="text-[32px] font-normal leading-relaxed mb-10">
          Tan. là một thương hiệu cà phê tại Huế, Việt Nam được sáng lập vào năm
          2017. Khởi đầu là một quán cà phê mang không khí hoài cổ, tan.original
          nằm nép mình ở 14 Phạm Hồng Thái. Đây là Tan. nguyên bản đầu tiên, là
          khởi đầu kể nên câu chuyện chung trên phông nền riêng biệt, trở thành
          tiền đề để mở ra tinh thần của thương hiệu sau này.
        </p>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="relative h-[400px] w-[500px] bg-[#D9CEBC]">
            <Image
              src={story1}
              alt="Quán cà phê Tan"
              fill
              className="object-cover rounded-xl"
            />
          </div>

          <div className="relative h-[400px] w-[500px]">
            <Image
              src={story2}
              alt="Không gian Tan"
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </div>

        <div className="relative h-[500px] w-[1084px] mt-2.5 mb-20">
          <Image
            src={story3}
            alt="Không gian rộng Tan"
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
