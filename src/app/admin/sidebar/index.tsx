"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const menuItems = [
  { name: "Sản Phẩm", href: "/admin/products" },
  { name: "Danh mục", href: "/admin/categories" },
  //   { name: "Menu", href: "/pages/menu" },
  //   { name: "Product", href: "/pages/products" },
  //   { name: "Contact", href: "/pages/contact" },
  //   { name: "Evaluate", href: "/pages/reviews" },
];
const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen bg-[#E6E7EB] w-[300px] p-4">
      <div className="text-xl text-black flex items-center mb-2">TAN CAFE</div>
      <div className="flex flex-col gap-y-2">
        {menuItems.map((item: any, index: number) => (
          <div key={index}>
            <Link
              href={item.href}
              className={`transition-colors duration-200 w-full
                  ${pathname === item.href ? " text-[#5B3B0E]" : "text-black"}
                `}
            >
              {item.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
