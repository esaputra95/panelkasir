import PublicLayout from "../components/layouts/PublicLayout";
import MessagePage from "../pages/publics/MessagePage";
import RegisterPage from "../pages/publics/register";

const PublicRouters = [
    {
        path: '/',
        element: <PublicLayout />,
        children: [
            {
                path: '/register',
                element: <RegisterPage />
            },
            {
                path: '/message',
                element: <MessagePage />
            }
        ]
    }
];

export default PublicRouters;