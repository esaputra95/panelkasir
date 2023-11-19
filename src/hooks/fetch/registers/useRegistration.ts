import {  useMutation, useQuery } from "@tanstack/react-query"
import { changeStatus, deleteData, getData, getDataById, postData } from "../../models/registers/registrationModel"
import { useEffect, useState } from "react"
import { ApiResponseRegistration, ApiResponseUpdateRegistration, RegistrationInterface } from "../../../interfaces/registers/registratioInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { AxiosError } from "axios"
import { modalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"

export const useRegistration = () => {
    const [ query, setQuery ] = useState<RegistrationInterface>()
    const [ idDetail, setIdDetail ] = useState<string | null>()
    const { Registration } = url
    const { modalForm, setModalForm } = modalFormState()
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
        formState: { errors },
    } = useForm<RegistrationInterface>()

    useEffect(()=> {
        refetch()
    }, [page.page])
      
    const {data:dataRegistration, isFetching, refetch} = useQuery<ApiResponseRegistration, AxiosError>({ 
        queryKey: ['class-master'], 
        networkMode: 'always',
        queryFn: async () => await getData(Registration.get, 
            {
                ...query, 
                page:page.page,
                limit: page.limit
            }
        ),
        onSuccess(data) {
            page.setTotal(Math.ceil((data?.data?.info?.total  ?? 1)/(data?.data?.info?.limit ?? page.limit)));
        },
        onError: (errors) => {
            toast.error(errors.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const optionRegistration = async () => {
        // const response = await getDataSelect(Registration.getSelect, {name: data});
        // if(response.status){
        //     return response.data.classType
        // }
    }

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:string) => getDataById(Registration.getById, id),
        onSuccess:(data:ApiResponseUpdateRegistration)=>{
            if(data.status){
                reset(data.data.register)
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
        mutationFn: (data:RegistrationInterface)=> postData(Registration.post, data),
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
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const {mutate:mutateDelete} = useMutation({
        mutationFn: (id:string) => deleteData(Registration.delete, id),
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
            const err = error as AxiosError
            toast.success(`${err}`, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })
    const {mutate:mutateUpdateStatus} = useMutation({
        mutationFn: ( data: 
            { 
                id:string, 
                status: number 
            }) => changeStatus(Registration.put, {id:data.id, status:data.status}),
        onSuccess: () => {
            modalConfirm.setModalConfirm({
                ...modalConfirm.modalConfirm,
                loading: false,
                visible: false
            })
            refetch()
            toast.success(t("success-update"), {
                position: toast.POSITION.TOP_CENTER
            });
        },
        onError:(error) => {
            const err = error as AxiosError
            toast.success(`${err}`, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const onSubmit: SubmitHandler<RegistrationInterface> = (data) => {
        mutate({...data})
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
        mutateById(id)
    }

    const onCancel = () => {
        setModalForm((state)=>({
            ...state,
            visible: false
        }))
        setIdDetail(null)
    }

    const onDetail = async (id:string) => {
        setIdDetail(id)
        mutateById(id)
    }

    const sendMessage = async (phone:string) => {
        window.open('https://wa.me/'+phone)
    }

    const changeStatusInvoice = (id:string, status:number) => {
        modalConfirm.setModalConfirm((state)=>({
            ...state,
            title: 'Update Status',
            message: 'Update status Register',
            type:'primary',
            confirmLabel: state.confirmLabel,
            cancelLabel: state.cancelLabel,
            visible: true,
            onConfirm:()=>{
                modalConfirm.setModalConfirm((state)=>({
                    ...state,
                    loading: true
                }))
                mutateUpdateStatus({id, status})
            },
            onCancel:()=>{
                modalConfirm.setModalConfirm((state)=>({
                    ...state,
                    visible: false,
                }))
            }
        }))
    }

    return {
        dataRegistration,
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
        optionRegistration,
        sendMessage,
        changeStatusInvoice
    }
}