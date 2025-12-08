"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Loading from "@/app/component/Loading";
import ButtonAdd from "@/app/component/ButtonAdd";
import ProductService from "@/app/api/products";
import dynamic from "next/dynamic";

interface Item {
  _id: string;
  name: string;
  price?: string;
  image?: string;
}

function Page() {
  const router = useRouter();
  const { id } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [added, setAdded] = useState(false);

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

  const handlePay = () => {
    localStorage.setItem(
      "orderData",
      JSON.stringify({
        id: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity,
        totalPrice,
      })
    );
    router.push("/pages/pay");
  };
  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

    const newItem = {
      id: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity,
      totalPrice,
    };

    const existingIndex = existingCart.findIndex(
      (p: any) => p.id === newItem.id
    );

    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity += quantity;
      existingCart[existingIndex].totalPrice += totalPrice;
    } else {
      existingCart.push(newItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(existingCart));

    alert("🛒 Sản phẩm đã được thêm vào giỏ hàng!");
  };

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
          <button
            onClick={handleAddToCart}
            className={`w-fit h-[72px] p-3.5 rounded-[50px] text-4xl font-normal transition-colors
                 ${
                   added
                     ? "bg-[#F0C072] text-[#452F0B] "
                     : "bg-[#5B3B0E] hover:bg-[#A8792B] text-[#D9CEBC] "
                 } 
                 `}
          >
            {added ? "Đã thêm vào giỏ hàng" : "Thêm vào giỏ hàng"}
          </button>
          <button
            onClick={handlePay}
            className="w-[225px] h-[72px] rounded-[50px] text-4xl font-normal
              text-[#D9CEBC] bg-[#5B3B0E] hover:bg-[#A8792B]"
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Page), { ssr: false });
