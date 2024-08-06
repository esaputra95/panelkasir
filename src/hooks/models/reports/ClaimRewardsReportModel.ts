import { AxiosError } from "axios";
import { ClaimRewardsReport } from "../../../interfaces/reports/ClaimRewardsReportInterface";
import { api } from "../../../services"

const getData = async (url:string, data:ClaimRewardsReport) => {
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