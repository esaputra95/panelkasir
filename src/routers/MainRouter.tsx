import { AdminLayout } from "../components/layouts/admin/AdminLayout";
import Dashboard from "../pages/admins/Dashboard";
import {
  ProductCategoryPage,
  ProductPage,
  MemberPage,
} from "../pages/admins/masters";
import {
  MarginsReport,
  PurchasesReport,
  SalesReport,
  BestSellerReport,
  StockOpnameReport,
  AttendanceReport,
  AccountancyReport,
  AccountBalanceReport,
  TransferReport,
  CashInReport,
  CashOutReport,
  ExpenseReport,
  SubscriptionReport,
} from "../pages/admins/reports";
import { SettingPage, UserPage, WarehousePage, StoreSubscriptionPage } from "../pages/admins/settings";
import PaymentMethodPage from "../pages/admins/settings/paymentMethods";
import SubscriptionStorePage from "../pages/admins/settings/subscriptionStore";
import UserManagementPage from "../pages/admins/settings/userManagements";
import NotificationPage from "../pages/admins/settings/notifications";
import ProfilePage from "../pages/auth/ProfilePage";
import Middleware from "./MiddlewareRouter";

const MainRouters = [
  {
    path: "/",
    element: <Middleware page={<AdminLayout />} />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "masters",
        children: [
          {
            path: "product-categories",
            element: <ProductCategoryPage />,
          },
          {
            path: "products",
            element: <ProductPage />,
          },
          {
            path: "members",
            element: <MemberPage />,
          },
          {
            path: "users",
            element: <UserPage />,
          },
          {
            path: "stores",
            element: <WarehousePage />,
          },
        ],
      },
      {
        path: "subscriptions",
        element: <SubscriptionStorePage />,
      },
      {
        path: "settings",
        children: [
          {
            path: "setting",
            element: <SettingPage />,
          },
          {
            path: "user-managements",
            element: <UserManagementPage />,
          },
          {
            path: "payment-methods",
            element: <PaymentMethodPage />,
          },
          {
            path: "subscription-stores",
            element: <SubscriptionStorePage />,
          },
          {
            path: "notifications",
            element: <NotificationPage />,
          },
          {
            path: "store-subscriptions",
            element: <StoreSubscriptionPage />,
          },
        ],
      },
      {
        path: "reports",
        children: [
          {
            path: "sales-report",
            element: <SalesReport />,
          },
          {
            path: "purchases-report",
            element: <PurchasesReport />,
          },
          {
            path: "margins-report",
            element: <MarginsReport />,
          },
          {
            path: "best-seller-reports",
            element: <BestSellerReport />,
          },
          {
            path: "stock-opname-reports",
            element: <StockOpnameReport />,
          },
          {
            path: "attendance-reports",
            element: <AttendanceReport />,
          },
          {
            path: "accountancy-reports",
            element: <AccountancyReport />,
          },
          {
            path: "account-balances",
            element: <AccountBalanceReport />,
          },
          {
            path: "transfer-reports",
            element: <TransferReport />,
          },
          {
            path: "cash-in-reports",
            element: <CashInReport />,
          },
          {
            path: "cash-out-reports",
            element: <CashOutReport />,
          },
          {
            path: "expense-reports",
            element: <ExpenseReport />,
          },
          {
            path: "subscription-report",
            element: <SubscriptionReport />,
          },
        ],
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
];

export default MainRouters;
