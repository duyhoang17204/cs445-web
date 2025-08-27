import React from "react";

type PropsButton = {
  name: string;
  onclick: () => void;
};

export default function Button({ name, onclick }: PropsButton) {
  return (
    <button
      className="w-auto px-6 bg-[#A8792B] text-[#D9CEBC] font-semibold py-3 rounded-full shadow-md hover:bg-[#452F0B] transition"
      onClick={onclick}
    >
      {name}
    </button>
  );
}
