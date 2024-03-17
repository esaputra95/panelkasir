import AuthLayout from "../components/layouts/AuthLayout";
import ForgotPassword from "../pages/auth/ForgotPassword";
import LoginPage from "../pages/auth/LoginPage";

const AuthRouters = [
    {
        path: "/",
        element: <AuthLayout />,
        children: [
			{
				path: "/login",
				element: <LoginPage />
			},
			{
				path: "/forgot-password",
				element: <ForgotPassword />
			},
        ],
    },
]

export default AuthRouters;