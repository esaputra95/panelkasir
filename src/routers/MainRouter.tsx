import AdminLayout from "../layouts/admin/AdminLayout";
import HomePage from "../pages/dashboard/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import UserPage from "../pages/users";
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