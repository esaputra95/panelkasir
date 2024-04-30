import PublicLayout from "../components/layouts/PublicLayout";
import NotFoundPage from "../pages/NotFoundPage";

const PublicRouters = [
    {
        path: '/',
        element: <PublicLayout />,
        children: [
            {
                path: '*', 
                element: <NotFoundPage />
            },
        ]
    }
];

export default PublicRouters;