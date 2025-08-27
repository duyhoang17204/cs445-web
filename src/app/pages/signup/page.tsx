import Image from "next/image";
import cafee from "@/app/image/2f256901cac6991091fe934ee7de3bf4773bf892.jpg";
import InputRadius from "@/app/component/InputRadius";
import Title from "@/app/component/Title";
import Button from "@/app/component/Button";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#D9CEBC] px-4">
      <div className="flex max-w-[900px] w-full h-[520px] rounded-2xl overflow-hidden shadow-2xl bg-[#fdfcf9]">
        <div className="max-w-[360px] w-full h-full hidden md:block">
          <Image
            src={cafee}
            alt="Coffee"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col max-w-[540px] h-full w-full bg-[#5B3B0E] p-10">
          <div className="text-center mb-8">
            <Title name="Đăng Kí" />
            <Link href={"/pages/login"}>Bạn đã có tài khoản? Đăng nhập</Link>
          </div>

          <div className="space-y-4 mb-6">
            <InputRadius type="email" placeholder="Nhập email của bạn" />
            <InputRadius type="text" placeholder="Nhập họ tên của bạn" />
            <InputRadius type="password" placeholder="Nhập mật khẩu của bạn" />
            <InputRadius
              type="password"
              placeholder="Xác nhận mật khẩu của bạn"
            />
          </div>

          <Button name="Đăng Kí" />
        </div>
      </div>
    </div>
  );
}
