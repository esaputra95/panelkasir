import { useState } from "react"

type AlertType = {
    message?: string,
    visible?: boolean
}
export const alertState = () => {
    const [alert, setAlert] = useState<AlertType>()

    const onAlert = (message:string, visible:boolean) => {
        setAlert({
            ...alert, 
            message: message,
            visible: visible
        })
    }

    return {
        alert,
        onAlert
    }
}