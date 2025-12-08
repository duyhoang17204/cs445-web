"use client";
import React, { useCallback, useEffect, useState } from "react";
import HeaderAdmin from "../components/header";
import FormField from "@/app/component/form-field";
import ProductService from "@/app/api/products";
import CategoryService from "@/app/api/categories";
import { Dropdown } from "primereact/dropdown";
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
    image: "",
  });
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    getCategory();
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res: any = await ProductService.getAll({
        query: {
          category_id: "",
        },
      });
      if (res) {
        setProducts(res);
      }
    } catch (error) {
      console.log(error);
    }
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

  // ✅ Hàm tạo mới hoặc cập nhật
  const handleSubmit = async () => {
    try {
      if (editingId) {
        await ProductService.update(editingId, productForm);
        setEditingId(null);
      } else {
        await ProductService.create(productForm);
      }

      // Reset form
      setProductForm({
        name: "",
        price: "",
        category_id: "",
        image: "",
      });

      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item: any) => {
    setProductForm({
      name: item.name,
      price: item.price,
      category_id: item.category_id,
      image: item.image,
    });
    setEditingId(item._id);
  };

  const onFilter = (name: string, value: string) => {
    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async (e: any) => {
    try {
      await ProductService.deleted({
        params: {
          id: e._id,
        },
      });
      const _data = products.filter((val: any) => val._id !== e._id);
      setProducts(_data);
    } catch (error) {}
  };

  console.log(products);

  return (
    <div className="w-full">
      <HeaderAdmin />
      <div className="px-3 py-4 flex flex-col gap-y-2">
        <div className="py-3 text-lg font-semibold">Trang sản phẩm</div>

        {/* Form nhập sản phẩm */}
        <div className="flex gap-x-2 w-full ">
          <div className="flex gap-x-2 w-full">
            <FormField
              value={productForm.name}
              onChange={(value) =>
                setProductForm((prev) => ({ ...prev, name: value }))
              }
              wrapperClass="w-1/3 border rounded-md"
              customClass="bg-white text-black"
              placeholder="Tên sản phẩm"
            />
            <FormField
              value={productForm.price}
              onChange={(value) =>
                setProductForm((prev) => ({ ...prev, price: value }))
              }
              wrapperClass="w-1/3 border rounded-md"
              customClass="bg-white text-black"
              placeholder="Giá"
            />
            <FormField
              value={productForm.image}
              onChange={(value) =>
                setProductForm((prev) => ({ ...prev, image: value }))
              }
              wrapperClass="w-1/3 border rounded-md"
              customClass="bg-white text-black"
              placeholder="Image Url"
            />
            <Dropdown
              className="w-1/3 border rounded-md px-2 flex items-center "
              value={productForm.category_id}
              options={categories.map((item: any) => ({
                label: item.name,
                value: item.key,
              }))}
              onChange={(e) => onFilter("category_id", e.value)}
              placeholder="Chọn danh mục"
            />
          </div>
          <button
            className="rounded-full bg-[#A8792B] text-white px-3 whitespace-nowrap"
            onClick={handleSubmit}
          >
            {editingId ? "Cập nhật sản phẩm" : "Tạo mới sản phẩm"}
          </button>
        </div>

        {/* Bảng sản phẩm */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm text-left">
            <thead className="bg-[#5C3B0E] text-white">
              <tr>
                <th className="px-4 py-2 border-b border-gray-300">#</th>
                <th className="px-4 py-2 border-b border-gray-300">
                  Tên sản phẩm
                </th>
                <th className="px-4 py-2 border-b border-gray-300">Giá</th>
                <th className="px-4 py-2 border-b border-gray-300">Danh mục</th>
                <th className="px-4 py-2 border-b border-gray-300">Tùy chọn</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item: any, index: number) => (
                <tr key={item._id} className="hover:bg-gray-50">
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
