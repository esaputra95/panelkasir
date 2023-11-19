import { useState } from "react"

export type ModalConfirmType = {
    type?: 'warning' | 'danger' | 'primary',
    title: string,
    message: string,
    visible: boolean,
    loading: boolean;
    confirmLabel: string;
    cancelLabel: string 
    onConfirm?:() => void,
    onCancel?:() => void
}

const dumyDeleteModal:ModalConfirmType = {
    title: "question-confirm",
    message: "delete-message",
    cancelLabel: "cancel",
    confirmLabel: "delete",
    visible: false,
    loading: false,
    type: 'primary'
}

export const modalConfirmState = () => {
    const [modalConfirm, setModalConfirm] = useState<ModalConfirmType>(dumyDeleteModal)

    // const set = (value:ModalConfirmType) => {
    //     setModal((state)=> ({...state, ...value}))
    // }

    return {
        modalConfirm: {
            ...modalConfirm,
        },
        setModalConfirm
    }
}