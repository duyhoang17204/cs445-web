"use client";
import React from "react";
import Title from "@/app/component/Title";
import InputRadius from "@/app/component/InputRadius";
import Button from "@/app/component/Button";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#D9CEBC]">
      <div className="w-full max-w-[500px] bg-white rounded-3xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Title name="Thay Đổi Mật Khẩu" />
          <p className="text-gray-500 text-sm">
            Vui lòng nhập mật khẩu hiện tại và mật khẩu mới
          </p>
        </div>

        <div className="space-y-5">
          <InputRadius type="password" placeholder=" Mật khẩu hiện tại" />
          <InputRadius type="password" placeholder=" Mật khẩu mới" />
          <InputRadius type="password" placeholder=" Xác nhận mật khẩu mới" />
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <Button
            onclick={() => alert("Thay doi thanh cong")}
            name=" Xác nhận thay đổi"
          />
          <Button
            onclick={() => router.push("/account/profile")}
            name=" Quay lại Profile"
          />
        </div>
      </div>
    </div>
  );
}
