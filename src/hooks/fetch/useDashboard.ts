import { useEffect, useState } from "react"
import { getRecordMateri } from "../models/dashboardModel"
import url from "../../services/url"
import { RecordMateriDashboardInterface } from "../../interfaces/dashboard/DashboardInterface"

const useDashboard = () => {
    const [ recordMateri, setRecordMateri ] = useState<RecordMateriDashboardInterface[]>()
    const { Dashboard } = url

    useEffect(()=> {
        getDataRecordMateri()
    }, [])

    const getDataRecordMateri = async () => {
        const data = await getRecordMateri(Dashboard.recordMateri);
        if(data.status){
            setRecordMateri(data?.data?.listStudent ?? [])
        }
    }

    return {
        recordMateri
    }
}

export default useDashboard