"use client";
import React, { useEffect, useState } from "react";
import HeaderAdmin from "../components/header";
import FormField from "@/app/component/form-field";
import CategoryService from "@/app/api/categories";
import { formatLocalTime } from "../../../../utils/common";

const CategoriesAdmin = () => {
  const [categoryForm, setCategoryForm] = useState({
    key: "",
    name: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCagtegories();
  }, []);

  const getCagtegories = async () => {
    try {
      const res: any = await CategoryService.getAll();
      if (res) {
        setCategories(res);
      }
    } catch (error) {}
  };

  const handleSubmit = async () => {
    try {
      await CategoryService.create(categoryForm);
      getCagtegories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e: any) => {
    try {
      await CategoryService.deleted({
        params: {
          id: e._id,
        },
      });
      const _data = categories.filter((val: any) => val._id !== e._id);
      setCategories(_data);
    } catch (error) {}
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="px-3 py-4 flex flex-col gap-y-4">
        <div className="py-3">Trang danh mục</div>
        <div className="flex gap-x-2 ">
          <div className="w-full flex gap-x-2">
            <FormField
              value={categoryForm.key}
              onChange={(value) =>
                setCategoryForm((prev) => ({ ...prev, key: value }))
              }
              wrapperClass="w-1/2 !bg-none border border-1 rounded-md"
              customClass="bg-white text-black"
              placeholder="key"
            />
            <FormField
              value={categoryForm.name}
              onChange={(value) =>
                setCategoryForm((prev) => ({ ...prev, name: value }))
              }
              wrapperClass="w-1/2 !bg-none border border-1 rounded-md"
              customClass="bg-white text-black"
              placeholder="Tên sản phẩm"
            />
          </div>

          <button
            className="rounded-full bg-[#A8792B] text-white px-3 whitespace-nowrap"
            onClick={handleSubmit}
          >
            Tạo mới sản phẩm
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm text-left">
            {}
            <thead className="bg-[#5C3B0E] text-white">
              <tr>
                <th className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                  ID
                </th>
                <th className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                  Tên danh mục
                </th>
                <th className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                  Được tạo bởi
                </th>
                <th className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                  Ngày tạo
                </th>
                <th className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                  Tùy chọn
                </th>
              </tr>
            </thead>
            {categories.map((item: any, index: number) => (
              <tbody key={index}>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b border-gray-200">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {item.name}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">Admin</td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {formatLocalTime(item.createdAt)}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    <div className="flex gap-x-2">
                      <button className="border border-blue-500 p-1 rounded-md text-blue-500">
                        UPDATE
                      </button>
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
