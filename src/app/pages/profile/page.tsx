"use client";
import React from "react";

import InputRadius from "@/app/component/InputRadius";
import Button from "@/app/component/Button";
import Title from "@/app/component/Title";
import { useRouter } from "next/navigation";
export default function Profile() {
  const router = useRouter();

  const handleHome = () => {
    router.push("/pages/home");
  };

  const handleChangePW = () => {
    router.push("/pages/changepassword");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#D9CEBC]">
      <div className="w-full max-w-[500px] bg-white rounded-3xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Title name="Thông Tin Cá Nhân" />
          <p className="text-gray-500 text-sm">
            Quản lý và cập nhật tài khoản của bạn
          </p>
        </div>

        <div className="space-y-5">
          <InputRadius type="text" placeholder=" Email" />
          <InputRadius type="text" placeholder=" Họ Tên" />
          <InputRadius type="password" placeholder=" Mật Khẩu" />
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Button name=" Xác nhận" onclick={() => handleHome()} />
          <Button name=" Thay đổi mật khẩu" onclick={() => handleChangePW()} />
        </div>
      </div>
    </div>
  );
}
