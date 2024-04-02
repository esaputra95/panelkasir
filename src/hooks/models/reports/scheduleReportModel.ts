import { AxiosError } from "axios";
import { ScheduleReport } from "../../../interfaces/reports/ScheduleReportInterface";
import { api } from "../../../services"

const getData = async (url:string, data:ScheduleReport) => {
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