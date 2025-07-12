import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, Truck, ArrowRight, CheckCircle, XCircle, X, Sparkles, Shield } from 'lucide-react';
import axios from 'axios';
import config from '../config';
import useAuth from '../hooks/useAuth';

function Login() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    type: '',
    title: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const showModal = (type, title, message) => {
    setModal({ show: true, type, title, message });
  };

  const closeModal = () => {
    setModal({ show: false, type: '', title: '', message: '' });
  };

 const handleSubmit = async () => {
  if (!formData.username || !formData.password) {
    showModal('error', 'ข้อมูลไม่ครบถ้วน', 'กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน');
    return;
  }

  setIsLoading(true);
  try {
    const res = await axios.post(`${config.apiPath}/auth/login`, {
      username: formData.username,
      password: formData.password
    });

    const { token, user } = res.data;
    login(token, user); // ✅ เรียก login() จาก useAuth
    showModal('success', 'เข้าสู่ระบบสำเร็จ!', 'ยินดีต้อนรับสู่ระบบ ERP ปศุสัตว์ครบวงจร');

    setTimeout(() => {
      navigate('/home'); // ✅ ใช้ navigate แทน window.location
    }, 2000);
  } catch (error) {
    console.error('Login error:', error);
    showModal('error', 'เข้าสู่ระบบไม่สำเร็จ', error?.response?.data?.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-cyan-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-indigo-400/15 to-cyan-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-cyan-400/30 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-20 right-20 w-3 h-3 bg-indigo-400/30 rounded-full animate-bounce" style={{ animationDelay: '3.5s' }}></div>
      </div>

      {/* Glass Morphism Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236366f1' fill-opacity='0.05'%3E%3Cpath d='M15 25c5.523 0 10-4.477 10-10S20.523 5 15 5 5 9.477 5 15s4.477 10 10 10zM75 105c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM45 55c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Main Container with Enhanced Glass Effect */}
      <div className="w-full max-w-7xl bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden relative z-10 transform hover:scale-[1.01] transition-all duration-500">
        {/* Subtle Border Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-sm"></div>
        
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-white/50">
          <div className="flex flex-col xl:flex-row min-h-[700px]">
            {/* Left Side - Brand Section with Enhanced Design */}
            <div className="flex-1 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 p-8 lg:p-12 xl:p-16 flex flex-col justify-center items-center relative overflow-hidden text-white">
              {/* Enhanced Background Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-transparent to-purple-500/30"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 via-transparent to-transparent"></div>
              
              {/* Floating Geometric Shapes */}
              <div className="absolute top-20 left-20 w-16 h-16 border-2 border-white/20 rounded-lg rotate-12 animate-pulse"></div>
              <div className="absolute bottom-32 right-16 w-12 h-12 border-2 border-white/15 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-16 w-8 h-8 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>

              <div className="z-10 text-center">
                {/* Enhanced Logo Section */}
                <div className="relative mb-8">
                  <div className="w-28 h-28 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/30 shadow-2xl transform hover:scale-110 transition-all duration-300">
                    <Truck className="w-14 h-14 text-white animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Enhanced Typography */}
                <h1 className="text-4xl lg:text-6xl xl:text-7xl font-black mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent leading-tight">
                  ระบบ ERP
                </h1>
                <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 text-blue-100">
                  ปศุสัตว์ครบวงจร
                </h2>
                <p className="text-blue-100 text-lg lg:text-xl mb-8 font-medium">
                  จากฟาร์มสู่โต๊ะอาหาร • เทคโนโลยีสมัยใหม่
                </p>

                {/* Enhanced Feature Icons */}
                <div className="flex flex-wrap justify-center gap-8 mb-8">
                  {[
                    { icon: '🐔', label: 'ฟาร์มไก่', color: 'from-orange-400 to-red-400' },
                    { icon: '🏭', label: 'โรงงาน', color: 'from-blue-400 to-indigo-400' },
                    { icon: '🏪', label: 'ร้านค้า', color: 'from-green-400 to-emerald-400' }
                  ].map((item, idx) => (
                    <div key={idx} className="text-center group cursor-pointer">
                      <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mb-3 shadow-lg transform group-hover:scale-110 transition-all duration-300 border border-white/30`}>
                        <span className="text-2xl">{item.icon}</span>
                      </div>
                      <p className="text-sm font-medium text-blue-100">{item.label}</p>
                    </div>
                  ))}
                </div>

                {/* Trust Badge */}
                <div className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-blue-100">ปลอดภัย & เชื่อถือได้</span>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form with Enhanced Design */}
            <div className="flex-1 p-8 lg:p-12 xl:p-16 bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-xl flex flex-col justify-center relative">
              {/* Subtle Background Pattern */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E")`
              }}></div>

              <div className="max-w-md mx-auto w-full relative z-10">
                {/* Enhanced Header */}
                <div className="text-center mb-8">
                  <h3 className="text-4xl lg:text-5xl font-black text-gray-800 mb-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    เข้าสู่ระบบ
                  </h3>
                  <p className="text-gray-600 text-lg font-medium">
                    กรุณาใส่ข้อมูลเพื่อเข้าใช้งานระบบ ERP ปศุสัตว์
                  </p>
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Enhanced Form */}
                <div className="space-y-6">
                  {/* Username Field */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                      ชื่อผู้ใช้งาน
                    </label>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                          placeholder="กรอกชื่อผู้ใช้งาน"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                      รหัสผ่าน
                    </label>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-14 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                          placeholder="กรอกรหัสผ่าน"
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)} 
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors p-1 rounded-full hover:bg-blue-50"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Options */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
                  <label className="flex items-center group cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="rememberMe" 
                      checked={formData.rememberMe} 
                      onChange={handleInputChange} 
                      className="mr-3 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 accent-blue-600" 
                    />
                    <span className="text-gray-600 text-sm font-medium group-hover:text-blue-600 transition-colors">
                      จดจำการเข้าสู่ระบบ
                    </span>
                  </label>
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors">
                    ลืมรหัสผ่าน?
                  </button>
                </div>

                {/* Enhanced Submit Button */}
                <button 
                  onClick={handleSubmit} 
                  disabled={isLoading} 
                  className="mt-8 w-full relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none group"
                >
                  {/* Button Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-sm"></div>
                  
                  <div className="relative flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        <span>กำลังเข้าสู่ระบบ...</span>
                      </>
                    ) : (
                      <>
                        <span>เข้าสู่ระบบ</span>
                        <ArrowRight className="ml-3 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </button>

                {/* Enhanced Footer */}
                <div className="text-center mt-8 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200">
                  <p className="text-gray-600 text-sm">
                    ยังไม่มีบัญชี? 
                    <button className="text-blue-600 hover:text-blue-800 font-medium hover:underline ml-1 transition-colors">
                      ติดต่อผู้ดูแลระบบ
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {modal.show && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-xl p-8 rounded-2xl max-w-md w-full border border-white/30 shadow-2xl transform animate-modal-appear">
            {/* Modal Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-sm"></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${modal.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {modal.type === 'success' ? 
                      <CheckCircle className="w-6 h-6 text-green-600" /> : 
                      <XCircle className="w-6 h-6 text-red-600" />
                    }
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{modal.title}</h3>
                </div>
                <button 
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
              
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">{modal.message}</p>
              
              <div className="flex justify-end">
                <button 
                  onClick={closeModal} 
                  className={`px-6 py-3 rounded-xl text-white font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 ${
                    modal.type === 'success' 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' 
                      : 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700'
                  }`}
                >
                  ตกลง
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes modal-appear {
          from { 
            opacity: 0; 
            transform: scale(0.9) translateY(-20px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-modal-appear {
          animation: modal-appear 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Login;