"use client";

import BuyProductService from "@/app/api/buy-products";
import useAppContext from "@/hook/use-context";
import React, { useEffect, useState } from "react";

const SHIPPING_FEE = 25000;

const Pay = () => {
  const { auth } = useAppContext();
  const [order, setOrder] = useState<any>(null);
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    note: "",
  });

  console.log(order);
  useEffect(() => {
    const saved = localStorage.getItem("orderData");
    if (saved) {
      setOrder(JSON.parse(saved));
    }
  }, []);

  if (!order)
    return <div className="p-10 text-center">Đang tải đơn hàng...</div>;

  const total = order.totalPrice + SHIPPING_FEE;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await BuyProductService.create({
        name_product: order?.name,
        user_id: auth?._id,
        price: order?.totalPrice,
        id_product: order?.id,
      });
      alert("Đặt hàng thành công");
    } catch (error) {}
  };

  const handlePaymentVNPAY = () => {
    alert("Thanh toán qua VNPay đang được tích hợp...");
  };

  return (
    <div className="flex justify-center gap-16 bg-[#E5D5B5] min-h-screen p-10">
      <div className="bg-[#D9CEBC] p-8 rounded-2xl w-[500px] shadow-md">
        <h2 className="text-2xl font-semibold text-[#452F0B] mb-6">
          Đơn hàng (1 sản phẩm)
        </h2>
        <div className="flex gap-4 mb-6">
          <img
            src={order.image}
            alt={order.name}
            className="w-[120px] h-[120px] object-cover rounded-md"
          />
          <div>
            <p className="font-medium text-[#452F0B] text-lg">{order.name}</p>
            <p className="font-semibold text-[#452F0B] text-xl">
              {order.price}
            </p>
            <p className="mt-2 text-sm">Số lượng: {order.quantity}</p>
          </div>
        </div>

        <div className="flex justify-between mb-2">
          <span>Tạm tính</span>
          <span>{order.totalPrice.toLocaleString("vi-VN")} VND</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Phí vận chuyển</span>
          <span>{SHIPPING_FEE.toLocaleString("vi-VN")} VND</span>
        </div>
        <div className="flex justify-between font-semibold text-lg border-t border-[#5B3B0E] pt-3 mt-3">
          <span>Tổng cộng</span>
          <span>{total.toLocaleString("vi-VN")} VND</span>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-[#5B3B0E] text-[#D9CEBC] py-3 rounded-full text-xl hover:bg-[#A8792B] transition"
        >
          Đặt hàng
        </button>
      </div>

      <div className="bg-[#D9CEBC] p-8 rounded-2xl w-[500px] shadow-md">
        <h2 className="text-2xl font-semibold text-[#452F0B] mb-6">
          Thông tin nhận hàng
        </h2>
        <div className="flex flex-col gap-4">
          <input
            name="name"
            value={auth?.full_name || ""}
            onChange={handleInputChange}
            placeholder="Họ và tên"
            className="p-3 rounded border border-gray-300"
          />
          <input
            name="phone"
            value={info.phone || ""}
            onChange={handleInputChange}
            placeholder="Số điện thoại"
            className="p-3 rounded border border-gray-300"
          />
          <input
            name="email"
            value={auth?.email || ""}
            onChange={handleInputChange}
            placeholder="Email"
            className="p-3 rounded border border-gray-300"
          />
          <input
            name="address"
            value={info.address}
            onChange={handleInputChange}
            placeholder="Địa chỉ nhận hàng"
            className="p-3 rounded border border-gray-300"
          />
          <textarea
            name="note"
            value={info.note}
            onChange={handleInputChange}
            placeholder="Ghi chú"
            className="p-3 rounded border border-gray-300"
          />
        </div>

        <h3 className="text-xl font-semibold text-[#452F0B] mt-8 mb-4">
          Thanh toán
        </h3>
        <div className="flex flex-col gap-3">
          <button
            onClick={handlePaymentVNPAY}
            className="p-3 border border-[#5B3B0E] rounded hover:bg-[#5B3B0E] hover:text-[#D9CEBC] transition"
          >
            Thanh toán qua VNPAY-QR
          </button>
          <button
            onClick={handleSubmit}
            className="p-3 border border-[#5B3B0E] rounded hover:bg-[#5B3B0E] hover:text-[#D9CEBC] transition"
          >
            Thanh toán khi nhận hàng (COD)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pay;
