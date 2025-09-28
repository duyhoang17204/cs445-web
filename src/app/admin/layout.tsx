import React from "react";
import Sidebar from "./sidebar";

export default function AdminLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="w-full">{children}</main>
    </div>
  );
}
