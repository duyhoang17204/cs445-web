"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "@/app/component/Loading";
import Image from "next/image";
import ProductService from "../api/products";

interface Product {
  _id: string;
  name: string;
  price: string;
  image: string;
  category_id: string;
  status: string;
}

interface MenuListProps {
  selectedCategory: string;
}

export default function MenuList({ selectedCategory }: MenuListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const res: any = await ProductService.getAll({
        query: {
          category_id: selectedCategory || "",
        },
      });
      setProducts(res || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) return <Loading />;

  const grouped = products.reduce((acc: Record<string, Product[]>, product) => {
    if (!acc[product.category_id]) {
      acc[product.category_id] = [];
    }
    acc[product.category_id].push(product);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} id={category}>
          <h2 className="text-[40px] text-[#5B3B0E] font-medium mr-2.5 mb-4">
            {category}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-8">
            {items.map((product) => (
              <Link
                key={product._id}
                href={`/pages/detail-menu/${product._id}`}
              >
                <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform">
                  {/* <Image
                    src={product?.image || "/images/no-image.png"}
                    alt={product.name}
                    className="w-[250px] h-[295px] object-cover mb-2 rounded-md"
                    width={250}
                    height={295}
                  /> */}
                  <img src={product.image} width={250} height={295} alt="" />
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-gray-600">
                    {Number(product.price).toLocaleString()}₫
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
