// src/layouts/AdminLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
