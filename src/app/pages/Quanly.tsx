"use client";

import { useState } from "react";
import Button from "@/app/component/Button";

export default function DashBoard() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      title: "Báo cáo doanh thu tháng 1",
      totalOrders: 120,
      totalRevenue: 2500000, // VNĐ
      bestSeller: "Cà phê sữa đá",
    },
    {
      id: 2,
      title: "Báo cáo doanh thu tháng 2",
      totalOrders: 98,
      totalRevenue: 2100000,
      bestSeller: "Trà sữa trân châu",
    },
    {
      id: 3,
      title: "Báo cáo doanh thu tuần 1 tháng 3",
      totalOrders: 30,
      totalRevenue: 650000,
      bestSeller: "Cà phê đen đá",
    },
    {
      id: 4,
      title: "Báo cáo doanh thu tuần 2 tháng 3",
      totalOrders: 42,
      totalRevenue: 970000,
      bestSeller: "Matcha Latte",
    },
    {
      id: 5,
      title: "Báo cáo tổng quan quý 1",
      totalOrders: 260,
      totalRevenue: 5570000,
      bestSeller: "Cà phê sữa đá",
    },
  ]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-200 shadow-md">
        <div className="p-4 text-lg font-bold">TAN CAFE</div>
        <ul className="space-y-2">
          <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer">
            Trang chủ
          </li>
          <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer">
            Danh mục
          </li>
          <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer">
            Sản phẩm
          </li>
          <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer">
            Đánh giá
          </li>
          <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer">
            Bình luận
          </li>
          <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer">
            Tài khoản
          </li>
        </ul>
      </div>

      <div className="flex-1">
        <div className="bg-[#5B3B0E] text-white flex justify-between items-center px-6 py-3">
          <h1 className="text-xl font-semibold">Quản lý</h1>
          <div className="rounded-full bg-gray-700 w-8 h-8 flex items-center justify-center">
            👤
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Trang báo cáo thống kê</h2>

          <div className="flex space-x-4 mb-6">
            <input
              type="text"
              placeholder="ID "
              className="border px-3 py-2 rounded-md flex-1"
            />
            <input
              type="text"
              placeholder="Tiêu đề"
              className="border px-3 py-2 rounded-md flex-1"
            />
            <input
              type="text"
              placeholder="Tổng số đơn hàng"
              className="border px-3 py-2 rounded-md flex-1"
            />
            <input
              type="text"
              placeholder="Tổng doanh thu"
              className="border px-3 py-2 rounded-md flex-1"
            />
            <input
              type="text"
              placeholder="SP bán chạy"
              className="border px-3 py-2 rounded-md flex-1"
            />
            <Button name="Tạo Mới Báo Cáo " />
          </div>

          {/* Table */}
          <table className="w-full border shadow-md">
            <thead className="bg-[#5B3B0E] text-white">
              <tr>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Tiêu đề</th>

                <th className="py-2 px-4 text-left">Tổng đơn hàng</th>
                <th className="py-2 px-4 text-left">Tổng doanh thu</th>
                <th className="py-2 px-4 text-left">SP bán chạy</th>
                <th className="py-2 px-4 text-left">Tùy Chọn</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id} className="border-b">
                  <td className="py-2 px-4">{c.id}</td>
                  <td className="py-2 px-4">{c.title}</td>
                  <td className="py-2 px-4">{c.totalOrders}</td>
                  <td className="py-2 px-4">{c.totalRevenue}</td>
                  <td className="py-2 px-4">{c.bestSeller}</td>
                  <td className="py-2 px-4 space-x-2">
                    <button className="px-3 py-1 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-100">
                      UPDATE
                    </button>
                    <button className="px-3 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-100">
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
