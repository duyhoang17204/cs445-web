"use client";
import React from "react";
import { useState, useEffect } from "react";
import ProductService from "../api/products";
import CategoryService from "../api/categories";

interface CategoryProps {
  onSelect: (category: string) => void;
}

export default function Category({ onSelect }: CategoryProps) {
  const [products, setProducts] = useState([]);
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
  const getProducts = async () => {
    try {
      const res: any = await ProductService.getAll({
        query: {
          category_id: "",
        },
      });
      if (res) {
        setProducts(res);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCategory();
    getProducts();
  }, []);
  return (
    <div className="flex flex-col gap-3 mt-10">
      {categories.map((item: any, index) => (
        <div
          key={index}
          onClick={() => onSelect(item)}
          className="bg-[#5B3B0E] cursor-pointer text-[#D9CEBC] text-[40px] px-4  rounded-r-[40px] w-fit h-[64px] shadow-[0_4px_4px_rgba(0,0,0,0.4)]
                        hover:bg-[#774d12] transition-colors
          "
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
