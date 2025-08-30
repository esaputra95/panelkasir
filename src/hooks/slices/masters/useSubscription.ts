import {  useMutation, useQuery } from "@tanstack/react-query"
import {
    deleteData,
    getDataById,
    getDataSelect,
    postData
} from "../../models/globalModel"
import { useEffect, useState } from "react"
import {
    ApiResponseSubscription,
    ApiResponseUpdateSubscription,
    SubscriptionInterface
} from "../../../interfaces/masters/SubscriptionInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import SubscriptionSchema, {  } from "../../../schema/masters/SubscriptionSchema"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { OptionSelectInterface } from "../../../interfaces/globalInterface"
import { getData } from "../../models/globalModel"

export const useSubscription = () => {
    const [loading, setLoading] = useState(false)
    const [ query, setQuery ] = useState({name: ''})
    const [ idDetail, setIdDetail ] = useState<string|null>()
    const [ dataOptionSubscription, setDataOptionSubscription] = useState<OptionSelectInterface[]>([{value:'', label:''}])
    const { Subscription } = url
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
        formState: { errors },
    } = useForm<SubscriptionInterface>({
        resolver: yupResolver(SubscriptionSchema().schema)
    });

    const {
        register:registerFilter,
        handleSubmit:handleSubmitFilter,
    } = useForm<SubscriptionInterface>()

    useEffect(()=> {
        refetch()
    }, [page.page])
    
    const {data:dataSubscription, isFetching, refetch} = useQuery<ApiResponseSubscription, AxiosError>({ 
        queryKey: ['get-Subscription', query], 
        networkMode: 'always',
        queryFn: async () => await getData(Subscription.get, 
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

    const optionSubscription = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(Subscription.getSelect, {name: data});
        if(response.status){
            setDataOptionSubscription(response.data.Subscription);
            return response.data.Subscription
        }
        return [{value:'', label:''}]
    }

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:string) => getDataById(Subscription.getById, id),
        onSuccess:(data:ApiResponseUpdateSubscription)=>{
            if(data.status){
                const value = data.data.Subscription
                reset(value);
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

    const { mutate, isLoading } = useMutation({
        mutationFn: async (data:SubscriptionInterface)=> {
            return await postData(Subscription.post, data)
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
        mutationFn: (id:string) => deleteData(Subscription.delete, id),
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

    const onSubmit: SubmitHandler<SubscriptionInterface> = async (data) => {
        mutate(data)
    }

    const onDelete = (id: string) => {
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

    const onUpdate = (id:string) => {
        mutateById(id)
    }

    const onCancel = () => {
        setModalForm((state)=>({
            ...state,
            visible: false
        }))
        reset()
        setIdDetail(null)
    }

    const onDetail = async (id:string) => {
        setIdDetail(id)
        mutateById(id)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onFilter: SubmitHandler<SubscriptionInterface> = (_data) => {
        setQuery((state)=>({
            ...state,
        }));
    }

    return {
        dataSubscription,
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
        onUpdate,
        onCancel,
        onDetail,
        idDetail,
        page: page,
        control,
        optionSubscription,
        dataOptionSubscription,
        onFilter,
        registerFilter,
        handleSubmitFilter,
        setValue,
        getValues,
        isLoading
    }
}