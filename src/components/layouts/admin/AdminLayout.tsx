// src/components/Layout.tsx
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Sidebar } from "./SideBar";
import { MobileDrawer } from "./MobileDrawer";
import { Outlet} from "react-router-dom";

export const AdminLayout = () => {
  // Terima children
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      {/* Header Utama */}
      <header className="bg-white text-gray-800 p-4 flex items-center justify-between shadow-md relative z-10 lg:pl-68">
        <div className="flex items-center">
          {/* Logo aplikasi di desktop */}
          <div className="hidden lg:flex items-center text-xl font-bold mr-8">
            KASIR Q
          </div>

          {/* Tombol Menu Mobile (hanya terlihat di mobile) */}
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
          >
            <FaBars className="h-6 w-6 text-gray-700" />
          </button>
          <div className="flex lg:hidden items-center text-xl font-bold mr-8">
            KASIR Q
          </div>
        </div>

        {/* Tombol-tombol di kanan header (desktop) */}
        <div className="hidden lg:flex items-center space-x-4 text-sm">
          <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
            <span className="text-xl">🔔</span>
          </button>
          <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
            <span className="text-xl">⚙️</span>
          </button>
        </div>
      </header>

      {/* Konten Utama (Main Section) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:block w-80 bg-white shadow-lg text-gray-800 flex-shrink-0 overflow-y-auto">
          <Sidebar onClose={() => {}} />
        </aside>

        {/* Area Konten Utama yang Bisa di-scroll */}
        <main className="flex-1 overflow-y-auto p-2 bg-gray-100 lg:p-4">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer (Overlay Sidebar) */}
      <MobileDrawer isOpen={isMobileMenuOpen} onClose={toggleMobileMenu}>
        {/* Sidebar di dalam Drawer, background putih */}
        <div className="w-64 bg-white h-full text-gray-800 overflow-y-auto shadow-xl">
          <Sidebar onClose={toggleMobileMenu} />
        </div>
      </MobileDrawer>
    </div>
  );
};
