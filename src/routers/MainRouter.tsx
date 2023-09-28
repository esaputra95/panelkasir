import AdminLayout from "../components/layouts/admin/AdminLayout";
import HomePage from "../pages/admins/dashboard/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import UserPage from "../pages/admins/users";
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
                path: 'dashboard',
                element: <HomePage />
            },
            {
                path: 'user',
                element: <UserPage />
            },
            {
                path: '*', 
                element: <NotFoundPage />
            }
        ], 
    }
];

export default MainRouters;