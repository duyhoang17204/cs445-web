"use client";
import { useState } from "react";
import Image from "next/image";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

export default function Cart({ onClose }: { onClose: () => void }) {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 1,
      name: "Áo T-Shirt: EST 2017",
      price: 290000,
      image: "/images/orange.png",
      quantity: 1,
    },
    {
      id: 2,
      name: "Denim s2",
      price: 290000,
      image: "/images/orange.png",
      quantity: 1,
    },
    {
      id: 3,
      name: "Denim s2",
      price: 290000,
      image: "/images/orange.png",
      quantity: 1,
    },
    {
      id: 4,
      name: "Denim s2",
      price: 290000,
      image: "/images/orange.png",
      quantity: 1,
    },
  ]);

  const updateQuantity = (id: number, type: "increase" | "decrease") => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className=" w-[400px] h-[500px] overflow-y-auto bg-[#9d6b2a] text-white shadow-lg z-50 flex flex-col">
      <div className="flex justify-between items-center border-b border-white p-4">
        <h2 className="text-xl font-bold">GIỎ HÀNG CỦA BẠN</h2>
        <button onClick={onClose} className="text-2xl">
          ×
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex bg-[#fdf5e6] text-black rounded-md"
          >
            {item.image && (
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className="object-cover"
              />
            )}
            <div className="flex-1 p-3">
              <div className="flex justify-between items-center">
                <p className="font-semibold">{item.name}</p>
                <button onClick={() => removeItem(item.id)}>×</button>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="bg-[#f3c26f] text-black px-3 py-1 rounded-full text-sm font-medium">
                  {item.price.toLocaleString("vi-VN")} VNĐ
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, "decrease")}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, "increase")}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white p-4">
        <p className="text-right font-semibold mb-2">
          Tổng tiền tạm tính: {total.toLocaleString("vi-VN")} VNĐ
        </p>
        <button className="w-full bg-[#f3c26f] text-black py-2 rounded-md font-semibold">
          Thanh toán
        </button>
      </div>
    </div>
  );
}
