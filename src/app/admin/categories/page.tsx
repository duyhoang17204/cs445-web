"use client";
import React, { useState } from "react";
import HeaderAdmin from "../components/header";
import FormField from "@/app/component/form-field";
import CategoryService from "@/app/api/categories";

const CategoriesAdmin = () => {
  const [categoryForm, setCategoryForm] = useState({
    key: "",
    name: "",
  });

  const handleSubmit = async () => {
    try {
      await CategoryService.create(categoryForm);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="px-3 py-4">
        <div className="py-3">Trang danh mục</div>
        <div className="flex gap-x-2 ">
          <FormField
            value={categoryForm.key}
            onChange={(value) =>
              setCategoryForm((prev) => ({ ...prev, key: value }))
            }
            wrapperClass="max-w-[220px] !bg-none border border-1 rounded-md"
            customClass="bg-white text-black"
            placeholder="key"
          />
          <FormField
            value={categoryForm.name}
            onChange={(value) =>
              setCategoryForm((prev) => ({ ...prev, name: value }))
            }
            wrapperClass="max-w-[220px] !bg-none border border-1 rounded-md"
            customClass="bg-white text-black"
            placeholder="Tên sản phẩm"
          />

          <button
            className="rounded-full bg-[#A8792B] text-white px-3"
            onClick={handleSubmit}
          >
            Tạo mới sản phẩm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesAdmin;
