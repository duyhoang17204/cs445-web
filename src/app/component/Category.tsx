"use client";
import React from "react";
import { useState, useEffect } from "react";
import ProductService from "../api/products";
import CategoryService from "../api/categories";
import { useRouter } from "next/navigation";

interface CategoryProps {
  onSelect: (category: string) => void;
}

export default function Category({ onSelect }: CategoryProps) {
  const [categories, setCategories] = useState([]);

  const getCategory = async () => {
    try {
      const res: any = await CategoryService.getAll();
      if (res) {
        setCategories(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeTab = (key: string) => {
    onSelect(key);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="flex flex-col gap-3 mt-10">
      {categories.map((item: any, index) => (
        <div
          key={index}
          onClick={(e: any) => handleChangeTab(item.key)}
          className="bg-[#5B3B0E] cursor-pointer text-[#D9CEBC] text-[40px] px-4  rounded-r-[40px] w-fit h-[64px] shadow-[0_4px_4px_rgba(0,0,0,0.4)]  hover:bg-[#774d12] transition-colors uppercase"
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
