"use client";
import React from "react";
import Category from "@/app/component/Category";
import MenuList from "@/app/component/MenuList";

export default function menu() {
  return (
    <div className="bg-[#D9CEBC] px-20 pt-8 pb-40">
      <div className="flex justify-center gap-80">
        <Category />
        <MenuList />
      </div>
    </div>
  );
}
