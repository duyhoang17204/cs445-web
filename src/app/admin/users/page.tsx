"use client";
import React, { useEffect, useState } from "react";
import HeaderAdmin from "../components/header";
import FormField from "@/app/component/form-field";
import UserService from "@/app/api/user";
import { formatLocalTime } from "../../../../utils/common";

const Page = () => {
  const [userForm, setUserForm] = useState({
    email: "",
    role: "",
    full_name: "",
  });
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res: any = await UserService.getAll();
      if (res) setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await UserService.updated(editingId, userForm);
        setEditingId(null);
        setUserForm({ email: "", role: "", full_name: "" });
        getUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (item: any) => {
    try {
      await UserService.deleted({ params: { id: item._id } });
      setData(data.filter((val: any) => val._id !== item._id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item: any) => {
    setUserForm({
      email: item.email,
      role: item.role,
      full_name: item.full_name,
    });
    setEditingId(item._id);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setUserForm({ email: "", role: "", full_name: "" });
  };

  return (
    <div className="w-full">
      <HeaderAdmin />
      <div className="px-3 py-4 flex flex-col gap-y-2">
        <div className="py-3 text-lg font-semibold">Quản lý người dùng</div>

        {editingId && (
          <div className="flex gap-x-2 w-full mb-3">
            <FormField
              value={userForm.email}
              onChange={(value) =>
                setUserForm((prev) => ({ ...prev, email: value }))
              }
              wrapperClass="w-1/3 border rounded-md"
              customClass="bg-white text-black"
              placeholder="Email"
            />
            <FormField
              value={userForm.full_name}
              onChange={(value) =>
                setUserForm((prev) => ({ ...prev, full_name: value }))
              }
              wrapperClass="w-1/3 border rounded-md"
              customClass="bg-white text-black"
              placeholder="Họ tên"
            />
            <FormField
              value={userForm.role}
              onChange={(value) =>
                setUserForm((prev) => ({ ...prev, role: value }))
              }
              wrapperClass="w-1/3 border rounded-md"
              customClass="bg-white text-black"
              placeholder="Vai trò"
            />
            <button
              className="rounded-full bg-[#A8792B] text-white px-3 whitespace-nowrap"
              onClick={handleSubmit}
            >
              Cập nhật
            </button>
            <button
              className="rounded-full bg-gray-400 text-white px-3 whitespace-nowrap"
              onClick={cancelEdit}
            >
              Hủy
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm text-left">
            <thead className="bg-[#5C3B0E] text-white">
              <tr>
                <th className="px-4 py-2 border-b border-gray-300">#</th>
                <th className="px-4 py-2 border-b border-gray-300">Email</th>
                <th className="px-4 py-2 border-b border-gray-300">Họ tên</th>
                <th className="px-4 py-2 border-b border-gray-300">Vai trò</th>
                <th className="px-4 py-2 border-b border-gray-300">Ngày tạo</th>
                <th className="px-4 py-2 border-b border-gray-300">
                  Trạng thái
                </th>
                <th className="px-4 py-2 border-b border-gray-300">Tùy chọn</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any, index: number) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b border-gray-200">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {item.email}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {item.full_name}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {item.role}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {formatLocalTime(item.createdAt)}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {item.status}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    <div className="flex gap-x-2">
                      <button
                        className="border border-blue-500 p-1 rounded-md text-blue-500"
                        onClick={() => handleEdit(item)}
                      >
                        UPDATE
                      </button>
                      <button
                        className="border border-red-500 p-1 rounded-md text-red-500"
                        onClick={() => handleDelete(item)}
                      >
                        DELETE
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
