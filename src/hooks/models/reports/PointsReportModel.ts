import { AxiosError } from "axios";
import { PointsReport } from "../../../interfaces/reports/PointsReportInterface";
import { api } from "../../../services"

const getData = async (url:string, data:PointsReport) => {
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