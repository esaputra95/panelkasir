import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/auth/LoginPage";

const AuthRouters = [
    {
        path: "/",
        element: <AuthLayout />,
        children: [
			{
				path: "/login",
				element: <LoginPage />
			}
        ],
    },
]

export default AuthRouters;