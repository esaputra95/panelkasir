import { AxiosError } from "axios";
import { api } from "../../../services"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getData = async (url:string, data:any) => {
    try {
        const response = await api.post(url, {
            data
        });
        return response.data
    } catch (error) {
        throw error as AxiosError
    }
}

export { getData }