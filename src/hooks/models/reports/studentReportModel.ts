import { AxiosError } from "axios";
import { StudentReport } from "../../../interfaces/reports/StudentReportInterface";
import { api } from "../../../services"

const getData = async (url:string, data:StudentReport) => {
    try {
        const response = await api.post(url, {
            data
        });
        return response.data
    } catch (error) {
        return error as AxiosError
    }
}

export { getData }