import AdminLayout from "../components/layouts/admin/AdminLayout";
import HomePage from "../pages/admins/dashboard/HomePage";
import UserPage from "../pages/admins/users";
import Middleware from "./MiddlewareRouter";
import { 
    ClassTypePage,
    ClassMasterPage,
    RoomPage,
    UniversityPage,
    MajorPage,
    CoursePage,
    TutorPage
} from "../pages/admins/masters";
import {
    PackagePage,
    GuidanceTypePage,
    SchoolYearPage,
    SessionPage,
    SettingPage
} from "../pages/admins/settings";
import { RegistrationPage, StudentPage } from "../pages/admins/registers";
import { 
    ClassInformationPage,
    SessionPage as SessionSchedule,
    TentorNotAvailablePage 
} from "../pages/admins/schedules";
import StudyGroupPage from "../pages/admins/schedules/studyGroup";
import { RecordMateriPage } from "../pages/admins/recordMateri";
import { PayrollPage } from "../pages/admins/payroll";
import { PayrollReportPage, RecordMateriReportPage, RegisterReportPage, ScheduleReportPage, StudentReportPage } from "../pages/admins/reports";

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
                path: 'setting/companies',
                element: <SettingPage />
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
                path: 'schedule/tentor-not-available',
                element: <TentorNotAvailablePage />
            },
            {
                path: 'schedule/study-groups',
                element: <StudyGroupPage />
            },
            {
                path: 'schedule/sessions',
                element: <SessionSchedule />
            },
            {
                path: 'schedule/class-information',
                element: <ClassInformationPage />
            },
            {
                path: 'record-materi',
                element: <RecordMateriPage />
            },
            {
                path: 'payroll',
                element: <PayrollPage />
            },
            {
                path: 'students',
                element: <StudentPage />
            },
            {
                path: 'report/payroll-reports',
                element: <PayrollReportPage />
            },
            {
                path: 'report/record-materi-reports',
                element: <RecordMateriReportPage />
            },
            {
                path: 'report/student-reports',
                element: <StudentReportPage />
            },
            {
                path: 'report/schedule-reports',
                element: <ScheduleReportPage />
            },
            {
                path: 'report/register-reports',
                element: <RegisterReportPage />
            },
        ], 
    }
];

export default MainRouters;