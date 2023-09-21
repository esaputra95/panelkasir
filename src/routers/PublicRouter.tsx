import PublicLayout from "../layouts/PublicLayout";
import HomePage from "../pages/dashboard/HomePage";

const PublicRouters = [
    {
        path: '/',
        element: <PublicLayout />,
        children: [
            {
                path: '/dashboard',
                element: <HomePage />
            }
        ]
    }
];

export default PublicRouters;