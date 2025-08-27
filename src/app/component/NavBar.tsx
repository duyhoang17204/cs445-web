"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import cart from "@/app/image/cart.png";

import UserDropdown from "@/app/component/DropDown";

export default function NavBar() {
  const menuItems = [
    { name: "Home", href: "/pages/home" },
    { name: "About", href: "/pages/about" },
    { name: "Menu", href: "/pages/menu" },
    { name: "Product", href: "/pages/products" },
    { name: "Contact", href: "/pages/contact" },
    { name: "Evaluate", href: "/pages/reviews" },
  ];

  return (
    <nav className="w-full bg-[#D9CEBC] px-20 py-6 flex justify-between items-center shadow-md">
      <div className="text-[#5B3B0E] text-5xl font-extrabold">Tan.</div>

      <ul className="hidden md:flex items-center justify-between gap-10 text-2xl max-w-[1066px] w-full bg-[#5B3B0E] h-[88px] rounded-[50px] px-10">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="block w-[110px] py-2.5 text-center rounded-[40px] text-[#D9CEBC] hover:text-[#5B3B0E] hover:bg-[#D9CEBC] transition-colors duration-200"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-8">
        <Image
          src={cart}
          alt="cart"
          width={50}
          height={50}
          className="cursor-pointer"
        />

        <div className="mt-2">
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
}
