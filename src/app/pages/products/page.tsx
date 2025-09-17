"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Loading from "@/app/component/Loading";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

export default function ProductPage() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/product");
        if (!res.ok) throw new Error("API error: " + res.status);
        const data = await res.json();
        setProducts(data.product ?? []);
      } catch (err) {
        console.error("Fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  if (loading) return <Loading />;
  const itemsPerPage = 9;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col items-center py-20 text-center space-y-6 bg-[#D9CEBC]">
      <h2 className="inline-block bg-[#6B4F2D] text-[#D9CEBC] font-normal px-6 py-2 rounded-full text-4xl">
        Sản phẩm lưu niệm
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-9 w-[1245px]">
        {currentProducts.map((product) => (
          <Link key={product.id} href={`/pages/detail-product/${product.id}`}>
            <div className="flex flex-col items-center">
              <Image
                src={product.image}
                alt={product.name}
                width={334}
                height={336}
                className="rounded-xl shadow-md mb-3 object-cover"
              />
              <p className="font-medium">{product.name}</p>
              <p className="text-gray-700">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex w-[1245px] justify-between items-center gap-6 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="p-3 rounded-full bg-[#452F0B]/50 w-[61px] h-[61px] pl-3.5 "
        >
          <FaArrowLeft className="text-3xl" />
        </button>

        <span className="font-normal text-[32px] text-[#D9CEBC] w-[94px] bg-[#452F0B] rounded-[40px]">
          {page}/{totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="p-3 rounded-full bg-[#452F0B]/50 w-[61px] h-[61px] pl-3.5"
        >
          <FaArrowRight className="text-3xl" />
        </button>
      </div>
    </div>
  );
}
