const MasterMenu = [
    {
        label: 'banks',
        path: 'banks',
        active: false,
        access: ['admin']
    },
    {
        label: 'mosques',
        path: 'mosques',
        active: false,
        access: ['admin']
    },
    {
        label: 'customers',
        path: 'customers',
        active: false,
        access: ['admin']
    },
    
];

const DonationMenu = [
    {
        label: 'donation-categories',
        path: 'donation-categories',
        active: false,
        access: ['admin']
    },
    {
        label: 'donations',
        path: 'donations',
        active: false,
        access: ['admin']
    },
]

const ArticleMenu = [
    {
        label: 'article-categories',
        path: 'article-categories',
        active: false,
        access: ['admin']
    },
    {
        label: 'articles',
        path: 'articles',
        active: false,
        access: ['admin']
    },
]

const SettingMenu = [
    {
        label: 'users',
        path: 'users',
        active: false,
        access: ['admin']
    }
]

const ReportMenu = [
    {
        label: 'donation-reports',
        path: 'donation-reports',
        active: false,
        access: ['admin']
    }
]

export {
    MasterMenu,
    DonationMenu,
    ArticleMenu,
    SettingMenu,
    ReportMenu
}
