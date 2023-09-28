import { useState } from "react"

type ModalConfirmType = {
    label?: string,
    message?: string,
    visible?: boolean,
    onConfirm?:() => void,
    onCancel?:() => void
}
export const modalConfirmState = () => {
    const [modal, setModal] = useState<ModalConfirmType>({
        message: '',
        label:'',
        visible: false
    })

    return {
        alert,
        setModal,
        modal
    }
}