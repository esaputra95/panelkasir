import {  useMutation, useQuery } from "@tanstack/react-query"
import {
    deleteData,
    getData,
    getDataById,
    getDataSelect,
    postData
} from "../../models/schedule/studyGroupModel"
import { useEffect, useState } from "react"
import {
    ApiResponseStudyGroup,
    ApiResponseUpdateStudyGroup,
    StudentGroupQueryInterface,
    StudyGroupInputForm
} from "../../../interfaces/schedule/studyGroupInterface"
import { 
    SubmitHandler,
    useFieldArray, 
    useForm
} from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { StudyGroupSchema } from "../../../schema/schedule"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import { StudyGroupDummy } from '../../../utils/dummy/scheduleDummy'
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { OptionSelectInterface } from "../../../interfaces/globalInterface"
import { OptionDummy } from "../../../utils/dummy/setting"
import { useNavigate } from "react-router-dom"
import { SingleValue } from "react-select"

export const useStudyGroup = () => {
    const [ query, setQuery ] = useState<StudentGroupQueryInterface>()
    const [ idDetail, setIdDetail ] = useState<string | null>()
    const [ updateStatus, setUpdateState] = useState<boolean>(false)
    const [ dataOptionStudyGroup, setDataOptionStudyGroup] = useState<OptionSelectInterface[]>([OptionDummy])
    const { StudyGroup } = url
    const { modalForm, setModalForm } = ModalFormState()
    const { t } = useTranslation();
    const modalConfirm = modalConfirmState()
    const page = usePage();
    const navigate = useNavigate()
    
    useEffect(()=> {
        setModalForm((state)=>({
            ...state,
            label: 'Form '
        }))
    }, [])

    const {
        reset,
        register,
        handleSubmit,
        control,
        setValue,
        getValues,

        trigger,
        formState: { errors },
    } = useForm<StudyGroupInputForm>({
        resolver: yupResolver(StudyGroupSchema().schema),
        defaultValues:  StudyGroupDummy
    });

    console.log({errors});
    

    const { fields, append, remove } = useFieldArray({
        control,
        name: "studyGroupDetails"
    });

    useEffect(()=> {
        refetch()
    }, [page.page])
    
    const {data:dataStudyGroup, isFetching, refetch} = 
    useQuery<ApiResponseStudyGroup, AxiosError>({ 
        queryKey: ['study-group'], 
        queryFn: async () => await getData(StudyGroup.get, 
            {
                ...query, 
                page:page.page,
                limit: page.limit
            }
        ),
        onSuccess(data) {
            page.setTotal(Math.ceil((data?.data?.info?.total  ?? 1)/
            (data?.data?.info?.limit ?? page.limit)));
        },
        onError: (errors) => {
            toast.error(errors.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })
    
    const optionStudyGroup = async (data:string) => {
        const response = await getDataSelect(StudyGroup.getSelect, {name: data});
        if(response.status){
            setDataOptionStudyGroup(response.data.studyGroup)
            return response.data.studyGroup
        }
    }

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:string) => getDataById(StudyGroup.getById, id),
        onSuccess:(data:ApiResponseUpdateStudyGroup)=>{
            if(data.status){
                reset(data.data)
                setModalForm((state)=>({
                    ...state,
                    visible: true
                }))
            }
        },
        onError:(error:AxiosError)=> {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:StudyGroupInputForm)=> postData(StudyGroup.post, data),
        onSuccess: async () => {
            setModalForm((state)=>({
                ...state,
                visible: false
            }))
            refetch()
            reset({
                ...StudyGroupDummy
            })
            toast.success(t("success-save"), {
                position: toast.POSITION.TOP_CENTER
            });
            
        },
        onError: async (errors) => {
            const err = errors as AxiosError<DataMessageError>
            let message = `${errors}`
            if(err.response?.status === 400){
                message = await handleMessageErrors(err.response?.data?.errors)
            }
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const {mutate:mutateDelete} = useMutation({
        mutationFn: (id:string) => deleteData(StudyGroup.delete, id),
        onSuccess: () => {
            modalConfirm.setModalConfirm({
                ...modalConfirm.modalConfirm,
                loading: false,
                visible: false
            })
            refetch()
            toast.success(t("success-delete"), {
                position: toast.POSITION.TOP_CENTER
            });
        },
        onError:(error) => {
            modalConfirm.setModalConfirm({
                ...modalConfirm.modalConfirm,
                loading: false,
                visible: false
            })
            const err = error as AxiosError<DataMessageError>
            toast.error(`${err.response?.data?.errors[0].msg}`, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })
    
    const onSubmit: SubmitHandler<StudyGroupInputForm> = (data) => {
        console.log({data});
        
        if(data.studyGroup.total<data.studyGroupDetails.length){
            toast.error('Jumlah siswa melebihi jumlah total kuota', {
                position: toast.POSITION.TOP_CENTER
            })
        }else{
            mutate({
                ...data,
            })
        }
    }

    const onDelete = (id: string) => {
        modalConfirm.setModalConfirm((state)=>({
            ...state,
            title: state.title,
            type: 'danger',
            message: state.message,
            confirmLabel: state.confirmLabel,
            cancelLabel: state.cancelLabel,
            visible: true,
            onConfirm:()=>{
                modalConfirm.setModalConfirm((state)=>({
                    ...state,
                    loading: true
                }))
                mutateDelete(id)
            },
            onCancel:()=>{
                modalConfirm.setModalConfirm((state)=>({
                    ...state,
                    visible: false,
                }))
            }
        }))
    }

    const onUpdate = (id:string) => {
        setUpdateState(true)
        mutateById(id)
    }

    const onCancel = () => {
        setModalForm((state)=>({
            ...state,
            visible: false
        }))
        reset({
            ...StudyGroupDummy
        })
        setIdDetail(null)
    }

    const onDetail = async (id:string) => {
        setIdDetail(id)
        mutateById(id)
    }

    const openSchedule = (id:string) => {
        navigate(`/schedule/sessions?id=${id}`)
    }

    const onChangeStudyGroupDetail = (key: 'studentId', index:number, event: SingleValue<OptionSelectInterface>)=> {
        setValue(`studyGroupDetails.${index}.${key}`, event?.value??'')
        if(key==="studentId"){
            setValue(`studyGroupDetails.${index}.student`, {label: event?.label??'', value:event?.value??''})
        }
    }

    const onChangeStudyGroup = (key: 'classId' | 'guidanceTypeId', event: SingleValue<OptionSelectInterface>)=> {
        setValue(`studyGroup.${key}`, event?.value??'')
        trigger('studyGroup.classId')
        trigger('studyGroup.guidanceTypeId')
    }

    return {
        dataStudyGroup,
        isFetching,
        setQuery,
        onSubmit,
        isLoadingMutate,
        errors,
        reset,
        register,
        setValue,
        getValues,
        fields,
        append,
        handleSubmit,
        modalForm, 
        setModalForm,
        onDelete,
        modalConfirm,
        onUpdate,
        onCancel,
        onDetail,
        idDetail,
        page: page,
        control,
        optionStudyGroup,
        remove,
        updateStatus,
        dataOptionStudyGroup,
        openSchedule,
        onChangeStudyGroup,
        onChangeStudyGroupDetail
    }
}