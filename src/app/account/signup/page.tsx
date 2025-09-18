"use client";
import Image from "next/image";
import cafee from "@/app/image/2f256901cac6991091fe934ee7de3bf4773bf892.jpg";
import Button from "@/app/component/Button";
import Link from "next/link";
import { createRef, useState } from "react";
import AuthServices from "@/app/api/auth";
import FormField from "@/app/component/form-field";
import { isPresence, isValidEmail, notify } from "../../../../utils/common";
import { HiddenIcon, ShowIcon } from "../../../../assets/icons";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const emailRef = createRef<any>();
  const passwordRef = createRef<any>();
  const confirm_passwordRef = createRef<any>();
  const [signUpSuccessfully, setSignUpSuccessfully] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signUp, setSignUp] = useState({
    email: "",
    full_name: "",
    password: "",
    confirm_password: "",
  });

  const isValidForm = () => {
    const { password, confirm_password } = signUp;
    const alert = (message: string) => {
      notify(message, "error");
      return message;
    };
    if (password && password !== confirm_password) {
      return alert("Mật khẩu không khớp");
    }
    if (password.length && password.length < 6) {
      return alert("Mật khẩu phải có ít nhất 6 kí tự");
    }
    return (
      emailRef.current?.validate() ||
      passwordRef.current?.validate() ||
      confirm_passwordRef.current?.validate()
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isValidForm()) {
      try {
        setLoading(true);
        await AuthServices.register(signUp);
        notify("Đăng ký thành công!", "success");
        setSignUpSuccessfully(true);
        alert("Đăng kí tài khoản thành công");
        router.push("/");
      } catch (error) {
        notify("Email đã tồn tại trên hệ thống.", "error");
      }
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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

        <div className="flex flex-col max-w-[540px] h-full w-full bg-[#5B3B0E] p-5">
          <div className="text-center mb-8">
            <div className="text-3xl text-white my-2">Đăng Kí</div>
          </div>

          <div className="w-full">
            {!signUpSuccessfully ? (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <FormField
                  ref={emailRef}
                  value={signUp.email}
                  onChange={(value) =>
                    setSignUp((prev) => ({
                      ...prev,
                      email: value,
                    }))
                  }
                  placeholder="Nhập email của bạn"
                  checkErrors={[
                    (val: string) =>
                      isPresence(val, "Vui lòng nhập tên đăng nhập của bạn"),
                    (val: string) =>
                      isValidEmail(val, "Email không đúng định dạng"),
                  ]}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmit(e);
                  }}
                  autoFocus={true}
                />

                <FormField
                  ref={emailRef}
                  value={signUp.full_name}
                  onChange={(value) =>
                    setSignUp((prev) => ({
                      ...prev,
                      full_name: value,
                    }))
                  }
                  placeholder="Nhập tên của bạn"
                  checkErrors={[
                    (val: string) =>
                      isPresence(val, "Vui lòng nhập tên  của bạn"),
                  ]}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmit(e);
                  }}
                  autoFocus={true}
                />

                <div className="flex flex-col w-full items-end gap-y-2.5">
                  <FormField
                    ref={passwordRef}
                    type={showPassword ? "text" : "password"}
                    value={signUp.password}
                    onChange={(value) =>
                      setSignUp((prev) => ({
                        ...prev,
                        password: value,
                      }))
                    }
                    placeholder="Nhập mật khẩu"
                    rightIcon={
                      signUp.password && (
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSubmit(e);
                    }}
                  />
                </div>
                <div className="flex flex-col w-full items-end gap-y-2.5">
                  <FormField
                    ref={confirm_passwordRef}
                    type={showConfirmPassword ? "text" : "password"}
                    value={signUp.confirm_password}
                    onChange={(value) =>
                      setSignUp((prev) => ({
                        ...prev,
                        confirm_password: value,
                      }))
                    }
                    placeholder="Xác nhận lại mật khẩu "
                    rightIcon={
                      signUp.confirm_password && (
                        <div
                          className="flex items-center justify-center"
                          onClick={toggleShowConfirmPassword}
                        >
                          {showConfirmPassword ? <HiddenIcon /> : <ShowIcon />}
                        </div>
                      )
                    }
                    checkErrors={[
                      (val: string) =>
                        isPresence(val, "Vui lòng nhập mật khẩu của bạn"),
                    ]}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSubmit(e);
                    }}
                  />
                </div>
                <div>
                  <Link href={"/account/login"} className="text-white">
                    Bạn đã có tài khoản? Đăng nhập
                  </Link>
                </div>
                <div className="w-full">
                  <Button
                    className="w-full"
                    name="Đăng Kí"
                    onClick={handleSubmit}
                  />
                </div>
              </form>
            ) : (
              <div className="flex">
                <p className="text-sm font-light text-white"></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
