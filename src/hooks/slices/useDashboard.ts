import { useQuery } from "@tanstack/react-query"
import { getData } from "../models/globalModel"
import url from "../../services/url"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

type GetDataType = {
    storeId?: string;
}

const useDashboard = () => {
    const user = useSelector((state:RootState)=> state.userReducer)
    const {data} = useQuery({
        queryKey: ['get-dashboard-sales', user.storeId],
        queryFn: async () => {
            const response = await getData<GetDataType>(url.Dashboard.sales, {storeId: user.storeId});
            return response.data
        }
    });
    const {data:dataMargin} = useQuery({
        queryKey: ['get-dashboard-margin', user.storeId],
        queryFn: async () => {
            const response = await getData<GetDataType>(url.Dashboard.margins, {storeId: user.storeId});
            return response.data
        }
    });
    
    return{
        data,
        dataMargin
    }
}

export default useDashboard