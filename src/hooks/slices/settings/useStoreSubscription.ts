import { 
    useMutation,
    useQuery
} from "@tanstack/react-query"
import {
    deleteData,
    getData,
    getDataById,
    postData
} from "../../models/settings/StoreSubscriptionModel"
import { useEffect, useState } from "react"
import {
    ApiResponseStoreSubscription,
    ApiResponseUpdateStoreSubscription,
    StoreSubscriptionInterface
} from "../../../interfaces/settings/StoreSubscriptionInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { StoreSubscriptionSchema } from "../../../schema/settings"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { StoreSubscriptionDummy } from "../../../utils/dummy/setting"
import { useSearchParams } from "react-router-dom"

export const useStoreSubscription = () => {
    const [searchParams] = useSearchParams()
    const [ idDetail, setIdDetail ] = useState<string|null>()
    const { StoreSubscription } = url
    const { modalForm, setModalForm } = ModalFormState()
    const { t } = useTranslation();
    const modalConfirm = modalConfirmState()
    const page = usePage();
    
    // Read filters from URL params
    const query = {
        storeId: searchParams.get('storeId') || '',
        type: searchParams.get('type') || '',
        status: searchParams.get('status') || '',
        sortby: searchParams.get('sortby') || '',
        sort: searchParams.get('sort') || ''
    }

    // Read page from URL params
    const currentPage = parseInt(searchParams.get("page") || "1")
    
    useEffect(()=> {
        setModalForm((state)=>({
            ...state,
            label: 'Form Store Subscription'
        }))
    }, [setModalForm])

    const {
        reset,
        register,
        handleSubmit,
        control,
        setValue,
        getValues,
        watch,
        formState: { errors },
    } = useForm<StoreSubscriptionInterface>({
        resolver: yupResolver(StoreSubscriptionSchema().schema) as any,
        defaultValues: {
            ...StoreSubscriptionDummy
        }
    });

    const {data:dataStoreSubscription, isFetching, refetch} = useQuery<ApiResponseStoreSubscription, AxiosError>({ 
        queryKey: ['store-subscription-query', query, currentPage], 
        networkMode: 'always',
        queryFn: async () => await getData(StoreSubscription.get, 
            {
                ...query,
                page: currentPage,
                limit: page.limit,
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

    useEffect(()=> {
        refetch()
    }, [currentPage, query.storeId, query.type, query.status, query.sortby, query.sort, refetch])

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:string) => getDataById(StoreSubscription.getById, id),
        onSuccess:(data:ApiResponseUpdateStoreSubscription)=>{
            if(data.status){
                reset({
                    ...data.data.storeSubscription,
                })
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
        mutationFn: (data:StoreSubscriptionInterface)=> postData(StoreSubscription.post, data),
        onSuccess: () => {
            setModalForm((state)=>({
                ...state,
                visible: false
            }))
            refetch()
            reset({
                ...StoreSubscriptionDummy
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

    const {mutate:mutateDelete} = useMutation({
        mutationFn: (id:string) => deleteData(StoreSubscription.delete, id),
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

    const onSubmit: SubmitHandler<StoreSubscriptionInterface> = (data) => {
        mutate({
            ...data
        })
        
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
        reset(StoreSubscriptionDummy)
        setIdDetail(null)
    }

    const onDetail = async (id:string) => {
        setIdDetail(id)
        mutateById(id)
    }

    return {
        dataStoreSubscription,
        isFetching,
        onSubmit,
        isLoadingMutate,
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
        setValue,
        getValues,
        watch,
    }
}
