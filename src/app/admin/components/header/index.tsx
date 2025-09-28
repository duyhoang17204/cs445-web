import React from "react";

const HeaderAdmin = (props: any) => {
  const { nameHeader } = props;
  return (
    <div className="flex items-center justify-between w-full py-2 px-4 bg-[#5C3B0E] text-white">
      Quản lý
    </div>
  );
};

export default HeaderAdmin;
