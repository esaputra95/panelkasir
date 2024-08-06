import { AxiosError } from "axios";
import { SalesReport } from "../../../interfaces/reports/SalesReportInterface";
import { api } from "../../../services"

const getData = async (url:string, data:SalesReport) => {
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