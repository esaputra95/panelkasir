import { AxiosError } from "axios";
import { RegisterReport } from "../../../interfaces/reports/RegisterReportInterface";
import { api } from "../../../services"

const getData = async (url:string, data:RegisterReport) => {
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