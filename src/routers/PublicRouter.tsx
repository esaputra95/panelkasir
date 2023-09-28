import PublicLayout from "../components/layouts/PublicLayout";
import RegisterStudents from "../pages/publics/RegisterStudents";

const PublicRouters = [
    {
        path: '/',
        element: <PublicLayout />,
        children: [
            {
                path: '/register',
                element: <RegisterStudents />
            }
        ]
    }
];

export default PublicRouters;