import { useEffect, useState } from "react"
import { getData } from "../models/dashboardModel"
import url from "../../services/url"
import {
    RecordMateriDashboardInterface,
    StudentWillFinishInterface,
    StudyGroupDashboardInterface
} from "../../interfaces/dashboard/DashboardInterface"
import { ModalFormState } from "../../utils/modalFormState"
import { RegistrationInterface } from "../../interfaces/registers/registrationInterface"
import { StudentInterface } from "../../interfaces/master/studentInterface"

const useDashboard = () => {
    const [ recordMateri, setRecordMateri ] = useState<RecordMateriDashboardInterface[]>()
    const [ studyGroup, setStudyGroup ] = useState<StudyGroupDashboardInterface[]>()
    const [ studyModule, setStudyModule ] = useState<RegistrationInterface[]>()
    const [ studySchedule, setStudySchedule ] = useState<StudentInterface[]>()
    const [ studentWillFinish, setStudentWillFinish ] = useState<StudentWillFinishInterface[]>()
    const [ isLoadingTotal, setIsLoadingTotal ] = useState(false)
    const [ total, setTotal ] = useState({
        recordMateri:0,
        studyGroup:0,
        studyModule:0,
        studySchedule:0,
        studentWillFinish:0
    })
    const { modalForm:modalFormRecordMateri, setModalForm:setModalFormRecordMateri} = ModalFormState()
    const { modalForm:modalFormStudyGroup, setModalForm:setModalFormStudyGroup} = ModalFormState()
    const { modalForm:modalFormStudyModule, setModalForm:setModalFormStudyModule} = ModalFormState()
    const { modalForm:modalFormStudySchedule, setModalForm:setModalFormStudySchedule} = ModalFormState()
    const { modalForm:modalFormStudentWillFinish, setModalForm:setModalFormStudentWillFinish} = ModalFormState()
    const { Dashboard } = url

    useEffect(()=> {
        getTotal();
    }, [])

    const getTotal = async () => {
        setIsLoadingTotal(true)
        const responseTotal = await getData(Dashboard.total);
        if(responseTotal.status){
            setTotal(responseTotal.data)
        }
        setIsLoadingTotal(false)
    }

    const getDataRecordMateri = async () => {
        const data = await getData(Dashboard.recordMateri);
        if(data.status){
            setRecordMateri(data?.data?.listStudent ?? [])
            setModalFormRecordMateri(state=>({
                ...state,
                visible: true
            }))
        }
    };

    const getStudyGroup = async () => {
        const data = await getData(Dashboard.studyGroup)
        if(data.status){
            setStudyGroup(data.data);
            setModalFormStudyGroup(state=>({
                ...state,
                visible: true
            }))
        }
    }

    const getStudySchedule = async () => {
        const data = await getData(Dashboard.studySchedule)
        if(data.status){
            setStudySchedule(data.data);
            setModalFormStudySchedule(state=>({
                ...state,
                visible: true
            }))
        }
    }

    const getStudyModule = async () => {
        const data = await getData(Dashboard.studyModule)
        if(data.status){
            setStudyModule(data.data);
            setModalFormStudyModule(state=>({
                ...state,
                visible: true
            }))
        }
    }

    const getStudyFinish = async () => {
        const data = await getData(Dashboard.studyFinish)
        if(data.status){
            setStudentWillFinish(data.data);
            setModalFormStudentWillFinish(state=>({
                ...state,
                visible: true
            }))
        }
    }

    return {
        recordMateri,
        studyGroup,
        studyModule,
        setModalFormStudyGroup,
        modalFormStudyGroup,
        modalFormRecordMateri,
        setModalFormRecordMateri,
        modalFormStudyModule,
        setModalFormStudyModule,
        isLoadingTotal,
        total,
        getDataRecordMateri,
        getStudyGroup,
        getStudyModule,
        getStudySchedule,
        studySchedule,
        modalFormStudySchedule,
        setModalFormStudySchedule,
        getStudyFinish,
        studentWillFinish,
        modalFormStudentWillFinish,
        setModalFormStudentWillFinish
    }
}

export default useDashboard