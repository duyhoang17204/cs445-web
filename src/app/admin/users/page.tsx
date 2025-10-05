"use client";
import React, { useEffect, useState } from "react";
import HeaderAdmin from "../components/header";
import FormField from "@/app/component/form-field";
import ProductService from "@/app/api/products";
import { Dropdown } from "primereact/dropdown";
import { formatLocalTime } from "../../../../utils/common";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import UserService from "@/app/api/user";

const Page = () => {
  const [userForm, setUserForm] = useState({
    email: "",
    role: "",
    full_name: "",
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res: any = await UserService.getAll();
      if (res) {
        setData(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    try {
      await ProductService.create(userForm);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (e: any) => {
    try {
      console.log(e);
      await UserService.deleted({
        params: {
          id: e._id,
        },
      });
      const _data = data.filter((val: any) => val._id !== e._id);
      setData(_data);
    } catch (error) {}
  };

  return (
    <div className="w-full">
      <HeaderAdmin />
      <div className="px-3 py-4 flex flex-col gap-y-2">
        <div className="py-3">Trang sản phẩm</div>
        <div className="flex gap-x-2 w-full ">
          <div className="flex gap-x-2 w-full">
            <FormField
              value={userForm.email}
              onChange={(value) =>
                setUserForm((prev) => ({ ...prev, email: value }))
              }
              wrapperClass="w-1/3 !bg-none border border-1 rounded-md"
              customClass="bg-white text-black"
              placeholder="Tên sản phẩm"
            />
            <FormField
              value={userForm.full_name}
              onChange={(value) =>
                setUserForm((prev) => ({ ...prev, full_name: value }))
              }
              wrapperClass="w-1/3 !bg-none border border-1 rounded-md"
              customClass="bg-white text-black"
              placeholder="Giá"
            />
            <FormField
              value={userForm.role}
              onChange={(value) =>
                setUserForm((prev) => ({ ...prev, role: value }))
              }
              wrapperClass="w-1/3 !bg-none border border-1 rounded-md"
              customClass="bg-white text-black"
              placeholder="Giá"
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
                  Email
                </th>
                <th className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                  Vai Trò
                </th>
                <th className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                  Ngày tạo
                </th>
                <th className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                  Trạng thái
                </th>
                <th className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                  Tùy chọn
                </th>
              </tr>
            </thead>
            {data.map((item: any, index: number) => (
              <tbody key={index}>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b border-gray-200">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {item.email}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {item.role}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {item.createdAt && formatLocalTime(item.createdAt)}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {item.status}
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

export default Page;
