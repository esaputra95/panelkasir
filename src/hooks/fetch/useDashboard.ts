import { useEffect, useState } from "react"
import { getData } from "../models/dashboardModel"
import url from "../../services/url"
import { RecordMateriDashboardInterface, StudyGroupDashboardInterface } from "../../interfaces/dashboard/DashboardInterface"

const useDashboard = () => {
    const [ recordMateri, setRecordMateri ] = useState<RecordMateriDashboardInterface[]>()
    const [ studyGroup, setStudyGroup ] = useState<StudyGroupDashboardInterface[]>()
    const { Dashboard } = url

    useEffect(()=> {
        getDataRecordMateri()
        getStudyGroup()
    }, [])

    const getDataRecordMateri = async () => {
        const data = await getData(Dashboard.recordMateri);
        if(data.status){
            setRecordMateri(data?.data?.listStudent ?? [])
        }
    };

    const getStudyGroup = async () => {
        const data = await getData(Dashboard.studyGroup)
        if(data.status){
            setStudyGroup(data.data)
        }
    }

    return {
        recordMateri,
        studyGroup
    }
}

export default useDashboard