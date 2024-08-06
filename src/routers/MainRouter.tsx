import AdminLayout from "../components/layouts/admin/AdminLayout";
import {
    AgenTypePage,
    BankAccountPage,
    DashboardPage,
    ProductCategoryPage,
    ProductPage,
    RewardPage,
    MemberPage
} from "../pages/admins/masters";
import { ClaimPointPage } from "../pages/admins/points";
import {
    ClaimPointsReportPage,
    ClaimRewardsReportPage,
    PointsReportPage,
    SalesReport,
    UserPointsReportPage
} from "../pages/admins/reports";
import { ClaimRewardPage } from "../pages/admins/rewards";
import {
    SalePage,
    FormSalePage,
    InvoicePage,
    SaleStockistPage,
    FormSaleStockist,
    InvoiceSaleStockist
} from "../pages/admins/sales";
import { SettingPage, UserPage, WarehousePage } from "../pages/admins/settings";
import Middleware from "./MiddlewareRouter";

const MainRouters = [
    {
        path: '/',
        element: <Middleware page={<AdminLayout />} />,
        children: [
            {
                index: true,
                element: <DashboardPage />
            },
            {
                path: 'dashboard',
                element: <DashboardPage />
            },
            {
                path: 'rewards',
                element: <RewardPage />
            },
            {
                path: 'agen-types',
                element: <AgenTypePage />
            },
            {
                path: 'users',
                element: <UserPage />
            },
            {
                path: 'product-categories',
                element: <ProductCategoryPage />
            },
            {
                path: 'products',
                element: <ProductPage />
            },
            {
                path: 'bank-accounts',
                element: <BankAccountPage />
            },
            {
                path: 'members',
                element: <MemberPage />
            },
            {
                path: 'warehouses',
                element: <WarehousePage />
            },
            {
                path: 'sales',
                element: <SalePage />
            },
            {
                path: 'sales/create',
                element: <FormSalePage />
            },
            {
                path: 'sales/create/:id',
                element: <FormSalePage />
            },
            {
                path: 'sales/invoice/:id',
                element: <InvoicePage />
            },
            {
                path: 'sale-stockists',
                element: <SaleStockistPage />
            },
            {
                path: 'sale-stockists/create',
                element: <FormSaleStockist />
            },
            {
                path: 'sale-stockists/create/:id',
                element: <FormSaleStockist />
            },
            {
                path: 'sales/invoice/:id',
                element: <InvoiceSaleStockist />
            },
            {
                path: 'sales-report',
                element: <SalesReport />
            },
            {
                path: 'points-report',
                element: <PointsReportPage />
            },
            {
                path: 'user-points-report',
                element: <UserPointsReportPage />
            },
            {
                path: 'claim-points-report',
                element: <ClaimPointsReportPage />
            },
            {
                path: 'claim-rewards-report',
                element: <ClaimRewardsReportPage />
            },
            {
                path: 'settings',
                element: <SettingPage />
            },
            {
                path: 'claim-points',
                element: <ClaimPointPage />
            },
            {
                path: 'claim-rewards',
                element: <ClaimRewardPage />
            },
        ], 
    }
];

export default MainRouters;