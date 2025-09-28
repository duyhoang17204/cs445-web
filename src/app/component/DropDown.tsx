"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import userIcon from "@/app/image/usericon.png";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import useAppContext from "@/hook/use-context";

const UserDropdown = () => {
  const { auth } = useAppContext();
  const token = Cookies.get("token_auth");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = () => {
    Cookies.remove("token_auth");
    router.push("/");
  };

  console.log(auth);

  return (
    <div className="relative" ref={dropdownRef}>
      {token ? (
        <div
          className="cursor-pointer truncate max-w-[200px]"
          onClick={() => setOpen(!open)}
        >
          {auth?.full_name}
        </div>
      ) : (
        <Image
          src={userIcon}
          alt="user"
          width={45}
          height={45}
          className="cursor-pointer rounded-full border-2  w-[40px] h-[40px]"
          onClick={() => setOpen(!open)}
        />
      )}

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg p-2 z-50">
          {!token ? (
            <>
              <Link
                href="/account/login"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                href="/account/signup"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/account/profile"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </Link>
              <button
                onClick={handleLogOut}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Đăng xuất
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default UserDropdown;
