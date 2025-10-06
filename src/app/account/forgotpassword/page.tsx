"use client";
import React, { useState } from "react";
import AuthServices from "@/app/api/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage("❗ Vui lòng nhập email của bạn!");
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      await AuthServices.forgotPassword({ email });
      setMessage("✅ Mã đặt lại mật khẩu đã được gửi đến email của bạn!");
    } catch (error) {
      setMessage("❌ Không thể gửi, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#D9CEBC] px-4">
      <div className="w-full max-w-[450px] bg-white rounded-3xl shadow-lg p-8">
        <h2 className="text-center text-3xl text-[#9d6b2a] font-semibold mb-4">
          Quên Mật Khẩu
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Nhập email để nhận hướng dẫn đặt lại mật khẩu
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm mb-2">
              Email của bạn
            </label>
            <input
              type="email"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#9d6b2a]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#9d6b2a] text-white font-medium py-2 rounded-lg hover:bg-[#8a5f22] transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Đang gửi..." : "Gửi lại mật khẩu"}
          </button>
        </form>

        {message && (
          <div className="mt-6 text-center text-sm text-gray-700">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
