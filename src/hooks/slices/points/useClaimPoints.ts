import {  useMutation, useQuery } from "@tanstack/react-query"
import {
    deleteData,
    getClaimPoints,
    getData,
    getDataSelect,
    postData,
    totalPoint
} from "../../models/points/ClaimPointsModel"
import { useEffect, useState } from "react"
import {
    ApiResponseClaimPoints,
    ClaimPointsInterface,
    FormInterface
} from "../../../interfaces/points/ClaimPointsInterface"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import url from "../../../services/url"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { OptionSelectInterface } from "../../../interfaces/globalInterface"
import exportToPdf from "../../../utils/toPdf"

export const useClaimPoints = () => {
    const [loading, setLoading] = useState(false)
    const [ query, setQuery ] = useState({name: ''})
    const [ idDetail, setIdDetail ] = useState<number|null>()
    const [ dataOptionClaimPoints, setDataOptionClaimPoints] = useState<OptionSelectInterface[]>([{value:'', label:''}])
    const { ClaimPoints } = url
    const { modalForm, setModalForm } = ModalFormState()
    const { t } = useTranslation();
    const modalConfirm = modalConfirmState()
    const page = usePage();
    
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
        watch,
        formState: { errors },
    } = useForm<FormInterface>();

    const {
        // remove,
        fields
    } = useFieldArray({
        control,
        name: 'form',
    })

    const {
        register:registerFilter,
        handleSubmit:handleSubmitFilter,
    } = useForm<ClaimPointsInterface>()

    useEffect(()=> {
        refetch()
    }, [page.page])
    
    const {data:dataClaimPoints, isFetching, refetch} = useQuery<ApiResponseClaimPoints, AxiosError>({ 
        queryKey: ['get-ClaimPoints', query], 
        networkMode: 'always',
        queryFn: async () => await getData(ClaimPoints.get, 
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

    const optionClaimPoints = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(ClaimPoints.getSelect, {name: data});
        if(response.status){
            setDataOptionClaimPoints(response.data.agentType);
            return response.data.agentType
        }
        return [{value:'', label:''}]
    }
    const { mutate } = useMutation({
        mutationFn: async (data:FormInterface)=> {
            return await postData(ClaimPoints.post, data)
        },
        onSuccess: () => {
            setModalForm((state)=>({
                ...state,
                visible: false
            }))
            setLoading(false);
            refetch()
            reset()
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
            modalConfirm.setModalConfirm({
                ...modalConfirm.modalConfirm,
                loading: false,
                visible: false
            })
            setLoading(false)
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const {mutate:mutateDelete} = useMutation({
        mutationFn: (id:number) => deleteData(ClaimPoints.delete, id),
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
        onError: async (errors) => {
            const err = errors as AxiosError<DataMessageError>
            let message = `${errors}`
            if(err.response?.status === 400){
                message = await handleMessageErrors(err.response?.data?.errors)
            }
            modalConfirm.setModalConfirm({
                ...modalConfirm.modalConfirm,
                loading: false,
                visible: false
            })
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const onSubmit: SubmitHandler<FormInterface> = async (data) => {
        
        mutate(data)
    }

    const onDelete = (id: number) => {
        modalConfirm.setModalConfirm((state)=>({
            ...state,
            title: state.title,
            message: state.message,
            confirmLabel: state.confirmLabel,
            cancelLabel: state.cancelLabel,
            type:'danger',
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

    const onCancel = () => {
        setModalForm((state)=>({
            ...state,
            visible: false
        }))
        reset()
        setIdDetail(null)
    }

    const onFilter: SubmitHandler<ClaimPointsInterface> = (data) => {
        setQuery((state)=>({
            ...state,
            name: data.date
        }));
    }


    const checkPoint = async (date:string) => {
        if(!date) {
            toast.error(`${t('date')} ${t('required')}`, {
                position: toast.POSITION.TOP_CENTER
            })
        }else{
            const data = await totalPoint(ClaimPoints.checkPoint, date);
            setValue('form', data);
        }
    }

    const downloadClaimPoints = async (id:number) => {
        const data = await getClaimPoints(ClaimPoints.download, id);
        exportToPdf(data, 'headerClaimPointsReport');
    }

    return {
        dataClaimPoints,
        isFetching,
        setQuery,
        onSubmit,
        loading,
        errors,
        reset,
        register,
        handleSubmit,
        modalForm, 
        setModalForm,
        onDelete,
        modalConfirm,
        onCancel,
        idDetail,
        page: page,
        control,
        optionClaimPoints,
        dataOptionClaimPoints,
        onFilter,
        registerFilter,
        handleSubmitFilter,
        setValue,
        getValues,
        watch,
        checkPoint,
        fields,
        downloadClaimPoints
    }
}