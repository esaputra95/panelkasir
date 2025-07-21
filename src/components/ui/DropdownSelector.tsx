import { useEffect, useRef, useState, type ReactNode } from "react";
import { HiDotsVertical } from "react-icons/hi";

interface DropdownAksiProps {
  children: ReactNode;
  align?: "left" | "right";
}

export const DropdownSelector: React.FC<DropdownAksiProps> = ({
  children,
  align = "right",
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-1 text-gray-500 hover:bg-gray-200 rounded-full"
      >
        <HiDotsVertical className="w-5 h-5" />
      </button>

      {open && (
        <div
          className={`absolute z-50 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-md text-sm ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
};
