const url = {
    auth: {
        login:'auth/login',
        forgotPassword: 'auth/forgot-password'
    },
    User: {
        get: 'users',
        post: 'users',
        put: 'users',
        getById: 'users',
        delete: 'users',
        getSelect: 'users/get-select',
    },
    Bank: {
        get: 'banks',
        post: 'banks',
        put: 'banks',
        getById: 'banks',
        delete: 'banks',
        getSelect: 'banks/get-select',
    },
    Customer: {
        get: 'customers',
        post: 'customers',
        put: 'customers',
        getById: 'customers',
        delete: 'customers',
        getSelect: 'customers/get-select',
    },
    Mosque: {
        get: 'mosques',
        post: 'mosques',
        put: 'mosques',
        getById: 'mosques',
        delete: 'mosques',
        getSelect: 'mosques/get-select',
    },
    Donation: {
        get: 'donations',
        post: 'donations',
        put: 'donations',
        getById: 'donations',
        delete: 'donations',
        image: 'donations/images',
        getSelect: 'donations/get-select',
    },
    DonationCategory: {
        get: 'donation-categories',
        post: 'donation-categories',
        put: 'donation-categories',
        getById: 'donation-categories',
        delete: 'donation-categories',
        getSelect: 'donation-categories/get-select',
    },
    Article: {
        get: 'articles',
        post: 'articles',
        put: 'articles',
        getById: 'articles',
        delete: 'articles',
        image: 'articles/images',
        getSelect: 'articles/get-select',
    },
    ArticleCategory: {
        get: 'article-categories',
        post: 'article-categories',
        put: 'article-categories',
        getById: 'article-categories',
        delete: 'article-categories',
        getSelect: 'article-categories/get-select',
    },
    Dashboard: {
        mosque: 'mosque'
    },
    DonationReport: {
        get: 'donation-reports'
    }
};

export default url