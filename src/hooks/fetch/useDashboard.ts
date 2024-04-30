import { useEffect, useState } from "react"
import { ModalFormState } from "../../utils/modalFormState"

const useDashboard = () => {
    const [isLoadingTotal, setIsLoadingTotal] = useState(true)
    const { modalForm:modalFormRecordMateri, setModalForm:setModalFormRecordMateri} = ModalFormState()
    const { modalForm:modalFormStudyGroup, setModalForm:setModalFormStudyGroup} = ModalFormState()
    const { modalForm:modalFormStudyModule, setModalForm:setModalFormStudyModule} = ModalFormState()
    const { modalForm:modalFormStudySchedule, setModalForm:setModalFormStudySchedule} = ModalFormState()
    const { modalForm:modalFormStudentWillFinish, setModalForm:setModalFormStudentWillFinish} = ModalFormState()
    // const { Dashboard } = url

    useEffect(()=> {
        setIsLoadingTotal(false)
    }, []);

    return {
        isLoadingTotal,
        setModalFormStudyGroup,
        modalFormStudyGroup,
        modalFormRecordMateri,
        setModalFormRecordMateri,
        modalFormStudyModule,
        setModalFormStudyModule,
        modalFormStudySchedule,
        setModalFormStudySchedule,
        modalFormStudentWillFinish,
        setModalFormStudentWillFinish,
    }
}

export default useDashboard