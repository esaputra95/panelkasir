import { AxiosError } from "axios"
import { api } from "../../../services"
import { ForgotPasswordInterface } from "../../../interfaces/loginInterface"

export const forgotPasswordModel = async (url:string, data:ForgotPasswordInterface) => {
    try {
        const response = await api.post(url, data);
        return response.data
    } catch (error) {
        throw error as AxiosError
    }
}