// src/data/menu.ts

import {
  FaUsers,
  FaBox,
  FaTags,
  FaUser,
  FaStore,
  FaUserCog,
  FaCreditCard,
  FaCrown,
  FaFileAlt,
  FaChartLine,
  FaDollarSign,
  FaQuestionCircle,
  FaDatabase,
  FaCog,
  FaTachometerAlt, // Report
} from "react-icons/fa";

// Definisi Tipe untuk Item Menu
export interface MenuItem {
  label: string;
  path: string;
  // active?: boolean; // Tidak perlu karena active state akan ditentukan oleh router
  access: string[];
  icon?: React.ElementType; // Opsional jika ingin ikon di data
  children?: MenuItem[]; // Untuk sub-menu
}

// Tambahkan ikon ke data menu
const MasterMenu: MenuItem[] = [
  {
    label: "members",
    path: "/masters/members",
    icon: FaUsers,
    access: ["admin", "superadmin", "owner"],
  },
  {
    label: "product-categories",
    path: "/masters/product-categories",
    icon: FaTags,
    access: ["admin", "superadmin", "owner"],
  },
  {
    label: "products",
    path: "/masters/products",
    icon: FaBox,
    access: ["admin", "superadmin", "owner"],
    },
    {
    label: "users",
    path: "/masters/users",
    icon: FaUser,
    access: ["admin", "superadmin", "owner"],
    },
    {
    label: "stores",
    path: "/masters/stores",
    icon: FaStore,
    access: ["admin", "superadmin", "owner"],
    },
];

const SettingMenu: MenuItem[] = [
    {
    label: "user-managements",
    path: "/settings/user-managements",
    icon: FaUserCog,
    access: ["superadmin"],
  },
  {
    label: "payment-methods",
    path: "/settings/payment-methods",
    icon: FaCreditCard,
    access: ["superadmin", "admin", "owner"],
  },
  {
    label: "subscription-stores",
    path: "/settings/subscription-stores",
    icon: FaCrown,
    access: ["superadmin"],
  },
];

const ReportPurchaseMenu: MenuItem[] = [
  {
    label: "purchases-report",
    path: "/reports/purchases-report",
    icon: FaFileAlt,
    access: ["admin", "owner", "superadmin"],
  },
];

const ReportSalesMenu: MenuItem[] = [
  {
    label: "sales-report",
    path: "/reports/sales-report",
    icon: FaChartLine,
    access: ["admin", "owner", "superadmin"],
  },
];

const ReportLabaMenu: MenuItem[] = [
  {
    label: "margins",
    path: "/reports/margins-report",
    icon: FaDollarSign,
    access: ["admin", "owner", "superadmin"],
  },
];

// Struktur Menu Utama untuk Sidebar
export const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: FaTachometerAlt,
    access: ["admin", "superadmin", "owner", "agent"],
  },
  {
    label: "Master Data",
    path: "/masters", // Path parent untuk membuka sub-menu
    icon: FaDatabase,
    access: ["admin", "superadmin", "owner"],
    children: MasterMenu,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: FaCog,
    access: ["superadmin", "admin", "owner"],
    children: SettingMenu,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: FaFileAlt,
    access: ["admin", "owner", "superadmin"],
    children: [...ReportPurchaseMenu, ...ReportSalesMenu, ...ReportLabaMenu],
  },
  {
    label: "Help & Support",
    path: "/help-support",
    icon: FaQuestionCircle,
    access: ["admin", "superadmin", "owner", "agent"],
  },
];
