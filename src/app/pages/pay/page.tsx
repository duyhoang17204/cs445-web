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
  useEffect(() => {
    const saved = localStorage.getItem("orderData");
    if (saved) setOrder(JSON.parse(saved));
  }, []);
  if (!order)
    return (
      <div className="p-10 text-center text-[#452F0B]">
        {" "}
        Đang tải đơn hàng...{" "}
      </div>
    );
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
    } catch (error) {
      console.error(error);
    }
  };
  const handlePaymentVNPAY = () => {
    alert("Thanh toán qua VNPay đang được tích hợp...");
  };
  return (
    <div className="bg-[#D9CEBC] min-h-screen flex justify-center items-start py-10 px-6 text-[#452F0B]">
      {" "}
      <div className="flex flex-wrap justify-center gap-20 w-full max-w-6xl">
        {" "}
        {/* Cột trái - Đơn hàng */}{" "}
        <div className="w-[400px]">
          {" "}
          <h2 className="text-lg font-semibold mb-4">
            Đơn hàng (1 sản phẩm)
          </h2>{" "}
          <div className="flex gap-3 mb-4 bg-[#D9D9D9] p-2 rounded-md">
            {" "}
            <img
              src={order.image}
              alt={order.name}
              className="w-[90px] h-[90px] object-cover rounded-md"
            />{" "}
            <div>
              {" "}
              <p className="font-semibold">{order.name}</p>{" "}
              <p className="text-sm mt-1">
                {" "}
                {order.totalPrice.toLocaleString("vi-VN")} VND{" "}
              </p>{" "}
              <p className="text-xs mt-2">Số lượng: {order.quantity}</p>{" "}
            </div>{" "}
          </div>{" "}
          <div className="space-y-1 text-sm">
            {" "}
            <div className="flex justify-between">
              {" "}
              <span>Tạm tính</span>{" "}
              <span>{order.totalPrice.toLocaleString("vi-VN")} VND</span>{" "}
            </div>{" "}
            <div className="flex justify-between">
              {" "}
              <span>Phí vận chuyển</span>{" "}
              <span>{SHIPPING_FEE.toLocaleString("vi-VN")} VND</span>{" "}
            </div>{" "}
            <div className="flex justify-between font-semibold border-t border-[#452F0B]/30 pt-2 mt-2">
              {" "}
              <span>Tổng cộng</span>{" "}
              <span>{total.toLocaleString("vi-VN")} VND</span>{" "}
            </div>{" "}
          </div>{" "}
          <button
            onClick={handleSubmit}
            className="mt-6 max-w-[200px] w-full bg-[#5B3B0E] text-[#D9CEBC] font-semibold py-2 rounded-full hover:bg-[#7B5520] transition"
          >
            {" "}
            Đặt hàng{" "}
          </button>{" "}
        </div>{" "}
        {/* Cột phải - Thông tin nhận hàng */}{" "}
        <div className="w-[420px]">
          {" "}
          <h2 className="text-lg font-semibold mb-4">
            Thông tin nhận hàng
          </h2>{" "}
          <div className="flex flex-col gap-3 mb-6">
            {" "}
            <input
              name="name"
              value={auth?.full_name || info.name}
              onChange={handleInputChange}
              placeholder="Họ và tên"
              className="p-2 rounded border border-[#452F0B]/30 bg-[#D9D9D9] placeholder-[#6a4b22] focus:outline-none focus:border-[#5B3B0E]"
            />{" "}
            <input
              name="phone"
              value={info.phone}
              onChange={handleInputChange}
              placeholder="Số điện thoại"
              className="p-2 rounded border border-[#452F0B]/30 bg-[#D9D9D9] placeholder-[#6a4b22] focus:outline-none focus:border-[#5B3B0E]"
            />{" "}
            <input
              name="email"
              value={auth?.email || info.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="p-2 rounded border border-[#452F0B]/30 bg-[#D9D9D9] placeholder-[#6a4b22] focus:outline-none focus:border-[#5B3B0E]"
            />{" "}
            <input
              name="address"
              value={info.address}
              onChange={handleInputChange}
              placeholder="Địa chỉ nhận hàng"
              className="p-2 rounded border border-[#452F0B]/30 bg-[#D9D9D9] placeholder-[#6a4b22] focus:outline-none focus:border-[#5B3B0E]"
            />{" "}
            <textarea
              name="note"
              value={info.note}
              onChange={handleInputChange}
              placeholder="Ghi chú"
              rows={2}
              className="p-2 rounded border border-[#452F0B]/30 bg-[#D9D9D9] placeholder-[#6a4b22] focus:outline-none focus:border-[#5B3B0E]"
            />{" "}
          </div>{" "}
          <h3 className="text-lg font-semibold mb-3">Thanh toán</h3>{" "}
          <div className="flex flex-col gap-3">
            {" "}
            <button
              onClick={handlePaymentVNPAY}
              className="p-2 border bg-[#D9D9D9] border-[#452F0B]/40 rounded hover:bg-[#5B3B0E] hover:text-[#D9CEBC] transition"
            >
              {" "}
              Thanh toán qua VNPAY-QR{" "}
            </button>{" "}
            <button
              onClick={handleSubmit}
              className="p-2 border bg-[#D9D9D9] border-[#452F0B]/40 rounded hover:bg-[#5B3B0E] hover:text-[#D9CEBC] transition"
            >
              {" "}
              Thanh toán khi nhận hàng (COD){" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default Pay;
