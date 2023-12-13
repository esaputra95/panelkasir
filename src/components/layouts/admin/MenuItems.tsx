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

export const ReportMaster = [
    {
        label: 'student-master-reports',
        path: 'student-master-reports',
        active: false,
    },
    {
        label: 'tutor-master-reports',
        path: 'tutor-master-reports',
        active: false,
    },
    {
        label: 'register-reports',
        path: 'register-reports',
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
]
