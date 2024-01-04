export const MasterMenu = [
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
    },
    // {
    //     label: 'materials',
    //     path: 'materials',
    //     active: false,
    // },
];

export const ReportPayroll = [
    {
        label: 'payroll-reports',
        path: 'report/payroll-reports',
        active: false,
    },
    {
        label: 'record-materi-reports',
        path: 'report/record-materi-reports',
        active: false,
    },
    {
        label: 'student-reports',
        path: 'report/student-reports',
        active: false,
    },
]

export const ScheduleMenu = [
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

export const SettingMenu = [
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
    }
];

export const RecordMateri = [
    {
        label: 'record-materi',
        path: 'record-materi',
        active: false,
        access: ['admin', 'tentor']
    },
];

export const Payroll = [
    {
        label: 'payroll',
        path: 'payroll',
        active: false,
        access: ['admin', 'tentor']
    }
]

export const Register = [
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
