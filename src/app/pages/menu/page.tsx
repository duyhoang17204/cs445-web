"use client";
import React, { useState } from "react";
import Category from "@/app/component/Category";
import MenuList from "@/app/component/MenuList";

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleScroll = (category: string) => {
    setSelectedCategory(category);
    const el = document.getElementById(category);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-[#D9CEBC] px-20 pt-8 pb-40">
      <div className="flex justify-center gap-80">
        <Category onSelect={handleScroll} />
        <MenuList selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}
