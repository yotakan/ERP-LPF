// src/layouts/Navbar.jsx
import React, { useState, useEffect } from "react";
import { 
  FaBell, 
  FaUser, 
  FaChevronDown, 
  FaSearch, 
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
  FaSun,
  FaMoon,
  FaGlobe
} from "react-icons/fa";
import { GiChicken } from "react-icons/gi";
import useAuth from '../hooks/useAuth';

function Navbar() {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mock notifications
  const notifications = [
    { id: 1, title: "ฟาร์มไก่เนื้อ #1", message: "ตรวจสอบอุณหภูมิ", time: "5 นาทีที่แล้ว", type: "warning" },
    { id: 2, title: "คำสั่งซื้อใหม่", message: "มีคำสั่งซื้อ 3 รายการ", time: "10 นาทีที่แล้ว", type: "info" },
    { id: 3, title: "การผลิต", message: "เสร็จสิ้นแล้ว 85%", time: "15 นาทีที่แล้ว", type: "success" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('th-TH', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('th-TH', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'warning': return '⚠️';
      case 'info': return '📋';
      case 'success': return '✅';
      default: return '📢';
    }
  };

  const getNotificationColor = (type) => {
    switch(type) {
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      case 'info': return 'border-l-blue-500 bg-blue-50';
      case 'success': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left Section - Title & Breadcrumb */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:block">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <GiChicken className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                  <p className="text-xs text-slate-500">ระบบจัดการฟาร์มไก่เนื้อ</p>
                </div>
              </div>
            </div>
            
            {/* Mobile Title */}
            <div className="lg:hidden">
              <h1 className="text-lg font-bold text-slate-800">Dashboard</h1>
            </div>
          </div>

          {/* Center Section - Search (Hidden on mobile) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200"
                placeholder="ค้นหา..."
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Date & Time */}
            <div className="hidden sm:block text-right">
              <div className="text-sm font-medium text-slate-800">
                {formatTime(currentTime)}
              </div>
              <div className="text-xs text-slate-500">
                {formatDate(currentTime)}
              </div>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200 group"
              >
                <FaBell className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 animate-fade-in">
                  <div className="p-4 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800">การแจ้งเตือน</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto custom-scrollbar">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-4 border-l-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors cursor-pointer ${getNotificationColor(notification.type)}`}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-800 truncate">
                              {notification.title}
                            </p>
                            <p className="text-sm text-slate-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-slate-200">
                    <button className="w-full text-sm text-orange-600 hover:text-orange-700 font-medium">
                      ดูทั้งหมด
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-xl hover:bg-slate-100 transition-all duration-200 group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <FaUser className="w-4 h-4 text-white" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-slate-800">
                    {user?.username || 'ผู้ใช้งาน'}
                  </p>
                  <p className="text-xs text-slate-500">
                    {user?.role || 'พนักงาน'}
                  </p>
                </div>
                <FaChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 animate-fade-in">
                  <div className="p-4 border-b border-slate-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <FaUser className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{user?.username}</p>
                        <p className="text-sm text-slate-500">{user?.role}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <button className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-slate-100 rounded-lg transition-colors">
                      <FaUserCircle className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-700">ข้อมูลส่วนตัว</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-slate-100 rounded-lg transition-colors">
                      <FaCog className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-700">การตั้งค่า</span>
                    </button>
                    <button 
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      {isDarkMode ? <FaSun className="w-4 h-4 text-slate-500" /> : <FaMoon className="w-4 h-4 text-slate-500" />}
                      <span className="text-sm text-slate-700">
                        {isDarkMode ? 'โหมดสว่าง' : 'โหมดมืด'}
                      </span>
                    </button>
                  </div>
                  
                  <div className="border-t border-slate-200 p-2">
                    <button
                      onClick={logout}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-red-50 rounded-lg transition-colors group"
                    >
                      <FaSignOutAlt className="w-4 h-4 text-red-500 group-hover:text-red-600" />
                      <span className="text-sm text-red-500 group-hover:text-red-600">ออกจากระบบ</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200"
            placeholder="ค้นหา..."
          />
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showUserMenu || showNotifications) && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.1);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.3);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.5);
        }
      `}</style>
    </header>
  );
}

export default Navbar;