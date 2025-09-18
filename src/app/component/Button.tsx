import React from "react";

type PropsButton = {
  name?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({ name, className, onClick }: PropsButton) {
  return (
    <button
      className={`${className} w-auto px-6 bg-[#A8792B] text-[#D9CEBC] font-semibold py-3 rounded-full shadow-md hover:bg-[#452F0B] transition`}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
