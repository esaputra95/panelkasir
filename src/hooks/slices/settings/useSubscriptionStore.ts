import { 
    useMutation,
    useQuery
} from "@tanstack/react-query"
import { useEffect, useState } from "react"
import {
    ApiResponseSubscriptionStore,
    ApiResponseUpdateSubscriptionStore,
    SubscriptionStoreInterface
} from "../../../interfaces/settings/SubscriptionStoreInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubscriptionStoreSchema } from "../../../schema/settings"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { OptionSelectInterface } from "../../../interfaces/globalInterface"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import usePaging from "../../../utils/usePaging"
import { deleteData, getData, getDataById, getDataSelect, postData } from "../../models/globalModel"
import moment from "moment"

export const useSubscriptionStore = () => {
    const [ query, setQuery ] = useState({
        name: '', email:'', phone:'', address: '', role:''
    })
    const [ idDetail, setIdDetail ] = useState<string|null>()
    const [ dataOptionSubscriptionStore, setDataOptionSubscriptionStore] = useState<OptionSelectInterface[]>([{value:'', label:''}])
    const { SubscriptionStore } = url
    const { modalForm, setModalForm } = ModalFormState()
    const { t } = useTranslation();
    const modalConfirm = modalConfirmState()
    const page = usePage();
    const User = useSelector((state:RootState)=> state.userReducer)
    const { queryParams } = usePaging();
    
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
    } = useForm<SubscriptionStoreInterface>({
        resolver: yupResolver(SubscriptionStoreSchema().schema),
    });
    
    const {
        register:registerFilter,
        handleSubmit:handleSubmitFilter,
    } = useForm<SubscriptionStoreInterface>()

    useEffect(()=> {
        refetch()
    }, [page.page])
    
    const {data:dataSubscriptionStore, isFetching, refetch} = useQuery<ApiResponseSubscriptionStore, AxiosError>({ 
        queryKey: ['SubscriptionStore-query', query, User.storeId, queryParams], 
        networkMode: 'always',
        queryFn: async () => await getData(SubscriptionStore, queryParams),
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

    const optionSubscriptionStore = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(SubscriptionStore, {name: data});
        if(response.status){
            setDataOptionSubscriptionStore(response.data.SubscriptionStore);
            return response.data.SubscriptionStore
        }
        return [{value:'', label:''}]
    }

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:string) => getDataById(SubscriptionStore, id),
        onSuccess:(data:ApiResponseUpdateSubscriptionStore)=>{
            if(data.status){
                const data_ = data.data?.subscriptionStore
                reset({
                    id: data_.id,
                    storeId: data_.storeId,
                    startDate: moment(data_.startDate).format('YYYY-MM-DD'),
                    endDate: moment(data_.endDate).format('YYYY-MM-DD')
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
        mutationFn: (data:SubscriptionStoreInterface)=> postData(SubscriptionStore, data),
        onSuccess: () => {
            setModalForm((state)=>({
                ...state,
                visible: false
            }))
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
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const {mutate:mutateDelete} = useMutation({
        mutationFn: (id:string) => deleteData(SubscriptionStore, id),
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

    const onSubmit: SubmitHandler<SubscriptionStoreInterface> = (data) => {
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
        reset()
        setIdDetail(null)
    }

    const onDetail = async (id:string) => {
        setIdDetail(id)
        mutateById(id)
    }

    return {
        dataSubscriptionStore,
        isFetching,
        setQuery,
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
        optionSubscriptionStore,
        dataOptionSubscriptionStore,
        registerFilter,
        handleSubmitFilter,
        setValue,
        getValues,
        watch,
    }
}