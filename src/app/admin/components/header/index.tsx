import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const HeaderAdmin = () => {
  const router = useRouter();

  const handleLogOut = () => {
    Cookies.remove("token_auth");
    router.push("/pages/home");
  };
  return (
    <div className="flex items-center justify-between w-full py-2 px-4 bg-[#5C3B0E] text-white">
      <div>Quản lí</div>
      <div onClick={handleLogOut}>
        <img src="/images/user.png" alt="" width={20} height={20} />
      </div>
    </div>
  );
};

export default HeaderAdmin;
