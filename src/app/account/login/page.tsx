"use client";
import Image from "next/image";
import cafee from "@/app/image/2f256901cac6991091fe934ee7de3bf4773bf892.jpg";
import Title from "@/app/component/Title";
import Button from "@/app/component/Button";
import Link from "next/link";
import { createRef, useState } from "react";
import FormField from "@/app/component/form-field";
import { isPresence, isValidEmail, notify } from "../../../../utils/common";
import AuthServices from "@/app/api/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { HiddenIcon, ShowIcon } from "../../../../assets/icons";
import useAppContext from "@/hook/use-context";

const Login = () => {
  const { setAuth } = useAppContext();
  const router = useRouter();
  const usernameRef = createRef<any>();
  const passwordRef = createRef<any>();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const isValidForm = () => {
    return usernameRef.current?.validate() || passwordRef.current?.validate();
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    if (!isValidForm()) {
      AuthServices.login(loginForm)
        .then((data: any) => {
          setAuth(data.user);
          Cookies.set("token_auth", data.token, {
            expires: 1,
          });
          if (data?.user?.role === "USER") {
            router.push("/pages/home");
          } else {
            router.push("/admin");
          }
        })
        .catch((error) => {
          if (error) {
            notify("Tài khoản hoặc mật khẩu chưa chính xác.", "error");
          }
        });
    }
  };

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
            <FormField
              ref={usernameRef}
              label="Email"
              value={loginForm.email}
              onChange={(value) =>
                setLoginForm((prev) => ({
                  ...prev,
                  email: value,
                }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              placeholder="Nhập email"
              checkErrors={[
                (val: string) =>
                  isPresence(val, "Vui lòng nhập tên đăng nhập của bạn"),
                (val: string) =>
                  isValidEmail(val, "Email không đúng định dạng"),
              ]}
              autoFocus={true}
            />
            <FormField
              ref={passwordRef}
              label="Mật khẩu"
              type={showPassword ? "text" : "password"}
              value={loginForm.password}
              onChange={(value) =>
                setLoginForm((prev) => ({
                  ...prev,
                  password: value,
                }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              placeholder="Nhập mật khẩu"
              rightIcon={
                loginForm.password && (
                  <div
                    className="flex items-center justify-center"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <HiddenIcon /> : <ShowIcon />}
                  </div>
                )
              }
              checkErrors={[
                (val: string) =>
                  isPresence(val, "Vui lòng nhập mật khẩu của bạn"),
              ]}
            />
          </div>

          <div className="flex justify-between text-sm text-[#D9CEBC] mb-10">
            <Link href={"/account/forgotpassword"}>Quên mật khẩu</Link>
            <Link href={"/account/signup"}>Đăng Ký</Link>
          </div>

          <Button onClick={handleSubmit} name="Đăng Nhập" />
        </div>
      </div>
    </div>
  );
};

export default Login;
