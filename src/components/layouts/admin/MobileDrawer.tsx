// src/components/MobileDrawer.tsx
import React, { useEffect, useRef } from "react";

interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay Background */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40 lg:hidden transition-opacity duration-300" // Warna overlay disesuaikan
          aria-hidden="true"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer Content */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 h-full w-64 shadow-xl z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:hidden`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        {/* Child (Sidebar) akan memiliki background putih sendiri */}
        {children}
      </div>
    </>
  );
};
