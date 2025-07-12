// src/layouts/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { 
  FaBars, 
  FaUser, 
  FaCogs, 
  FaSignOutAlt, 
  FaChartBar,
  FaWarehouse,
  FaTruck,
  FaClipboardList,
  FaUsers,
  FaBox,
  FaFileAlt,
  FaShoppingCart,
  FaChevronDown,
  FaChevronRight,
  FaTimes,
  FaUserFriends,
  FaCalendarCheck,
  FaDatabase,
  FaHeadSideVirus,
  FaMap,
  FaMoneyBill,
  FaFileImport,
  FaBoxes,
  FaMoneyCheck,
  FaUserEdit,
  FaCalendarAlt    
} from "react-icons/fa";
import { FaVirusCovidSlash,
        FaMoneyBillTransfer,
        FaVialVirus,
        FaRegNewspaper,
        FaMapLocation 
 } from "react-icons/fa6";
import { GiChicken, GiMeat, GiFactory,GiStrong,GiDamagedHouse,GiBookPile    } from "react-icons/gi";
import { CiSettings } from "react-icons/ci";
import { GoOrganization } from "react-icons/go";
import { MdPointOfSale,MdAccountCircle,MdEngineering,MdAppRegistration   } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { GrCertificate } from "react-icons/gr";
import { RiHomeOfficeFill } from "react-icons/ri";
import { TbEngine } from "react-icons/tb";
import { ImLab } from "react-icons/im";
import { AiFillProduct } from "react-icons/ai";
import { GoGraph } from "react-icons/go";
import { TbReport } from "react-icons/tb";
import useAuth from '../hooks/useAuth';

