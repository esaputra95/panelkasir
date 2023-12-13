import { AxiosError } from "axios"
import { api } from "../../../services"
import { LoginInterface } from "../../../interfaces/loginInterface"

export const loginModel = async (url:string, data:LoginInterface) => {
    try {
        const response = await api.post(url, data);
        return response.data
    } catch (error) {
        return error as AxiosError
    }
}