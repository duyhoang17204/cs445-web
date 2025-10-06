"use client";

import { useState } from "react";
import { Star, Image as ImageIcon, Send } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ReviewPage() {
  const [filter, setFilter] = useState("Liên quan nhất");
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const filters = ["Liên quan nhất", "Mới nhất", "Cao nhất", "Thấp nhất"];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prev) => [...prev, ...filesArray]);
    }
  };

  const handleSubmit = () => {
    console.log("Đánh giá:", { rating, comment, images });
    setShowForm(false);
    setRating(0);
    setComment("");
    setImages([]);
  };

  return (
    <div className="min-h-screen bg-[#f6f0e6] text-[#5a3b10] flex flex-col items-center py-10">
      {/* Header */}
      <div className="w-full max-w-4xl bg-[#e9dfd0] py-6 rounded-t-2xl text-center">
        <h1 className="text-2xl font-semibold">
          Đánh giá dịch vụ của <span className="font-bold">Tan.</span>
        </h1>
      </div>

      {/* Summary */}
      <div className="w-full max-w-4xl bg-[#fdf6ec] p-6 rounded-b-2xl shadow-sm">
        <div className="text-center flex flex-row justify-between items-center">
          <div>
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <span>{star}</span>
                <div className="flex-1 h-2 rounded-full bg-[#e5ddcf]">
                  <div
                    className={`h-2 rounded-full ${
                      star === 5
                        ? "bg-[#a3722d] w-[80%]"
                        : star === 4
                        ? "bg-[#c2a070] w-[40%]"
                        : star === 3
                        ? "bg-[#d9c7a4] w-[10%]"
                        : star === 2
                        ? "bg-[#d9c7a4] w-[6%]"
                        : "bg-[#d9c7a4] w-[4%]"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className="text-5xl font-bold">4,5</p>
            <div className="flex justify-center my-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < 4 ? "fill-[#a3722d] text-[#a3722d]" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">251 đánh giá</p>
          </div>
        </div>
      </div>

      <Button
        onClick={() => setShowForm(!showForm)}
        className="mt-4 bg-[#a3722d] text-white rounded-full px-5 hover:bg-[#8b6124]"
      >
        {showForm ? "Đóng lại" : "Viết bài đánh giá"}
      </Button>

      {showForm && (
        <div className="w-full max-w-4xl bg-[#fffaf3] mt-6 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Viết đánh giá của bạn</h2>

          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-6 w-6 cursor-pointer transition-all ${
                  (hoverRating || rating) >= star
                    ? "fill-[#a3722d] text-[#a3722d]"
                    : "text-gray-300"
                }`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              />
            ))}
            {rating > 0 && <span className="text-sm ml-2">{rating} sao</span>}
          </div>

          {/* Bình luận */}
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Nhập đánh giá của bạn..."
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#a3722d]"
            rows={4}
          ></textarea>

          {/* Upload ảnh */}
          <div className="flex items-center justify-between mt-3">
            <label className="flex items-center gap-2 text-[#a3722d] cursor-pointer">
              <ImageIcon className="w-5 h-5" />
              <span>Thêm hình ảnh</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            <Button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-[#a3722d] hover:bg-[#8b6124] text-white rounded-full px-4 py-2"
            >
              <Send className="w-4 h-4" /> Gửi đánh giá
            </Button>
          </div>

          {images.length > 0 && (
            <div className="flex gap-3 mt-4 flex-wrap">
              {images.map((src, index) => (
                <div key={index} className="relative w-20 h-20">
                  <Image
                    src={src}
                    alt={`upload-${index}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="w-full max-w-4xl bg-[#fdf6ec] mt-6 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Bài đánh giá</h2>

        <div className="flex gap-3 mb-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm ${
                filter === f
                  ? "bg-[#a3722d] text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-[#f6f0e6] p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#a3722d] rounded-full"></div>
              <div>
                <p className="font-semibold">Tiên Nguyễn</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-[#a3722d] text-[#a3722d]"
                />
              ))}
            </div>
            <p className="text-sm mb-3">
              Túi siêu thơm, sớp tư vấn nhiệt tình hẹ hẹ hẹ
            </p>
            <div className="flex gap-3">
              <div className="relative w-28 h-28">
                <Image
                  src="/bag1.jpg"
                  alt="Bag 1"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="relative w-28 h-28">
                <Image
                  src="/bag2.jpg"
                  alt="Bag 2"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button className="bg-[#a3722d] text-white rounded-full px-6 hover:bg-[#8b6124]">
            Xem tiếp...
          </Button>
        </div>
      </div>
    </div>
  );
}
