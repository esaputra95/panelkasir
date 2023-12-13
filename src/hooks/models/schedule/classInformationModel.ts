import { AxiosError } from "axios";
import { ClassInformationInterface } from "../../../interfaces/schedule/ClassInformationInterface";
import { api } from "../../../services";

const getData = async (url:string, query:ClassInformationInterface) => {
    try {
        const response = await api.get(url, {data: query})
        return response.data
    } catch (error) {
        return error as AxiosError
    }
}

export { getData }