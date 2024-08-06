import { AxiosError } from "axios";
import { ClaimPointsReport } from "../../../interfaces/reports/ClaimPointsReportInterface";
import { api } from "../../../services"

const getData = async (url:string, data:ClaimPointsReport) => {
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