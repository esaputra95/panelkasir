import { useState } from "react"

export type modalState = {
    visible: boolean,
    label: string
}

export const modalFormState = () => {
    const [modalFormState, setModalFormState] = useState<modalState>({visible: false, label: ''});
    return {
        modalForm: modalFormState,
        setModalForm: setModalFormState
    }
}