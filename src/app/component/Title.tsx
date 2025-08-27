import React from "react";

type PropsTitle = {
  name: string;
};

export default function Title({ name }: PropsTitle) {
  return (
    <div>
      <h1 className="text-center text-[32px] font-bold text-[#5B3B0E] bg-[#D9CEBC] py-3 rounded-full mb-6">
        {name}
      </h1>
    </div>
  );
}
