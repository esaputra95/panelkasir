import AdminLayout from "../components/layouts/admin/AdminLayout";
import { ArticleCategoryPage, ArticlePage } from "../pages/admins/articles";
import HomePage from "../pages/admins/dashboard/HomePage";
import { DonationCategoryPage, DonationPage } from "../pages/admins/donations";
import { 
    BankPage,
    CustomerPage,
    MosquePage
} from "../pages/admins/masters";
import { DonationReport } from "../pages/admins/reports";
import { UserPage } from "../pages/admins/settings";
import Middleware from "./MiddlewareRouter";

const MainRouters = [
    {
        path: '/',
        element: <Middleware page={<AdminLayout />} />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'users',
                element: <UserPage />
            },
            {
                path: 'dashboard',
                element: <HomePage />
            },
            {
                path: 'banks',
                element: <BankPage />
            },
            {
                path: 'customers',
                element: <CustomerPage />
            },
            {
                path: 'mosques',
                element: <MosquePage />
            },
            {
                path: 'donations',
                element: <DonationPage />
            },
            {
                path: 'donation-categories',
                element: <DonationCategoryPage />
            },
            {
                path: 'articles',
                element: <ArticlePage />
            },
            {
                path: 'article-categories',
                element: <ArticleCategoryPage />
            },
            {
                path: 'donation-reports',
                element: <DonationReport />
            },
        ], 
    }
];

export default MainRouters;