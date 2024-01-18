import { useState } from "react"

export type modalState = {
    visible: boolean,
    label: string
}

export const ModalFormState = () => {
    const [ModalFormState, setModalFormState] = useState<modalState>({visible: false, label: ''});
    return {
        modalForm: ModalFormState,
        setModalForm: setModalFormState
    }
}