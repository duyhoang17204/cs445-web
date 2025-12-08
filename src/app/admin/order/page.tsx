"use client";
import React, { useEffect, useState } from "react";
import HeaderAdmin from "../components/header";
import CategoryService from "@/app/api/categories";
import { formatLocalTime } from "../../../../utils/common";
import BuyProductService from "@/app/api/buy-products";

const CategoriesAdmin = () => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getCagtegories();
  }, []);

  const getCagtegories = async () => {
    try {
      const res: any = await BuyProductService.getAll();
      if (res) {
        setOrder(res);
      }
    } catch (error) {}
  };

  const handleDelete = async (e: any) => {
    try {
      await CategoryService.deleted({
        params: {
          id: e._id,
        },
      });
      const _data = order.filter((val: any) => val._id !== e._id);
      setOrder(_data);
    } catch (error) {}
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="px-3 py-4 flex flex-col gap-y-4">
        <div className="py-3">Trang sản phẩm</div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm text-left">
            {}
            <thead className="bg-[#5C3B0E] text-white">
              <tr>
                <th className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                  User ID
                </th>
                <th className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                  Tên đơn hàng
                </th>
                <th className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                  Ngày
                </th>
                <th className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                  ID Sản Phẩm
                </th>
                <th className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                  Tùy chọn
                </th>
              </tr>
            </thead>
            {order.map((item: any, index: number) => (
              <tbody key={index}>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b border-gray-200">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {item.name_product}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">Admin</td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {formatLocalTime(item.createdAt)}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    <div className="flex gap-x-2">
                      <button
                        className="border border-red-500 p-1 rounded-md text-red-500"
                        onClick={(e) => handleDelete(item)}
                      >
                        DELETE
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoriesAdmin;
