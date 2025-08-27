import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#5B3B0E] text-white py-10 px-6 md:px-16">
      <div className="flex justify-between items-center gap-8 px-20">
        <div>
          <h2 className="font-bold text-2xl mb-4">Tan.</h2>
          <ul className="space-y-1 text-sm">
            <li>14 Phạm Hồng Thái, Huế</li>
            <li>25 Nguyễn Thị Minh Khai, Huế</li>
            <li>86 Đinh Tiên Hoàng, Huế</li>
            <li>10 Nguyễn Thiện Thuật, Đà Nẵng</li>
            <li>tan.lab - 08 Phong Châu, Huế</li>
          </ul>

          <div className="flex items-center gap-4 mt-4">
            <button className="bg-[#C79B4B] text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-[#a67d38]">
              Contact us
            </button>
            <a href="#" className="text-xl hover:text-[#C79B4B]">
              <FaFacebookF />
            </a>
            <a href="#" className="text-xl hover:text-[#C79B4B]">
              <FaInstagram />
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-3">Luôn cập nhật</h2>
          <p className="text-sm mb-4">Về các tin tức, ưu đãi, sản phẩm mới</p>
          <div className="flex ">
            <input
              type="email"
              placeholder="EMAIL...."
              className="px-4 py-2 w-[323px]  h-[45px] bg-[#D9CEBC] text-[#5B3B0E] placeholder-[#5B3B0E] outline-none"
            />
            <button className="bg-[#2B1A0A] flex-shrink-0 w-[142px] h-[45px] text-white px-6 py-2 font-semibold hover:bg-[#3c2613]">
              ĐĂNG KÍ
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
