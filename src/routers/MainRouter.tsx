import AdminLayout from "../components/layouts/admin/AdminLayout";
import HomePage from "../pages/admins/dashboard/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import UserPage from "../pages/admins/users";
import Middleware from "./MiddlewareRouter";
import { 
    ClassTypePage,
    ClassMasterPage,
    RoomPage,
    UniversityPage,
    MajorPage,
    CoursePage,
    MaterialPage,
    TutorPage
} from "../pages/admins/masters";
import {
    PackagePage,
    GuidanceTypePage,
    SchoolYearPage,
    SessionPage
} from "../pages/admins/settings";
import { RegistrationPage } from "../pages/admins/registers";
import { TentorNotAvailablePage } from "../pages/admins/schedules";

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
                path: 'class-types',
                element: <ClassTypePage />
            },
            {
                path: 'class',
                element: <ClassMasterPage />
            },
            {
                path: 'rooms',
                element: <RoomPage />
            },
            {
                path: 'universities',
                element: <UniversityPage />
            },
            {
                path: 'majors',
                element: <MajorPage />
            },
            {
                path: 'courses',
                element: <CoursePage />
            },
            {
                path: 'materials',
                element: <MaterialPage />
            },
            {
                path: 'setting/guidance-packages',
                element: <PackagePage />
            },
            {
                path: 'setting/guidance-types',
                element: <GuidanceTypePage />
            },
            {
                path: 'setting/school-years',
                element: <SchoolYearPage />
            },
            {
                path: 'setting/sessions',
                element: <SessionPage />
            },
            {
                path: 'registrations',
                element: <RegistrationPage />
            },
            {
                path: 'tutors',
                element: <TutorPage />
            },
            {
                path: 'tentor-not-available',
                element: <TentorNotAvailablePage />
            },
            {
                path: '*', 
                element: <NotFoundPage />
            },
        ], 
    }
];

export default MainRouters;