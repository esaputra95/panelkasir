export interface reduxInterface {
    menu: string
}

export interface ModalConfirmInterface {
    visible?: boolean
    title?: string;
    message?: string;
    onSubmit?: boolean
    onCancel?: boolean
}

export interface UserReduxInterface {
    name?: string;
    username?: string;
    level?: ''|'admin'|'owner'|'superadmin'|'cashier';
    storeId?: string
}