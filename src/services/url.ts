const url = {
    auth: {
        login:'auth/login'
    },
    users: 'users',
    classType: {
        get: 'class-types',
        post: 'class-types',
        put: 'class-types',
        getById: 'class-types',
        delete: 'class-types',
        getSelect: 'class-types/select',
    },
    ClassMaster: {
        get: 'class-masters',
        post: 'class-masters',
        put: 'class-masters',
        getById: 'class-masters',
        delete: 'class-masters',
        getSelect: 'class-masters/select',
    },
    Room: {
        get: 'rooms',
        post: 'rooms',
        put: 'rooms',
        getById: 'rooms',
        delete: 'rooms',
        getSelect: 'rooms/select',
    },
    University: {
        get: 'universities',
        post: 'universities',
        put: 'universities',
        getById: 'universities',
        delete: 'universities',
        getSelect: 'universities/select'
    },
    Major: {
        get: 'majors',
        post: 'majors',
        put: 'majors',
        getById: 'majors',
        delete: 'majors',
        getSelect: 'majors/select'
    },
    Course: {
        get: 'courses',
        post: 'courses',
        put: 'courses',
        getById: 'courses',
        delete: 'courses',
        getSelect: 'courses/select'
    },
    Material: {
        get: 'materials',
        post: 'materials',
        put: 'materials',
        getById: 'materials',
        delete: 'materials',
        getSelect: 'materials/select'
    },
    Register: {
        get: 'registers',
        post: 'registers',
        put: 'registers',
        getById: 'registers',
        delete: 'registers',
        getSelect: 'registers/select'
    },
    Package: {
        get: 'packages',
        post: 'packages',
        put: 'packages',
        getById: 'packages',
        delete: 'packages',
        getSelect: 'packages/select'
    },
    GuidanceType: {
        get: 'guidance-types',
        post: 'guidance-types',
        put: 'guidance-types',
        getById: 'guidance-types',
        delete: 'guidance-types',
        getSelect: 'guidance-types/select'
    },
    SchoolYear: {
        get: 'school-years',
        post: 'school-years',
        put: 'school-years',
        getById: 'school-years',
        delete: 'school-years',
        getSelect: 'school-years/select'
    },
    Session: {
        get: 'sessions',
        post: 'sessions',
        put: 'sessions',
        getById: 'sessions',
        delete: 'sessions',
        getSelect: 'sessions/select'
    },
    Registration: {
        get: 'registers',
        post: 'registers',
        put: 'registers',
        getById: 'registers',
        delete: 'registers',
        getSelect: 'registers/select'
    },
    Tutor: {
        get: 'tutors',
        post: 'tutors',
        put: 'tutors',
        getById: 'tutors',
        delete: 'tutors',
        getSelect: 'tutors/select'
    },
    TentorNotAvailable: {
        get: 'schedule/tentor-not-available',
        post: 'schedule/tentor-not-available',
        put: 'schedule/tentor-not-available',
        getById: 'schedule/tentor-not-available',
        delete: 'schedule/tentor-not-available',
        getSelect: 'schedule/tentor-not-available/select'
    },
    StudyGroup: {
        get: 'schedule/study-groups',
        post: 'schedule/study-groups',
        put: 'schedule/study-groups',
        getById: 'schedule/study-groups',
        delete: 'schedule/study-groups',
        getSelect: 'schedule/study-groups/select'
    },
    RecordMateri: {
        get: 'record-materi',
        post: 'record-materi',
        put: 'record-materi',
        getById: 'record-materi',
        delete: 'record-materi',
        getSelect: 'record-materi/select',
        getStudyGroup: 'record-materi/get-study-group',
        getListStudent: 'record-materi/get-list-student'
    },
    Student: {
        getSelect: 'students/select'
    },
    SessionSchedule: {
        get: 'schedule/schedules',
        post: 'schedule/schedules',
        put: 'schedule/schedules',
        getById: 'schedule/schedules',
        delete: 'schedule/schedules',
        getSelect: 'schedule/schedules/select',
        checkSchedule: 'schedule/schedules/check-schedule',
        cancelSchedule: 'schedule/schedules/cancel-schedule'
    },
    ClassInformation: {
        get: 'schedule/class-information'
    }
};

export default url