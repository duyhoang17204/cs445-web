"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Loading from "@/app/component/Loading";
import ButtonPay from "@/app/component/ButtonPay";
import ButtonAdd from "@/app/component/ButtonAdd";
import ProductService from "@/app/api/products";

interface Item {
  _id: string;
  name: string;
  price?: string;
  image?: string;
}

export default function Page() {
  const { id } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState<number>(0);

  useEffect(() => {
    if (id) getProduct();
  }, [id]);

  const getProduct = async () => {
    try {
      const res: any = await ProductService.getProductById({
        params: { id },
      });

      if (!res) return;

      setItem(res);
      const priceNum = Number(res.price?.replace(/[^\d]/g, "")) || 0;
      setUnitPrice(priceNum);
    } catch (error) {
      console.error(error);
    }
  };

  if (!item) return <Loading />;

  const totalPrice = unitPrice * quantity;

  const formatPrice = (price: number) =>
    price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  return (
    <div className="flex justify-center gap-20 w-full mx-auto p-6 bg-[#D9CEBC]">
      {item.image && (
        <Image
          src={item.image}
          alt={item.name}
          width={486}
          height={520}
          className="mb-6 object-contain"
        />
      )}
      <div>
        <h1 className="text-[40px] text-[#452F0B] font-semibold mb-4">
          {item.name}
        </h1>

        {item._id && (
          <p className="text-2xl text-[#452F0B] font-medium mb-6">
            Mã sản phẩm: {item._id}
          </p>
        )}

        <p className="text-[40px] text-[#452F0B] font-semibold mb-6">
          {formatPrice(totalPrice)}
        </p>

        <div className="bg-[#5B3B0E] w-[530px] h-[3px] mb-8"></div>

        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1 border rounded text-xl hover:bg-[#A8792B] transition-colors"
          >
            -
          </button>
          <span className="text-2xl text-center w-[30px]">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1 border rounded text-xl hover:bg-[#A8792B] transition-colors"
          >
            +
          </button>
        </div>

        <div className="flex flex-col gap-10">
          <ButtonAdd />
          <ButtonPay />
        </div>
      </div>
    </div>
  );
}
