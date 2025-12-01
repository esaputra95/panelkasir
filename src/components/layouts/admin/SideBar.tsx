// src/components/Sidebar.tsx
import React, { useState, useRef, useEffect, useMemo } from "react"; // Hapus useCallback, tidak diperlukan lagi
import { Link, useLocation } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { menuItems, MenuItem } from "./MenuItems"; // Pastikan path ini benar
import AsyncSelect from 'react-select/async';
import useStore from "../../../hooks/slices/masters/useStore";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setUserSlice } from "../../../redux/userSlice";
import { SingleValue } from "react-select";
import { OptionSelectInterface } from "../../../interfaces/globalInterface";
import UserAvatar from "./UserAvatar";
import { t } from "i18next";

// --- Komponen SidebarMenuItem ---
interface SidebarMenuItemProps {
  item: MenuItem;
  onCloseDrawer: () => void;
  currentUserRole: string;
  depth?: number;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  item,
  onCloseDrawer,
  currentUserRole,
  depth = 0,
}) => {
  const location = useLocation();
  const hasChildren = item.children && item.children.length > 0;

  const isActive = location.pathname === item.path;

  const isChildActive = hasChildren
    ? item?.children?.some((child) => location.pathname.startsWith(child.path))
    : false;

  const [isOpen, setIsOpen] = useState(hasChildren && isChildActive);
  const contentRef = useRef<HTMLUListElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Efek untuk mengukur contentHeight saat isOpen berubah
  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setContentHeight(isOpen ? contentRef.current.scrollHeight : 0);
      }
    };
    updateHeight();

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [isOpen]);

  const handleToggle = (e: React.MouseEvent) => {
    // Penting: Jangan panggil preventDefault() untuk item non-parent
    // karena Link membutuhkan default behavior untuk navigasi
    if (hasChildren) {
      e.preventDefault(); // Hanya preventDefault untuk item parent (button)
      setIsOpen(!isOpen); // Toggle state untuk parent
    } else {
      // Untuk item daun (Link), biarkan navigasi terjadi secara alami
      // dan kemudian tutup drawer (jika ini mobile)
      onCloseDrawer();
    }
  };

  const hasAccess = item.access.includes(currentUserRole);
  if (!hasAccess) {
    return null;
  }

  const baseClasses =
    "flex items-center p-3 rounded-lg transition-colors duration-200 w-full";
  const textColor = "text-gray-700";
  const hoverBg = "hover:bg-blue-50";
  const hoverText = "hover:text-blue-700";
  const activeBg = "bg-purple-100 text-purple-700 font-semibold";

  const currentItemIsActive = isActive || (hasChildren && isChildActive);

  const itemClasses = `${baseClasses} ${textColor} ${hoverBg} ${hoverText} ${
    currentItemIsActive ? activeBg : ""
  }`;

  const indentation = depth * 16;

  // Render konten menu item (ikon + label)
  const menuItemContent = (
    <div className="flex items-center">
      {item.icon && <item.icon className="h-5 w-5 mr-3 text-gray-500" />}
      <span>{t(item.label)}</span>
    </div>
  );

  return (
    <li>
      {hasChildren ? (
        // Jika memiliki children, render sebagai button
        <button
          onClick={handleToggle} // onClick ada di sini
          className={`${itemClasses} justify-between`} // justify-between untuk panah
          style={{ paddingLeft: `${12 + indentation}px` }}
          aria-expanded={isOpen}
          aria-controls={`submenu-${item.label.replace(/\s+/g, "-")}`}
        >
          {menuItemContent}
          {isOpen ? (
            <FaChevronUp className="h-4 w-4 text-gray-400 transition-transform duration-300" />
          ) : (
            <FaChevronDown className="h-4 w-4 text-gray-400 transition-transform duration-300" />
          )}
        </button>
      ) : (
        // Jika tidak memiliki children, render sebagai Link
        <Link
          to={item.path}
          onClick={handleToggle} // onClick juga ada di sini untuk item Link
          className={itemClasses}
          style={{ paddingLeft: `${12 + indentation}px` }}
          aria-current={currentItemIsActive ? "page" : undefined}
        >
          {menuItemContent}
        </Link>
      )}

      {hasChildren && (
        <div
          style={{ maxHeight: `${contentHeight}px` }}
          className={`overflow-hidden transition-[max-height] duration-300 ease-in-out`}
          id={`submenu-${item.label.replace(/\s+/g, "-")}`}
        >
          <ul ref={contentRef} className="mt-2 space-y-2">
            {item.children?.map((childItem) => (
              <SidebarMenuItem
                key={childItem.path}
                item={childItem}
                onCloseDrawer={onCloseDrawer}
                currentUserRole={currentUserRole}
                depth={depth + 1}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

// --- Komponen Sidebar Utama (tetap sama) ---
interface SidebarProps {
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const {optionStore, dataOptionStore} = useStore()
    const user = useSelector((state:RootState)=> state.userReducer)
    const dispatch = useDispatch()

  const store = useMemo(()=> {
    return user.storeId ? dataOptionStore.filter(val=>val.value === user.storeId)?.[0] ?? dataOptionStore[0] : dataOptionStore[0]
  },[user.storeId, dataOptionStore]);
  
  useEffect(()=>{
    if(store?.value){
      dispatch(setUserSlice({
        storeId: store.value+''
      }))
    }
    
  }, [store])

  const onChangeStore = (value:SingleValue<OptionSelectInterface>) => {
    dispatch(
      setUserSlice({
        storeId: value?.value as string
      })
    )
  }
  
  const currentUserRole =  user?.level as string;

  return (
    <nav className="p-4 flex flex-col h-full overflow-y-auto">
      {/* Profil Pengguna */}
      <div className="flex flex-col mb-4 space-y-4">
        <UserAvatar/>
        <AsyncSelect
          className='w-full'
          cacheOptions
          value={store}
          loadOptions={optionStore}
          onChange={onChangeStore}
          defaultOptions
          placeholder="Pilih Toko"
          ref={(ref)=> ref}
        />
      </div>
      <ul className="space-y-2 flex-grow">
        {menuItems.map((menuItem) => (
          <SidebarMenuItem
            key={menuItem.path}
            item={menuItem}
            onCloseDrawer={onClose}
            currentUserRole={currentUserRole}
            depth={0}
          />
        ))}
      </ul>

      {/* Tombol tutup untuk mobile drawer di bagian bawah */}
      <div className="m-auto pt-4 border-t border-gray-200 lg:hidden">
        By Kasir Q
      </div>
    </nav>
  );
};