import React from "react";
import Navbar from "@/app/component/NavBar";
import Footer from "@/app/component/Footer";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
