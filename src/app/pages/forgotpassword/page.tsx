import React from "react";
import Title from "@/app/component/Title";
import InputRadius from "@/app/component/InputRadius";
import Button from "@/app/component/Button";

export default function ForgotPassword() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#D9CEBC] px-4">
      <div className="w-full max-w-[500px] bg-white rounded-3xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Title name="Quên Mật Khẩu" />
          <p className="text-gray-600 text-sm">
            Nhập email để nhận lại mật khẩu của bạn
          </p>
        </div>

        <div className="space-y-5">
          <InputRadius type="email" placeholder="Nhập Email" />
        </div>

        <div className="mt-8 flex justify-center">
          <Button name="Gửi lại mật khẩu" />
        </div>
      </div>
    </div>
  );
}
