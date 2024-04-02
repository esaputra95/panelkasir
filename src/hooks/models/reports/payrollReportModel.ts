import { AxiosError } from "axios";
import { PayrollReport } from "../../../interfaces/reports/payrollReportInterface";
import { api } from "../../../services"

const getData = async (url:string, data:PayrollReport) => {
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