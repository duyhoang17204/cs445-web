import Image from "next/image";
import cafee from "@/app/image/2f256901cac6991091fe934ee7de3bf4773bf892.jpg";
import InputRadius from "@/app/component/InputRadius";
import Title from "@/app/component/Title";
import Button from "@/app/component/Button";
import Link from "next/link";

export default function Login() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#D9CEBC] px-4">
      <div className="flex max-w-[852px] w-full h-[482px] shadow-2xl">
        <div className="max-w-[336px] w-full h-full hidden md:block">
          <Image
            src={cafee}
            alt="Photo"
            className="w-full h-full object-cover shadow-lg"
          />
        </div>

        <div className="flex flex-col max-w-[516px] h-full w-full bg-[#5B3B0E] shadow-xl p-8">
          <Title name="Đăng Nhập" />

          <div className="space-y-4 mb-4">
            <InputRadius type="email" placeholder="Nhập email của bạn" />
            <InputRadius type="password" placeholder="Nhập mật khẩu của bạn" />
          </div>

          <div className="flex justify-between text-sm text-[#D9CEBC] mb-10">
            <Link href={"/pages/forgotpassword"}>Quên mật khẩu</Link>
            <Link href={"/pages/signup"}>Đăng Ký</Link>
          </div>

          <Button name="Đăng Nhập" />
        </div>
      </div>
    </div>
  );
}
