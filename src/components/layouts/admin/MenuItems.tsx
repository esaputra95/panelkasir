// src/data/menu.ts

import {
  FaUsers,
  FaBox,
  FaTags,
  FaUser,
  FaStore,
  FaUserCog,
  FaCreditCard,
  // FaCrown,
  FaFileAlt,
  FaChartLine,
  FaDollarSign,
  // FaQuestionCircle,
  FaDatabase,
  FaCog,
  FaTachometerAlt,
  FaBell, // Report
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
];

const CustomerManagementMenu: MenuItem[] = [
    {
    label: "stores",
    path: "/masters/stores",
    icon: FaStore,
    access: ["admin", "superadmin", "owner"],
    },
    {
    label: "user-managements",
    path: "/settings/user-managements",
    icon: FaUserCog,
    access: ["superadmin"],
  },
  {
    label: "store-subscriptions",
    path: "/settings/store-subscriptions",
    icon: FaCreditCard,
    access: ["superadmin"],
  },
  {
    label: "notifications",
    path: "/settings/notifications",
    icon: FaBell,
    access: ["superadmin", "admin"],
  },
];

const SettingMenu: MenuItem[] = [
  {
    label: "payment-methods",
    path: "/settings/payment-methods",
    icon: FaCreditCard,
    access: ["superadmin", "admin", "owner"],
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

// const SubscriptionMenu: MenuItem[] = [
//   {
//     label: "subscriptions",
//     path: "/subscriptions",
//     icon: FaDollarSign,
//     access: ["admin", "owner", "superadmin"],
//   },
// ];

const ReportLabaMenu: MenuItem[] = [
  {
    label: "margins",
    path: "/reports/margins-report",
    icon: FaDollarSign,
    access: ["admin", "owner", "superadmin"],
  },
];

const ReportBestSellerMenu: MenuItem[] = [
    {
        label: "best-seller-reports",
        path: "/reports/best-seller-reports",
        icon: FaChartLine,
        access: ["admin", "owner", "superadmin"],
    },
];

const ReportStockOpnameMenu: MenuItem[] = [
    {
        label: "stock-opname-reports",
        path: "/reports/stock-opname-reports",
        icon: FaBox,
        access: ["admin", "owner", "superadmin"],
    },
];

const ReportAttendanceMenu: MenuItem[] = [
    {
        label: "attendance-reports",
        path: "/reports/attendance-reports",
        icon: FaUsers,
        access: ["admin", "owner", "superadmin"],
    },
];

const ReportFinanceMenu: MenuItem[] = [
    {
        label: "accountancy-reports",
        path: "/reports/accountancy-reports",
        icon: FaFileAlt,
        access: ["admin", "owner", "superadmin"],
    },
    {
        label: "account-balances",
        path: "/reports/account-balances",
        icon: FaDollarSign,
        access: ["admin", "owner", "superadmin"],
    },
    {
        label: "transfer-reports",
        path: "/reports/transfer-reports",
        icon: FaCreditCard,
        access: ["admin", "owner", "superadmin"],
    },
    {
        label: "cash-in-reports",
        path: "/reports/cash-in-reports",
        icon: FaDollarSign,
        access: ["admin", "owner", "superadmin"],
    },
    {
        label: "cash-out-reports",
        path: "/reports/cash-out-reports",
        icon: FaDollarSign,
        access: ["admin", "owner", "superadmin"],
    },
    {
        label: "expense-reports",
        path: "/reports/expense-reports",
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
    label: "customer-management",
    path: "/customer-management",
    icon: FaUserCog,
    access: ["admin", "superadmin", "owner"],
    children: CustomerManagementMenu,
  },
  {
    label: "general-reports",
    path: "/reports",
    icon: FaFileAlt,
    access: ["admin", "owner", "superadmin"],
    children: [
        ...ReportPurchaseMenu, 
        ...ReportSalesMenu, 
        ...ReportLabaMenu,
        ...ReportBestSellerMenu,
        ...ReportStockOpnameMenu,
        ...ReportAttendanceMenu,
    ],
  },
  {
    label: 'finance-reports',
    path: '/reports/finance-reports',
    icon: FaFileAlt,
    access: ['admin', 'owner', 'superadmin'],
    children: ReportFinanceMenu,
  },
  {
    label: 'customer-reports',
    path: '/reports',
    icon: FaUsers,
    access: ['admin', 'owner', 'superadmin'],
    children: [
      {
        label: 'subscription-report',
        path: '/reports/subscription-report',
        icon: FaFileAlt,
        access: ['admin', 'owner', 'superadmin'],
      },
    ],
  },
  {
    label: "Settings",
    path: "/settings",
    icon: FaCog,
    access: ["superadmin", "admin", "owner"],
    children: SettingMenu,
  },
  // {
  //   label: "Help & Support",
  //   path: "/help-support",
  //   icon: FaQuestionCircle,
  //   access: ["admin", "superadmin", "owner", "agent"],
  // },
];
