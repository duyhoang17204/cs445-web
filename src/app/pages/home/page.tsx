"use client";
import Navbar from "@/app/component/NavBar";
import Footer from "@/app/component/Footer";
import Image from "next/image";
import banner from "@/app/image/banner.png";
import about1 from "@/app/image/about1.png";
import about2 from "@/app/image/about2.png";
import about3 from "@/app/image/about3.png";
import drink1 from "@/app/image/drink1.png";
import drink2 from "@/app/image/drink2.png";
import drink3 from "@/app/image/drink3.png";
import drink4 from "@/app/image/drimk4.png";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleAbout = () => {
    router.push("/pages/about");
  };

  return (
    <div className="bg-[#D9CEBC] text-[#5B3B0E] pb-5">
      <Navbar />

      <div className="w-full h-[480px] relative">
        <Image src={banner} alt="Cafe Banner" fill className="object-cover " />
      </div>

      <div className="bg-[#D9CEBC] py-10 ">
        <div className="flex max-w-6xl mx-auto gap-8 items-start">
          <div className="flex gap-x-12 w-2/3 mr-24">
            <Image
              src={about1}
              alt="Cafe"
              className="rounded-[44px] shadow-md object-cover w-[232px] h-[480px]"
            />
            <Image
              src={about2}
              alt="Cafe"
              className="rounded-[44px] shadow-md object-cover w-[232px] h-[480px]"
            />
            <Image
              src={about3}
              alt="Cafe"
              className="rounded-[44px] shadow-md object-cover w-[232px] h-[480px]"
            />
          </div>

          <div className="w-1/3 py-6">
            <h3 className="text-2xl font-medium mb-2">Về chúng tôi</h3>
            <h2 className="text-5xl font-extrabold mb-3">Tan. Cafe</h2>
            <p className="text-[20px] leading-relaxed mb-4">
              Tan. là một thương hiệu cà phê tại Huế, Việt Nam được sáng lập vào
              năm 2017. Khởi đầu là một quán cà phê nặng không khí hoài cổ,
              tan.original nằm nép mình ở 14 Phạm Hồng Thái. Đây là tan. nguyên
              bản đầu tiên, là khởi đầu kể nên câu chuyện chung trên...
            </p>
            <button
              className="bg-[#5B3B0E] text-[#D9CEBC] text-2xl px-4 py-2 rounded-[50px] hover:opacity-90 transition"
              onClick={() => handleAbout()}
            >
              Đọc tiếp...
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#5B3B0E] text-[#D9CEBC] py-12 px-6  mb-9 md:px-12">
        <div className="max-w-5xl mx-auto ">
          <div className="flex flex-col items-center mb-5">
            <h2 className="text-center text-[45px] font-normal  m-0">Menu</h2>
            <button className="bg-[#D9CEBC] text-[#5B3B0E]  text-2xl px-4 py-2 rounded-[50px] hover:opacity-90 transition">
              See more
            </button>
          </div>

          <div className="flex justify-center gap-12">
            <Image src={drink1} alt="Drink" className="w-[300px] h-[481px]" />
            <Image src={drink2} alt="Drink" className="w-[300px] h-[481px]" />
            <Image src={drink3} alt="Drink" className="w-[300px] h-[481px]" />
            <Image src={drink4} alt="Drink" className="w-[300px] h-[481px]" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
