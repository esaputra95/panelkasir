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
    }
};

export default url