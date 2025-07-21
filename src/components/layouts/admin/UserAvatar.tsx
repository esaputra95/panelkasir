/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface UserMenuProps {
  userName?: string;
}

function UserAvatar({ userName = "Eko" }: UserMenuProps) { 
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [_a, _b, removeCookie] = useCookies(["token"]);
	const navigate = useNavigate()

  // Fungsi untuk menutup menu ketika klik di luar area menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) && // Casting event.target ke Node
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev); // Menggunakan updater function untuk state
  };

  const handleLogout = () => {
    removeCookie("token", { path: "/" })
    navigate("/login");
    }
  
  return (
    <div className="relative w-full">
      {/* Tombol ikon user */}
      <button
        ref={buttonRef}
        onClick={handleToggleMenu}
        className="flex w-full items-center space-x-2 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200"
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : "false"}
        id="user-menu-button" // Tambahkan ID untuk aria-labelledby
      >
        <FaUserCircle className="w-8 h-8 text-gray-700" />
        <span className="font-semibold text-gray-800">{userName}</span>
        <span className="text-gray-500 text-sm ml-2">ID</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50 transform origin-top-right animate-fade-in-up"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button" // Menghubungkan menu dengan tombol
        >
          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
            role="menuitem"
          >
            <FaSignOutAlt className="mr-2" /> Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default UserAvatar;