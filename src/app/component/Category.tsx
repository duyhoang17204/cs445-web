"use client";
import React from "react";
import { useState, useEffect } from "react";

interface CategoryProps {
  onSelect: (category: string) => void;
}

export default function Category({ onSelect }: CategoryProps) {
  const [category, setCategory] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/category");
      const data = await res.json();
      setCategory(data.category);
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col gap-3 mt-10">
      {category.map((item, index) => (
        <div
          key={index}
          onClick={() => onSelect(item)}
          className="bg-[#5B3B0E] cursor-pointer text-[#D9CEBC] text-[40px] px-4  rounded-r-[40px] w-fit h-[64px] shadow-[0_4px_4px_rgba(0,0,0,0.4)]
                        hover:bg-[#774d12] transition-colors
          "
        >
          {item}
        </div>
      ))}
    </div>
  );
}
