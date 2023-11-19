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