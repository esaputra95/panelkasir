const url = {
    Dashboard: {
        sales: 'admin/dashboards/sales-year',
        margins: 'admin/dashboards/margins-year'
    },
    Address: {
        province: 'admin/address/province',
        city: 'admin/address/cities',
        district: 'admin/address/districts',
    },
    auth: {
        login:'admin/auth/login',
        forgotPassword: 'admin/auth/forgot-password'
    },
    store: {
        get: 'admin/stores',
        post: 'admin/stores',
        put: 'admin/stores',
        getById: 'admin/stores',
        delete: 'admin/stores',
        select: 'admin/stores/select'
    },
    User: {
        get: 'admin/users',
        post: 'admin/users',
        put: 'admin/users',
        getById: 'admin/users',
        delete: 'admin/users',
        getSelect: 'admin/users/get-select',
        getStockistSelect: 'admin/users/get-stockist-select',
    },
    UserManagement: {
        get: 'admin/user-managements',
        post: 'admin/user-managements',
        put: 'admin/user-managements',
        getById: 'admin/user-managements',
        delete: 'admin/user-managements',
        getSelect: 'admin/user-managements/get-select',
    },
    StoreSubscription: {
        get: 'admin/store-subscriptions',
        post: 'admin/store-subscriptions',
        put: 'admin/store-subscriptions',
        getById: 'admin/store-subscriptions',
        delete: 'admin/store-subscriptions',
        getSelect: 'admin/store-subscriptions/select',
    },
    SubscriptionStore: 'admin/subscription-stores',
    PaymentMethod: {
        get: 'admin/user-managements',
        post: 'admin/user-managements',
        put: 'admin/user-managements',
        getById: 'admin/user-managements',
        delete: 'admin/users',
        getSelect: 'admin/user-managements/get-select',
    },
    BankAccount: {
        get: 'admin/bank-accounts',
        post: 'admin/bank-accounts',
        put: 'admin/bank-accounts',
        getById: 'admin/bank-accounts',
        delete: 'admin/bank-accounts',
        getSelect: 'admin/bank-accounts/select',
    },
    ProductCategory: {
        get: 'admin/product-categories',
        post: 'admin/product-categories',
        put: 'admin/product-categories',
        getById: 'admin/product-categories',
        delete: 'admin/product-categories',
        getSelect: 'admin/product-categories/select',
    },
    Product: {
        get: 'admin/products',
        post: 'admin/products',
        put: 'admin/products',
        getById: 'admin/products',
        delete: 'admin/products',
        getPrice: 'admin/products/price',
        getSelect: 'admin/products/get-select',
    },
    Member: {
        get: 'admin/members',
        post: 'admin/members',
        put: 'admin/members',
        getById: 'admin/members',
        delete: 'admin/members',
        getSelect: 'admin/members/select',
    },
    Subscription: {
        get: 'admin/subscriptions',
        post: 'admin/subscriptions',
        put: 'admin/subscriptions',
        getById: 'admin/subscriptions',
        delete: 'admin/subscriptions',
        getSelect: 'admin/subscriptions/select',
    },
    ClaimPoints: {
        get: 'claim-points',
        post: 'claim-points',
        put: 'claim-points',
        getById: 'claim-points',
        delete: 'claim-points',
        checkPoint: 'claim-points/point',
        getSelect: 'claim-points/select',
        download: 'claim-points/download',
    },
    Sale: {
        get: 'sales',
        post: 'sales',
        put: 'sales',
        getById: 'sales',
        delete: 'sales',
        getSelect: 'sales/select',
    },
    ReportSales: {
        report: 'admin/reports/sales-report',
        excel: 'admin/reports/sales-report/excel',
        download: 'admin/reports/sales-report/download',
    },
    ReportPurchases: {
        report: 'admin/reports/purchases-report',
        excel: 'admin/reports/purchases-report/excel',
        download: 'admin/reports/purchases-report/download',
    },
    ReportMargins: {
        report: 'admin/reports/margins-report',
        excel: 'admin/reports/margins-report/excel',
        download: 'admin/reports/margins-report/download',
    },
    setting: {
        get:'setting'
    },
    Notification: {
        get: 'admin/notifications',
        post: 'admin/notifications',
        put: 'admin/notifications',
        getById: 'admin/notifications',
        delete: 'admin/notifications',
        getUsers: 'admin/notifications/users',
    },
    ReportBestSeller: {
        report: 'admin/reports/best-seller-report',
        excel: 'admin/reports/best-seller-report/excel',
        download: 'admin/reports/best-seller-report/download',
    },
    ReportStockOpname: {
        report: 'admin/reports/stock-opname-report',
        excel: 'admin/reports/stock-opname-report/excel',
        download: 'admin/reports/stock-opname-report/download',
    },
    ReportAttendance: {
        report: 'admin/reports/attendance-report',
        excel: 'admin/reports/attendance-report/excel',
        download: 'admin/reports/attendance-report/download',
    },
    ReportAccountancy: {
        report: 'admin/reports/accountancy-report',
        excel: 'admin/reports/accountancy-report/excel',
        download: 'admin/reports/accountancy-report/download',
    },
    ReportAccountBalance: {
        report: 'admin/reports/account-balance-report',
        excel: 'admin/reports/account-balance-report/excel',
        download: 'admin/reports/account-balance-report/download',
    },
    ReportTransfer: {
        report: 'admin/reports/transfer-report',
        excel: 'admin/reports/transfer-report/excel',
        download: 'admin/reports/transfer-report/download',
    },
    ReportCashIn: {
        report: 'admin/reports/cash-in-report',
        excel: 'admin/reports/cash-in-report/excel',
        download: 'admin/reports/cash-in-report/download',
    },
    ReportCashOut: {
        report: 'admin/reports/cash-out-report',
        excel: 'admin/reports/cash-out-report/excel',
        download: 'admin/reports/cash-out-report/download',
    },
    ReportExpense: {
        report: 'admin/reports/expense-report',
        excel: 'admin/reports/expense-report/excel',
        download: 'admin/reports/expense-report/download',
    }
};

export default url