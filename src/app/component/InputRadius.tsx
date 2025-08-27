import React from "react";

type PropsInput = {
  type: string;
  placeholder: string;
};

export default function InputRadius({ type, placeholder }: PropsInput) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-full bg-[#F1E4D0] text-[#452F0B] placeholder-[#7A551C]/60
                 border border-transparent focus:border-[#A8792B] 
                 focus:ring-2 focus:ring-[#A8792B]/40 outline-none transition shadow-sm"
    />
  );
}
