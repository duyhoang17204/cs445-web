"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "@/app/image/cart.png";
import { usePathname } from "next/navigation";
import Cart from "@/app/component/cart";
import UserDropdown from "@/app/component/DropDown";

export default function NavBar() {
  const pathname = usePathname();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { name: "Home", href: "/pages/home" },
    { name: "About", href: "/pages/about" },
    { name: "Menu", href: "/pages/menu" },
    { name: "Product", href: "/pages/products" },
    { name: "Contact", href: "/pages/contact" },
    { name: "Evaluate", href: "/pages/reviews" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="relative w-full bg-[#D9CEBC] px-20 py-6 flex justify-between items-center shadow-md">
      <div className="text-[#5B3B0E] text-5xl font-extrabold">Tan.</div>

      <ul className="hidden md:flex items-center justify-between gap-10 text-2xl max-w-[1066px] w-full bg-[#5B3B0E] h-[88px] rounded-[50px] px-10">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`block w-[110px] py-2.5 text-center rounded-[40px] transition-colors duration-200
                  ${
                    isActive
                      ? "bg-[#D9CEBC] text-[#5B3B0E]"
                      : "text-[#D9CEBC] hover:text-[#5B3B0E] hover:bg-[#D9CEBC]"
                  }
                `}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-8 relative" ref={cartRef}>
        <Image
          src={CartIcon}
          alt="cart"
          width={50}
          height={50}
          className="cursor-pointer"
          onClick={() => setIsCartOpen((prev) => !prev)}
        />

        {isCartOpen && (
          <div className="absolute top-[92px] right-0">
            <Cart onClose={() => setIsCartOpen(false)} />
          </div>
        )}

        <div className="mt-2">
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
}
