"use client";
import React from "react";
import Image from "next/image";

export default function Contact() {
  return (
    <div className="w-[1900px] bg-[#D9CEBC] px-10 py-16 flex justify-center gap-20">
      <div className="">
        <Image
          src="/images/map.png"
          alt="map"
          width="545"
          height="823"
          className="rounded-md border-0"
        />
      </div>

      <div className="">
        <h2 className="text-3xl font-bold text-[#452F0B]">Liên hệ</h2>

        <div className="space-y-2 text-lg">
          <p>
            <span className="font-semibold text-[#A8792B]">
              Địa chỉ chúng tôi:
            </span>{" "}
            <br />
            14 Phạm Hồng Thái, Huế
          </p>
          <p>
            <span className="font-semibold text-[#A8792B]">
              Email chúng tôi:
            </span>{" "}
            <br />
            contact@coffee.vn
          </p>
          <p>
            <span className="font-semibold text-[#A8792B]">Điện thoại:</span>{" "}
            <br />
            0123 456 789
          </p>
          <p>
            <span className="font-semibold text-[#A8792B]">
              Thời gian làm việc:
            </span>{" "}
            <br />
            8h - 22h hằng ngày
          </p>
        </div>

        <h3 className="text-2xl font-semibold text-[#452F0B] mt-6">
          Gửi thắc mắc cho chúng tôi
        </h3>

        <form className="space-y-4 w-[500px]">
          <input
            type="text"
            placeholder="Tên của bạn"
            className="w-full p-3 rounded bg-[#A8792B] text-white placeholder-white"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Email của bạn"
              className="w-full p-3 rounded bg-[#A8792B] text-white placeholder-white"
            />
            <input
              type="text"
              placeholder="Số điện thoại của bạn"
              className="w-full p-3 rounded bg-[#A8792B] text-white placeholder-white"
            />
          </div>
          <textarea
            placeholder="Nội dung"
            className="w-full p-3 h-32 rounded bg-[#A8792B] text-white placeholder-white"
          ></textarea>

          <button
            type="submit"
            className="px-6 py-3 bg-[#452F0B] text-[#D9CEBC] font-medium rounded-lg hover:bg-[#A8792B] transition-colors"
          >
            Gửi cho chúng tôi
          </button>
        </form>
      </div>
    </div>
  );
}
