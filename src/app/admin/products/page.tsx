"use client";
import React, { useCallback, useEffect, useState } from "react";
import HeaderAdmin from "../components/header";
import FormField from "@/app/component/form-field";
import ProductService from "@/app/api/products";
import CategoryService from "@/app/api/categories";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { on } from "events";
import { formatLocalTime } from "../../../../utils/common";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Page = () => {
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategory();
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res: any = await ProductService.getAll();
      if (res) {
        setProducts(res);
      }
    } catch (error) {}
  };

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

  return (
    <div className="w-full">
      <HeaderAdmin />
      <div className="px-3 py-4 flex flex-col gap-y-2">
        <div className="py-3">Trang sản phẩm</div>
        <div className="flex gap-x-2 w-full ">
          <div className="flex gap-x-2 w-full">
            <FormField
              value={productForm.name}
              onChange={(value) =>
                setProductForm((prev) => ({ ...prev, name: value }))
              }
              wrapperClass="w-1/3 !bg-none border border-1 rounded-md"
              customClass="bg-white text-black"
              placeholder="Tên sản phẩm"
            />
            <FormField
              value={productForm.price}
              onChange={(value) =>
                setProductForm((prev) => ({ ...prev, price: value }))
              }
              wrapperClass="w-1/3 !bg-none border border-1 rounded-md"
              customClass="bg-white text-black"
              placeholder="Giá"
            />
            <Dropdown
              className="w-1/3 border rounded-md px-2 flex items-center "
              value={productForm.category_id}
              options={categories.map((item: any) => ({
                label: item.name,
                value: item.name,
              }))}
              onChange={(e) => onFilter("category_id", e.value)}
              placeholder="Chọn danh mục"
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
                  Tên sản phẩm
                </th>
                <th className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                  Giá
                </th>
                <th className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                  Danh mục
                </th>
                <th className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                  Tùy chọn
                </th>
              </tr>
            </thead>
            {products.map((item: any, index: number) => (
              <tbody key={index}>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b border-gray-200">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {item.name}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {item.price}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {item.category_id}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    <div className="flex gap-x-2">
                      <button className="border border-blue-500 p-1 rounded-md text-blue-500">
                        UPDATE
                      </button>
                      <button
                        className="border border-red-500 p-1 rounded-md text-red-500"
                        // onClick={(e) => handleDelete(item)}
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
