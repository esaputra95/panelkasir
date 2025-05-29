const MasterMenu = [
    {
        label: 'members',
        path: '/masters/members',
        active: false,
        access: ['admin', 'superadmin', 'owner']
    },
    {
        label: 'product-categories',
        path: '/masters/product-categories',
        active: false,
        access: ['admin', 'superadmin', 'owner']
    },
    {
        label: 'products',
        path: '/masters/products',
        active: false,
        access: ['admin', 'superadmin', 'owner']
    },

    {
        label: 'users',
        path: '/masters/users',
        active: false,
        access: ['admin', 'superadmin', 'owner']
    },
    {
        label: 'stores',
        path: '/masters/stores',
        active: false,
        access: ['admin', 'superadmin', 'owner']
    },
];

const SettingMenu = [
    {
        label: 'user-managements',
        path: '/settings/user-managements',
        active: false,
        access: ['admin', 'superadmin', 'owner']
    },
]

const SalesMenu = [
    {
        label: 'sales',
        path: 'sales',
        active: false,
        access: ['admin', 'agent', 'superadmin', 'owner']
    },
];

const PointMenu = [
    {
        label: 'claim-points',
        path: 'claim-points',
        active: false,
        access: ['admin', 'superadmin']
    },
];

const RewardMenu = [
    {
        label: 'claim-rewards',
        path: 'claim-rewards',
        active: false,
        access: ['admin', 'superadmin']
    },
];

const ReportPurchaseMenu = [
    {
        label: 'purchases-report',
        path: '/reports/purchases-report',
        active: false,
        access: ['admin', 'owner', 'superadmin']
    },
];

const ReportSalesMenu = [
    {
        label: 'sales-report',
        path: '/reports/sales-report',
        active: false,
        access: ['admin', 'owner', 'superadmin']
    },
    {
        label: 'margins',
        path: '/reports/margins-report',
        active: false,
        access: ['admin', 'owner', 'superadmin']
    },
]
const ReportLabaMenu = [
    {
        label: 'margins',
        path: '/reports/margins-report',
        active: false,
        access: ['admin', 'owner', 'superadmin']
    },
]

export {
    MasterMenu,
    SettingMenu,
    SalesMenu,
    ReportPurchaseMenu,
    ReportSalesMenu,
    ReportLabaMenu,
    PointMenu,
    RewardMenu,
}