const menuItems = [
  { 
    label: "Dashboard", 
    icon: <FaChartBar />, 
    path: "/dashboard",
    type: "single"
  },
  {
    label: "ตั้งค่าเริ่มต้น",
    icon: <CiSettings  />,
    type: "dropdown",
    children: [
      { label: "ผู้ใช้งานระบบ", icon: <FaUserFriends />, path: "/farm/manage" },
      { label: "โครงสร้างองค์กร", icon: <GoOrganization />, path: "/farm/health" },
      { label: "ระบบจัดซื้อ", icon: <MdPointOfSale />, path: "/farm/feeding" },
      { label: "ระบบงานขาย", icon: <MdPointOfSale />, path: "/farm/feeding" },
      { label: "ระบบตรวจสอบคุณภาพ", icon: <FaCalendarCheck />, path: "/farm/feeding" },
      { label: "ระบบตรวจวิเคราะห์เชื้อ", icon: <FaVirusCovidSlash />, path: "/farm/feeding" },
      { label: "ระบบจำแนกหมวดหมู่", icon: <BiSolidCategory />, path: "/farm/feeding" },
      { label: "สกุลเงิน", icon: <FaMoneyBillTransfer />, path: "/farm/feeding" },
      { label: "ISO Certification", icon: <GrCertificate />, path: "/farm/feeding" },
    ]
  },
  {
    label: "ข้อมูลหลัก",
    icon: <FaDatabase  />,
    type: "dropdown",
    children: [
      { label: "ลูกค้า", icon: <FaUserFriends />, path: "/farm/manage" },
      { label: "ผู้จำหน่าย", icon: <MdPointOfSale />, path: "/farm/health" },
      { label: "วัตถุดิบ", icon: <GiChicken />, path: "/farm/feeding" },
      { label: "สินค้า", icon: <GiChicken />, path: "/farm/feeding" },
      { label: "เครื่องใช้สำนักงาน", icon: <RiHomeOfficeFill />, path: "/farm/feeding" },
      { label: "เครื่องจักร", icon: <TbEngine />, path: "/farm/feeding" },
    ]
  },
  {
    label: "ระบบตรวจวิเคราะห์เชื้อ",
    icon: <FaVialVirus />,
    type: "dropdown",
    children: [
      { label: "LAB Matrix&Testing", icon: <ImLab />, path: "/factory/production" },
      { label: "ส่งตรวจวิเคราะห์เชื้อ", icon: <FaHeadSideVirus />, path: "/factory/quality" },
      { label: "แผนตรวจวิเคราะห์เชื้อ", icon: <FaMap />, path: "/factory/inventory" },
    ]
  },
  {
    label: "ระบบรับเข้าไก่",
    icon: <GiChicken />,
    type: "dropdown",
    children: [
      { label: "แผนรับเข้าไก่เป็น", icon: <FaMap />, path: "/sales/products" },
    ]
  },
  {
    label: "ระบบจัดซื้อ",
    icon: <FaMoneyBill />,
    type: "dropdown",
    children: [
      { label: "ขอซื้อ(PR)", icon: <MdPointOfSale />, path: "/logistics/delivery" },
      { label: "จัดซื้อ(PO)", icon: <MdPointOfSale />, path: "/logistics/tracking" },
      { label: "แผนจัดซื้อ", icon: <FaMap />, path: "/logistics/tracking" },
    ]
  },
  { 
    label: "ระบบตรวจสอบคุณภาพ", 
    icon: <MdAccountCircle />, 
    path: "/settings",
    type: "dropdown",
    children: [
      { label: "แผนก (PC)", icon: <MdAccountCircle />, path: "/logistics/delivery" },
      { label: "แผนก (QC)", icon: <MdAccountCircle />, path: "/logistics/tracking" },
      { label: "แผนก (EN)", icon: <MdAccountCircle />, path: "/logistics/tracking" },
      { label: "แผนก (HR)", icon: <MdAccountCircle />, path: "/logistics/tracking" },
      { label: "แผนก (SHE)", icon: <MdAccountCircle />, path: "/logistics/tracking" },
      { label: "แผนก (SN)", icon: <MdAccountCircle />, path: "/logistics/tracking" },
      { label: "แผนก (ผลิต)", icon: <MdAccountCircle />, path: "/logistics/tracking" },
    ]
  },
  { 
    label: "ระบบคลังสินค้า", 
    icon: <FaWarehouse />, 
    path: "/settings",
    type: "dropdown",
    children: [
      { label: "ยื่นใบเบิก", icon: <FaRegNewspaper />, path: "/logistics/delivery" },
      { label: "วัตถุดิบ", icon: <GiChicken />, path: "/logistics/tracking" },
      { label: "สินค้า", icon: <GiChicken />, path: "/logistics/tracking" },
      { label: "อื่นๆ", icon: <FaClipboardList />, path: "/logistics/tracking" },
      { label: "WAREHOUSE (วัตถุดิบ)", icon: <FaWarehouse />, path: "/logistics/tracking" },
      { label: "WAREHOUSE (สินค้า)", icon: <FaWarehouse />, path: "/logistics/tracking" },
      { label: "WAREHOUSE (อื่นๆ)", icon: <FaWarehouse />, path: "/logistics/tracking" },
    ]
  },
  { 
    label: "ระบบงานผลิต", 
    icon: <FaCogs />, 
    path: "/settings",
    type: "dropdown",
    children: [
      { label: "ขั้นตอนการผลิต", icon: <FaCogs />, path: "/logistics/delivery" },
      { label: "BOM", icon: <FaFileImport />, path: "/logistics/tracking" },
      { label: "MANPOWER", icon: <GiStrong />, path: "/logistics/tracking" },
      { label: "แผนผลิตไก่ (แปรรูป)", icon: <GiChicken />, path: "/logistics/tracking" },
      { label: "บันทึกไก่เป็น (หน้าลาน)", icon: <GiChicken />, path: "/logistics/tracking" },
      { label: "ฝ่ายผลิต (LINE E)", icon: <FaClipboardList />, path: "/logistics/tracking" },
      { label: "ฝ่ายผลิต (LINE C)", icon: <FaClipboardList />, path: "/logistics/tracking" },
      { label: "ฝ่ายผลิต (LINE SP)", icon: <FaClipboardList />, path: "/logistics/tracking" },
      { label: "PACKING", icon: <FaBoxes />, path: "/logistics/tracking" },
    ]
  },
  { 
    label: "ระบบขนส่งสินค้า", 
    icon: <FaTruck />, 
    path: "/settings",
    type: "dropdown",
    children: [
      { label: "ลงทะเบียนรถขนส่ง", icon: <FaTruck />, path: "/logistics/delivery" },
      { label: "กำหนดพื้นที่จัดส่งสินค้า", icon: <FaMapLocation />, path: "/logistics/tracking" },
      { label: "แผนจัดส่งสินค้า", icon: <FaMapLocation />, path: "/logistics/tracking" },
      { label: "LOADING PRODUCT", icon: <FaBoxes />, path: "/logistics/tracking" },
      { label: "ระบบใบขนส่งสินค้า", icon: <FaRegNewspaper />, path: "/logistics/tracking" },
    ]
  },
  { 
    label: "ระบบงานวิศวกรรม", 
    icon: <MdEngineering  />, 
    path: "/settings",
    type: "dropdown",
    children: [
      { label: "ใบแจ้งซ่อม/สร้าง", icon: <FaRegNewspaper />, path: "/logistics/delivery" },
      { label: "แผนซ่อมบำรุงรักษา", icon: <FaMap />, path: "/logistics/tracking" },
      { label: "การจัดการเหตุขัดข้อง", icon: <MdEngineering />, path: "/logistics/tracking" },
    ]
  },
  { 
    label: "ระบบจัดการทรัพย์สิน", 
    icon: <AiFillProduct  />, 
    path: "/settings",
    type: "dropdown",
    children: [
      { label: "ทะเบียนทรัพย์สิน", icon: <MdAppRegistration  />, path: "/logistics/delivery" },
      { label: "ตรวจนับทรัพย์สิน", icon: <MdAppRegistration  />, path: "/logistics/tracking" },
      { label: "โอนย้ายทรัพย์สิน", icon: <MdAppRegistration  />, path: "/logistics/tracking" },
      { label: "ทรัพย์สินชำรุด", icon: <GiDamagedHouse />, path: "/logistics/tracking" },
      { label: "ทรัพย์สินรอจำหน่าย", icon: <FaTruck />, path: "/logistics/tracking" },
    ]
  },
  { 
    label: "ระบบบัญชีและการเงิน", 
    icon: <FaMoneyCheck />, 
    path: "/settings",
    type: "dropdown",
    children: [
      { label: "ผังบัญชี", icon: <FaMoneyBillTransfer />, path: "/logistics/delivery" },
      { label: "รายการซื้อ-ขาย", icon: <FaMoneyBillTransfer />, path: "/logistics/tracking" },
      { label: "โอนย้ายทรัพย์สิน", icon: <FaMoneyBillTransfer />, path: "/logistics/tracking" },
      { label: "บัญชีรายวัน", icon: <FaClipboardList />, path: "/logistics/tracking" },
      { label: "การเงิน", icon: <FaClipboardList />, path: "/logistics/tracking" },
      { label: "ลูกหนี้การค้า", icon: <FaUserFriends />, path: "/logistics/tracking" },
      { label: "เจ้าหนี้การค้า", icon: <FaUserFriends />, path: "/logistics/tracking" },
      { label: "รายงานทางบัญชี", icon: <FaClipboardList />, path: "/logistics/tracking" },
    ]
  },
  { 
    label: "ทรัพยากรบุคคล", 
    icon: <FaUserEdit  />, 
    path: "/settings",
    type: "dropdown",
    children: [
      { label: "ระบบข้อมูลพนักงาน", icon: <FaUserFriends />, path: "/logistics/delivery" },
      { label: "ระบบวันลา-วันหยุด (TM)", icon: <FaCalendarAlt />, path: "/logistics/tracking" },
      { label: "ระบบประเมินการปฎิบัติงาน (KPI)", icon: <GiBookPile  />, path: "/logistics/tracking" },
      { label: "ระบบเงินเดือนและผลตอบแทน", icon: <GoGraph />, path: "/logistics/tracking" },
      { label: "รับสมัครพนักงาน", icon: <FaUserFriends />, path: "/logistics/tracking" },
    ]
  },
  { 
    label: "ระบบรายงาน", 
    icon: <TbReport />, 
    path: "/settings",
    type: "dropdown",
    children: [
      { label: "ระบบจัดซื้อ", icon: <FaMoneyBill />, path: "/logistics/delivery" },
      { label: "ระบบงานขาย", icon: <MdPointOfSale />, path: "/logistics/tracking" },
      { label: "ระบบคลังวัตถุดิบ", icon: <FaWarehouse />, path: "/logistics/tracking" },
      { label: "ระบบคลังสินค้า", icon: <FaWarehouse />, path: "/logistics/tracking" },
      { label: "ระบบขนส่งสินค้า", icon: <FaTruck />, path: "/logistics/tracking" },
      { label: "ระบบการผลิต", icon: <FaCogs />, path: "/logistics/tracking" },
      { label: "ต้นทุนการผลิต", icon: <FaCogs />, path: "/logistics/tracking" },
      { label: "กำไร-ขาดทุน", icon: <FaMoneyBill />, path: "/logistics/tracking" },
      { label: "KPI", icon: <GiBookPile />, path: "/logistics/tracking" },
    ]
  },
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDropdown = (index) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMenuClick = () => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={toggleMobileMenu}
          className="fixed top-4 left-4 z-50 p-2 bg-slate-800 text-white rounded-lg shadow-lg hover:bg-slate-700 transition-colors md:hidden"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:relative
        ${isMobile ? (mobileMenuOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
        ${collapsed && !isMobile ? "w-16" : "w-64"}
        h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
        text-white transition-all duration-300 ease-in-out z-50
        border-r border-slate-700/50 shadow-2xl
        flex flex-col
      `}>
        
        {/* Header - Fixed */}
        <div className="flex-shrink-0 relative p-4 border-b border-slate-700/50 bg-gradient-to-r from-slate-800 to-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <GiChicken className="w-6 h-6 text-white" />
              </div>
              {(!collapsed || isMobile) && (
                <div className="animate-fade-in">
                  <h1 className="text-lg font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    LPF MEAT
                  </h1>
                  <p className="text-xs text-slate-400">Frozen Co.,Ltd.</p>
                </div>
              )}
            </div>
            
            {!isMobile && (
              <button 
                onClick={() => setCollapsed(!collapsed)}
                className="p-2 rounded-lg hover:bg-slate-700 transition-colors group"
              >
                <FaBars className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            )}
          </div>
        </div>

        {/* User Info - Fixed */}
        {(!collapsed || isMobile) && user && (
          <div className="flex-shrink-0 p-4 border-b border-slate-700/50 animate-fade-in">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <FaUser className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium text-white">{user.username}</p>
                <p className="text-xs text-slate-400">{user.role}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation - Scrollable */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar min-h-0">
          {menuItems.map((item, index) => (
            <div key={index} className="group">
              {item.type === "single" ? (
                <div 
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-700/50 cursor-pointer transition-all duration-200 hover:translate-x-1 hover:shadow-lg"
                  onClick={handleMenuClick}
                >
                  <span className="text-slate-300 group-hover:text-orange-400 transition-colors">
                    {item.icon}
                  </span>
                  {(!collapsed || isMobile) && (
                    <span className="font-medium group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                  )}
                </div>
              ) : (
                <div>
                  <div 
                    className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-700/50 cursor-pointer transition-all duration-200 hover:translate-x-1"
                    onClick={() => toggleDropdown(index)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-slate-300 group-hover:text-orange-400 transition-colors">
                        {item.icon}
                      </span>
                      {(!collapsed || isMobile) && (
                        <span className="font-medium group-hover:text-white transition-colors">
                          {item.label}
                        </span>
                      )}
                    </div>
                    {(!collapsed || isMobile) && (
                      <span className={`text-slate-400 transition-transform duration-200 ${openDropdowns[index] ? 'rotate-180' : ''}`}>
                        <FaChevronDown className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  
                  {openDropdowns[index] && (!collapsed || isMobile) && (
                    <div className="ml-4 mt-2 space-y-1 animate-slide-down">
                      {item.children.map((child, childIndex) => (
                        <div 
                          key={childIndex}
                          className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-slate-700/30 cursor-pointer transition-all duration-200 hover:translate-x-1"
                          onClick={handleMenuClick}
                        >
                          <span className="text-slate-400 hover:text-orange-400 transition-colors text-sm">
                            {child.icon}
                          </span>
                          <span className="text-sm text-slate-300 hover:text-white transition-colors">
                            {child.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Logout Button - Fixed */}
        <div className="flex-shrink-0 p-4 border-t border-slate-700/50">
          <div 
            className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-600/20 hover:border-red-500/50 border border-transparent cursor-pointer transition-all duration-200 hover:translate-x-1 group"
            onClick={logout}
          >
            <FaSignOutAlt className="text-red-400 group-hover:text-red-300 transition-colors" />
            {(!collapsed || isMobile) && (
              <span className="font-medium text-red-400 group-hover:text-red-300 transition-colors">
                ออกจากระบบ
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.2s ease-out;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(148, 163, 184, 0.3) transparent;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.1);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.3);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.5);
        }

        .custom-scrollbar::-webkit-scrollbar-corner {
          background: transparent;
        }
      `}</style>
    </>
  );
}

export default Sidebar;