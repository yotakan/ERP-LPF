import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // ✅ แบบใหม่ที่ถูกต้อง

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("❌ Failed to decode token:", err);
      }
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">🎉 Welcome to ERP System</h1>
      {user ? (
        <p className="mt-4 text-gray-600">
          คุณเข้าสู่ระบบในฐานะ: <strong>{user.role}</strong> (<strong>{user.username}</strong>)
        </p>
      ) : (
        <p className="mt-4 text-red-500">⛔ ไม่พบข้อมูลผู้ใช้ (กรุณา Login ใหม่)</p>
      )}
    </div>
  );
};

export default Home;
