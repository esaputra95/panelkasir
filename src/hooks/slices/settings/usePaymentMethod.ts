import { 
    useMutation,
    useQuery
} from "@tanstack/react-query"
import {
    deleteData,
    getData,
    getDataById,
    getDataSelect,
    postData
} from "../../models/settings/PaymentMethodModel"
import { useEffect, useState } from "react"
import {
    ApiResponsePaymentMethod,
    ApiResponseUpdatePaymentMethod,
    PaymentMethodInterface
} from "../../../interfaces/settings/PaymentMethodInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { PaymentMethodSchema } from "../../../schema/settings"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { OptionSelectInterface } from "../../../interfaces/globalInterface"
import { PaymentMethodDummy } from "../../../utils/dummy/setting"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

export const usePaymentMethod = () => {
    const [ query, setQuery ] = useState({
        name: '', email:'', phone:'', address: '', role:''
    })
    const [ idDetail, setIdDetail ] = useState<number|null>()
    const [ dataOptionPaymentMethod, setDataOptionPaymentMethod] = useState<OptionSelectInterface[]>([{value:'', label:''}])
    const { PaymentMethod } = url
    const { modalForm, setModalForm } = ModalFormState()
    const { t } = useTranslation();
    const modalConfirm = modalConfirmState()
    const page = usePage();
    const User = useSelector((state:RootState)=> state.userReducer)
    
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
    } = useForm<PaymentMethodInterface>({
        resolver: yupResolver(PaymentMethodSchema().schema),
        defaultValues: {
            ...PaymentMethodDummy
        }
    });

    console.log({errors});
    

    const {
        register:registerFilter,
        handleSubmit:handleSubmitFilter,
    } = useForm<PaymentMethodInterface>()

    useEffect(()=> {
        refetch()
    }, [page.page])
    
    const {data:dataPaymentMethod, isFetching, refetch} = useQuery<ApiResponsePaymentMethod, AxiosError>({ 
        queryKey: ['PaymentMethod-query', query, User.storeId], 
        networkMode: 'always',
        queryFn: async () => await getData(PaymentMethod.get, 
            {
                ...query,
                page: page.page,
                limit: page.limit,
                storeId: User.storeId
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

    const optionPaymentMethod = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(PaymentMethod.getSelect, {name: data});
        if(response.status){
            setDataOptionPaymentMethod(response.data.PaymentMethod);
            return response.data.PaymentMethod
        }
        return [{value:'', label:''}]
    }

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:number) => getDataById(PaymentMethod.getById, id),
        onSuccess:(data:ApiResponseUpdatePaymentMethod)=>{
            if(data.status){
                reset({
                    ...data.data.PaymentMethod,
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
        mutationFn: (data:PaymentMethodInterface)=> postData(PaymentMethod.post, data),
        onSuccess: () => {
            setModalForm((state)=>({
                ...state,
                visible: false
            }))
            refetch()
            reset({
                ...PaymentMethodDummy
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
        mutationFn: (id:number) => deleteData(PaymentMethod.delete, id),
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

    const onSubmit: SubmitHandler<PaymentMethodInterface> = (data) => {
        mutate({
            ...data
        })
        
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

    const onUpdate = (id:number) => {
        mutateById(id)
    }
    

    const onCancel = () => {
        setModalForm((state)=>({
            ...state,
            visible: false
        }))
        reset(PaymentMethodDummy)
        setIdDetail(null)
    }

    const onDetail = async (id:number) => {
        setIdDetail(id)
        mutateById(id)
    }

    const onFilter: SubmitHandler<PaymentMethodInterface> = (data) => {
        setQuery((state)=>({
            ...state,
            name: data.name
        }));
    }

    return {
        dataPaymentMethod,
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
        optionPaymentMethod,
        dataOptionPaymentMethod,
        onFilter,
        registerFilter,
        handleSubmitFilter,
        setValue,
        getValues,
        watch,
    }
}