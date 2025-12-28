import { useState } from "react"

export type modalState = {
    visible: boolean,
    label: string,
    status: string
}

export const ModalFormState = () => {
    const [ModalFormState, setModalFormState] = useState<modalState>({visible: false, label: '', status: ''});
    return {
        modalForm: ModalFormState,
        setModalForm: setModalFormState
    }
}