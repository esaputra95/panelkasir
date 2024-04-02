import { AxiosError } from "axios";
import { RecordMateriReport } from "../../../interfaces/reports/RecordMateriReportInterface";
import { api } from "../../../services"

const getData = async (url:string, data:RecordMateriReport) => {
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