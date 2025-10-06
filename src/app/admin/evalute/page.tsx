"use client";

import React, { useEffect, useMemo, useState } from "react";
import HeaderAdmin from "../components/header";
import FormField from "@/app/component/form-field";
import ReviewService from "@/app/api/reviews";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { formatLocalTime } from "../../../../utils/common";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

type Review = {
  _id?: string;
  product_id: string;
  user?: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt?: string;
};

type ReviewForm = {
  product_id: string;
  user: string;
  rating: number | string;
  comment: string;
  images: string[];
};

const ReviewAdminPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  const [reviewForm, setReviewForm] = useState<ReviewForm>({
    product_id: "",
    user: "",
    rating: "",
    comment: "",
    images: [],
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    const ratingNum = Number(reviewForm.rating);
    return (
      !!reviewForm.product_id &&
      !!reviewForm.comment.trim() &&
      ratingNum >= 1 &&
      ratingNum <= 5
    );
  }, [reviewForm]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      // 🔥 Lấy TẤT CẢ review — không cần product_id
      const res: any = await ReviewService.getAll("demo-product-id");
      setReviews(res?.reviews || res || []);
    } catch (err) {
      console.error("Fetch reviews error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async () => {
    if (!canSubmit) {
      alert("Vui lòng điền Product ID, Comment và Rating (1-5).");
      return;
    }

    const payload = {
      product_id: reviewForm.product_id.trim(),
      user: reviewForm.user?.trim() || "Ẩn danh",
      rating: Number(reviewForm.rating),
      comment: reviewForm.comment.trim(),
      images: reviewForm.images || [],
    };

    try {
      if (editingId) {
        await ReviewService.update(editingId, payload);
        setEditingId(null);
      } else {
        await ReviewService.create(payload);
      }
      setReviewForm({
        product_id: "",
        user: "",
        rating: "",
        comment: "",
        images: [],
      });
      await fetchReviews();
    } catch (err) {
      console.error("Submit review error:", err);
    }
  };

  const handleEdit = (r: Review) => {
    setReviewForm({
      product_id: r.product_id,
      user: r.user || "",
      rating: r.rating,
      comment: r.comment,
      images: r.images || [],
    });
    setEditingId(r._id || null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn chắc chắn muốn xóa review này?")) return;
    try {
      await ReviewService.deleted(id);
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete review error:", err);
    }
  };

  const handleImageFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Preview objectURL. Nếu có flow upload server, thay bằng upload thật & nhận URL.
      const urls = Array.from(e.target.files).map((f) =>
        URL.createObjectURL(f)
      );
      setReviewForm((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
    }
  };

  const onFormChange = (name: keyof ReviewForm, value: string | number) => {
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setEditingId(null);
    setReviewForm({
      product_id: "",
      user: "",
      rating: "",
      comment: "",
      images: [],
    });
  };

  return (
    <div className="w-full">
      <HeaderAdmin />
      <div className="px-3 py-4 flex flex-col gap-y-4">
        <div className="py-3 text-lg font-semibold">Quản lý Review</div>

        {/* Form tạo/sửa (giữ bố cục giống trang sản phẩm) */}
        <div className="flex gap-x-2 w-full">
          <div className="flex gap-x-2 w-full">
            {/* <FormField
              value={reviewForm.product_id}
              onChange={(v) => onFormChange("product_id", v)}
              wrapperClass="w-1/4 border rounded-md"
              customClass="bg-white text-black"
              placeholder="Product ID"
            /> */}
            <FormField
              value={reviewForm.user}
              onChange={(v) => onFormChange("user", v)}
              wrapperClass="w-1/4 border rounded-md"
              customClass="bg-white text-black"
              placeholder="Người đánh giá (tùy chọn)"
            />
            <FormField
              value={String(reviewForm.rating)}
              onChange={(v) => onFormChange("rating", v)}
              wrapperClass="w-1/6 border rounded-md"
              customClass="bg-white text-black"
              placeholder="Rating (1-5)"
            />
            <FormField
              value={reviewForm.comment}
              onChange={(v) => onFormChange("comment", v)}
              wrapperClass="w-1/3 border rounded-md"
              customClass="bg-white text-black"
              placeholder="Nội dung đánh giá"
            />
            {/* <label className="w-1/6 border rounded-md text-sm flex items-center justify-center cursor-pointer">
              Thêm ảnh
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageFiles}
              />
            </label> */}
          </div>

          <div className="flex items-start gap-2">
            <button
              className="rounded-full bg-[#A8792B] text-white px-3 whitespace-nowrap disabled:opacity-50"
              onClick={handleSubmit}
              disabled={!canSubmit}
              title={!canSubmit ? "Điền Product ID, Comment và Rating 1-5" : ""}
            >
              {editingId ? "Cập nhật review" : "Tạo review"}
            </button>
            {editingId && (
              <button
                className="rounded-full border px-3 whitespace-nowrap"
                onClick={clearForm}
              >
                Hủy sửa
              </button>
            )}
          </div>
        </div>

        {reviewForm.images.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {reviewForm.images.map((img, i) => (
              <div
                key={i}
                className="relative w-16 h-16 rounded-md overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`img-${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Bảng review */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-left text-sm">
            <thead className="bg-[#5C3B0E] text-white">
              <tr>
                <th className="px-4 py-2 border-b border-gray-300">#</th>
                {/* <th className="px-4 py-2 border-b border-gray-300">
                  Product ID
                </th> */}
                <th className="px-4 py-2 border-b border-gray-300">
                  Người đánh giá
                </th>
                <th className="px-4 py-2 border-b border-gray-300">Rating</th>
                <th className="px-4 py-2 border-b border-gray-300">Comment</th>
                <th className="px-4 py-2 border-b border-gray-300">Images</th>
                <th className="px-4 py-2 border-b border-gray-300">
                  Thời gian
                </th>
                <th className="px-4 py-2 border-b border-gray-300">Tùy chọn</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    Đang tải...
                  </td>
                </tr>
              )}
              {!loading &&
                reviews.map((r, i) => (
                  <tr
                    key={r._id || `${r.product_id}-${i}`}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-2 border-b border-gray-200">
                      {i + 1}
                    </td>

                    <td className="px-4 py-2 border-b border-gray-200">
                      {r.user || "Ẩn danh"}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {r.rating}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 max-w-[360px]">
                      <div className="line-clamp-3">{r.comment}</div>
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      <div className="flex gap-1 flex-wrap">
                        {r.images?.map((img, idx) => (
                          <Image
                            key={idx}
                            src={img}
                            alt={`review-${idx}`}
                            width={40}
                            height={40}
                            className="object-cover rounded-md"
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {r.createdAt ? formatLocalTime(r.createdAt) : ""}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEdit(r)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md text-sm"
                        >
                          Sửa
                        </Button>
                        <Button
                          onClick={() => r._id && handleDelete(r._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                        >
                          Xóa
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              {!loading && reviews.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    Chưa có đánh giá nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReviewAdminPage;
