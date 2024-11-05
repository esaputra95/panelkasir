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
];

const SettingMenu = [
    {
        label: 'users',
        path: '/settings/users',
        active: false,
        access: ['admin', 'superadmin', 'owner']
    },
    {
        label: 'warehouses',
        path: '/settings/stores',
        active: false,
        access: ['admin', 'superadmin', 'owner']
    },
    // {
    //     label: 'settings',
    //     path: '/settings/setting',
    //     active: false,
    //     access: ['admin', 'superadmin', 'owner']
    // },
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

const ReportMenu = [
    {
        label: 'purchases',
        path: '/reports/purchases-report',
        active: false,
        access: ['admin', 'owner', 'superadmin']
    },
    {
        label: 'sales',
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

export {
    MasterMenu,
    SettingMenu,
    SalesMenu,
    ReportMenu,
    PointMenu,
    RewardMenu
}
