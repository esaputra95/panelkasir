import { useState } from "react"

type modalState = {
    visible: boolean,
    label: string
}

export const modalFormState = () => {
    const [modalFormState, setModalFormState] = useState<modalState>({visible: false, label: ''});
    return {
        state: modalFormState,
        setModal: (state:any)=> setModalFormState({...state})
    }
}