import { AxiosError } from "axios";
import { UserPointsReport } from "../../../interfaces/reports/UserPointsReportInterface";
import { api } from "../../../services"

const getData = async (url:string, data:UserPointsReport) => {
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