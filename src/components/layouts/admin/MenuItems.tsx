const MasterMenu = [
    {
        label: 'rewards',
        path: 'rewards',
        active: false,
        access: ['admin', 'superadmin']
    },
    {
        label: 'agen-types',
        path: 'agen-types',
        active: false,
        access: ['admin', 'superadmin']
    },
    {
        label: 'members',
        path: 'members',
        active: false,
        access: ['admin', 'superadmin', 'stockist']
    },
    {
        label: 'product-categories',
        path: 'product-categories',
        active: false,
        access: ['admin', 'superadmin']
    },
    {
        label: 'products',
        path: 'products',
        active: false,
        access: ['admin', 'superadmin']
    },
    {
        label: 'bank-accounts',
        path: 'bank-accounts',
        active: false,
        access: ['admin', 'superadmin']
    }
];

const SettingMenu = [
    {
        label: 'users',
        path: 'users',
        active: false,
        access: ['admin', 'superadmin']
    },
    {
        label: 'warehouses',
        path: 'warehouses',
        active: false,
        access: ['admin', 'superadmin']
    },
    {
        label: 'settings',
        path: 'settings',
        active: false,
        access: ['admin', 'superadmin']
    },
]

const SalesMenu = [
    {
        label: 'sales',
        path: 'sales',
        active: false,
        access: ['admin', 'agent', 'superadmin']
    },
    {
        label: 'sale-stockists',
        path: 'sale-stockists',
        active: false,
        access: ['admin', 'superadmin']
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
        label: 'sales-report',
        path: 'sales-report',
        active: false,
        access: ['admin', 'agent', 'superadmin']
    },
    {
        label: 'points-report',
        path: 'points-report',
        active: false,
        access: ['admin', 'superadmin']
    },
    {
        label: 'user-points-report',
        path: 'user-points-report',
        active: false,
        access: ['admin', 'superadmin']
    },
    {
        label: 'claim-points-report',
        path: 'claim-points-report',
        active: false,
        access: ['admin', 'superadmin']
    },
    {
        label: 'claim-rewards-report',
        path: 'claim-rewards-report',
        active: false,
        access: ['admin', 'superadmin']
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
