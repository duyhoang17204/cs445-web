"use client";
import React, { useCallback, useEffect, useState } from "react";
import HeaderAdmin from "../components/header";
import FormField from "@/app/component/form-field";
import ProductService from "@/app/api/products";
import CategoryService from "@/app/api/categories";
import { MultiSelect } from "primereact/multiselect";
import { on } from "events";

const Page = () => {
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const res: any = await CategoryService.getAll();
      if (res) {
        setCategories(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    try {
      await ProductService.create(productForm);
    } catch (error) {
      console.log(error);
    }
  };

  const onFilter = (name: string, value: string) => {
    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(productForm);

  return (
    <div className="w-full">
      <HeaderAdmin />
      <div className="px-3 py-4">
        <div className="py-3">Trang sản phẩm</div>
        <div className="flex gap-x-2 ">
          {/* <FormField
            wrapperClass="max-w-[220px] !bg-none border border-1 rounded-md"
            customClass="bg-white text-black"
            placeholder="ID sản phẩm"
          /> */}
          <FormField
            value={productForm.name}
            onChange={(value) =>
              setProductForm((prev) => ({ ...prev, name: value }))
            }
            wrapperClass="max-w-[220px] !bg-none border border-1 rounded-md"
            customClass="bg-white text-black"
            placeholder="Tên sản phẩm"
          />
          <FormField
            value={productForm.price}
            onChange={(value) =>
              setProductForm((prev) => ({ ...prev, price: value }))
            }
            wrapperClass="max-w-[220px] !bg-none border border-1 rounded-md"
            customClass="bg-white text-black"
            placeholder="Giá"
          />
          {/* <FormField
            wrapperClass="max-w-[220px] !bg-none border border-1 rounded-md"
            customClass="bg-white text-black"
            placeholder="ID danh mục"
          /> */}
          <MultiSelect
            className="min-w-[220px] border rounded-md px-2 flex items-center "
            value={productForm.category_id}
            options={categories.map((item: any) => ({
              label: item.name,
              value: item.key,
            }))}
            onChange={(e) => onFilter("category_id", e.value)}
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

export default Page;
