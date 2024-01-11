const MasterMenu = [
    {
        label: 'tutors',
        path: 'tutors',
        active: false,
    },
    {
        label: 'class-types',
        path: 'class-types',
        active: false,
    },
    {
        label: 'class',
        path: 'class',
        active: false,
    },
    {
        label: 'rooms',
        path: 'rooms',
        active: false,
    },
    {
        label: 'universities',
        path: 'universities',
        active: false,
    },
    {
        label: 'majors',
        path: 'majors',
        active: false,
    },
    {
        label: 'courses',
        path: 'courses',
        active: false,
    }
];

const ReportPayroll = [
    {
        label: 'payroll-reports',
        path: 'report/payroll-reports',
        active: false,
        access: ['admin']
    },
    {
        label: 'record-materi-reports',
        path: 'report/record-materi-reports',
        active: false,
        access: ['admin']
    },
    {
        label: 'student-reports',
        path: 'report/student-reports',
        active: false,
        access: ['admin']
    },
    {
        label: 'schedule-reports',
        path: 'report/schedule-reports',
        active: false,
        access: ['admin']
    },
    {
        label: 'register-reports',
        path: 'report/register-reports',
        active: false,
        access: ['admin']
    },
]

const ScheduleMenu = [
    {
        label: 'tentor-not-available',
        path: 'schedule/tentor-not-available',
        active: false,
        access: ['admin', 'tentor']
    },
    {
        label: 'study-groups',
        path: 'schedule/study-groups',
        active: false,
        access: ['admin']
    },
    {
        label: 'class-information',
        path: 'schedule/class-information',
        active: false,
        access: ['admin', 'tentor']
    }
]

const SettingMenu = [
    {
        label: 'guidance-types',
        path: 'setting/guidance-types',
        active: false
    },
    {
        label: 'guidance-packages',
        path: 'setting/guidance-packages',
        active: false
    },
    {
        label: 'school-years',
        path: 'setting/school-years',
        active: false
    },
    {
        label: 'sessions',
        path: 'setting/sessions',
        active: false
    },
    {
        label: 'companies',
        path: 'setting/companies',
        active: false
    }
];

const RecordMateri = [
    {
        label: 'record-materi',
        path: 'record-materi',
        active: false,
        access: ['admin', 'tentor']
    },
];

const Payroll = [
    {
        label: 'payroll',
        path: 'payroll',
        active: false,
        access: ['admin', 'tentor']
    }
]

const Register = [
    {
        label: 'students',
        path: 'students',
        active: false,
        access: ['admin']
    },
    {
        label: 'registrations',
        path: 'registrations',
        active: false,
        access: ['admin']
    }
]

export {
    Register,
    Payroll,
    RecordMateri,
    MasterMenu,
    SettingMenu,
    ReportPayroll,
    ScheduleMenu
}
