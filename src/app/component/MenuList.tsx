"use client";
import { useEffect, useState } from "react";

import Image from "next/image";
interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

export default function MenuList() {
  const [menu, setMenu] = useState<Product[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch("/api/menus");
        if (!res.ok) throw new Error("API error: " + res.status);
        const data = await res.json();
        console.log("API data:", data);
        setMenu(data.menus);
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    };
    fetchMenu();
  }, []);

  const grouped = menu.reduce((acc: Record<string, Product[]>, menus) => {
    if (!acc[menus.category]) {
      acc[menus.category] = [];
    }
    acc[menus.category].push(menus);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-[40px] text-[#5B3B0E]  font-medium mr-2.5 mb-4">
            {category}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-2">
            {items.map((product) => (
              <div key={product.id} className=" flex flex-col items-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-[250px] h-[295px] object-cover mb-2 rounded-md"
                  width={250}
                  height={295}
                />
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-gray-600">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
