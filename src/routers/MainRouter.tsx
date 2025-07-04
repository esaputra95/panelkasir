import AdminLayout from "../components/layouts/admin/AdminLayout";
import Dashboard from "../pages/admins/Dashboard";
import {
    ProductCategoryPage,
    ProductPage,
    MemberPage
} from "../pages/admins/masters";
import {
    MarginsReport,
    PurchasesReport,
    SalesReport,
} from "../pages/admins/reports";
import { SettingPage, UserPage, WarehousePage } from "../pages/admins/settings";
import PaymentMethodPage from "../pages/admins/settings/paymentMethods";
import UserManagementPage from "../pages/admins/settings/userManagements";
import ProfilePage from "../pages/auth/ProfilePage";
import Middleware from "./MiddlewareRouter";

const MainRouters = [
    {
        path: '/',
        element: <Middleware page={<AdminLayout />} />,
        children: [
            {
                path: '',
                element: <Dashboard />
            },
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path:'masters',
                children: [
                    {
                        path: 'product-categories',
                        element: <ProductCategoryPage />
                    },
                    {
                        path: 'products',
                        element: <ProductPage />
                    },
                    {
                        path: 'members',
                        element: <MemberPage />
                    },
                    {
                        path: 'users',
                        element: <UserPage />
                    },
                    {
                        path: 'stores',
                        element: <WarehousePage />
                    },
                ]
            },
            {
                path: 'settings',
                children: [
                    {
                        path: 'setting',
                        element: <SettingPage />
                    },
                    {
                        path: 'user-managements',
                        element: <UserManagementPage />
                    },
                    {
                        path: 'payment-methods',
                        element: <PaymentMethodPage />
                    },
                ]
            },
            {
                path: 'reports',
                children: [
                    {
                        path: 'sales-report',
                        element: <SalesReport />
                    },
                    {
                        path: 'purchases-report',
                        element: <PurchasesReport />
                    },
                    {
                        path: 'margins-report',
                        element: <MarginsReport />
                    },
                ]
            },
            {
                path: 'profile',
                element: <ProfilePage />
            }
        ], 
    }
];

export default MainRouters;