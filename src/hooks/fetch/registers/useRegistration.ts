import { useMutation, useQuery } from "@tanstack/react-query"
import { changeStatus, deleteData, getData, getDataById, postData, updateModule } from "../../models/registers/registrationModel"
import { useEffect, useState } from "react"
import { ApiResponseRegistration, ApiResponseUpdateRegistration, RegistrationInterface } from "../../../interfaces/registers/registrationInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import RegisterSchema from "../../../schema/registers/registrationSchema"
import { yupResolver } from "@hookform/resolvers/yup"

export const useRegistration = () => {
    const [ query, setQuery ] = useState<{name:string, status?:string}>()
    const [ idDetail, setIdDetail ] = useState<string | null>()
    const [ dataConfirmInvoice, setDataConfirmInvoice ] = useState<RegistrationInterface>()
    const [ stateConfirm, setStateConfirm ] = useState<{id?:string; status?:number}>()
    const { Registration } = url
    const { modalForm, setModalForm } = ModalFormState()
    const { modalForm:modelFormConfirmInvoice, setModalForm:setModalFormConfirmInvoice } = ModalFormState()
    const { t } = useTranslation();
    const modalConfirm = modalConfirmState()
    const page = usePage();
    
    useEffect(()=> {
        setModalForm((state)=>({
            ...state,
            label: 'Form '
        }));
    }, [])

    const {
        reset,
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<RegistrationInterface>({
        resolver: yupResolver(RegisterSchema().schema)
    })

    const {
        register:registerFilter,
        handleSubmit:handleSubmitFilter,
    } = useForm<{name:string, status?:string}>();

    useEffect(()=> {
        refetch()
    }, [page.page])
    
    const {data:dataRegistration, isFetching, refetch} = useQuery<ApiResponseRegistration, AxiosError>({ 
        queryKey: ['register-admin', query], 
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

    const onSort = async (label:string) => {
        console.log({label});
        
    }

    const optionRegistration = async () => {
        // const response = await getDataSelect(Registration.getSelect, {name: data});
        // if(response.status){
        //     return response.data.classType
        // }
    }

    const onChangeFilter = async (name:string, value:string) => {
        setQuery((state)=>({
            ...state,
            [name]:value
        }));
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
            setModalFormConfirmInvoice(state=> ({
                ...state,
                visible: false
            }))
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

    const onCancelInvoice = () => {
        setModalFormConfirmInvoice(state=> ({
            ...state,
            visible:false
        }))
    }

    const onDetail = async (id:string) => {
        setIdDetail(id)
        mutateById(id)
    }

    const sendMessage = async (phone:string) => {
        window.open('https://wa.me/'+phone)
    }

    const changeStatusInvoice = async (id:string, status:number) => {
        const data = await getDataById(Registration.getById, id);
        if(data.status){
            setStateConfirm({status: status, id: id})
            setDataConfirmInvoice(data.data.register)
            setModalFormConfirmInvoice(state=>({
                ...state,
                visible: true,
                label: 'Konfirmasi'
            }))
        }
    }

    const confirmChangeStatusInvoice = async (id:string, status:number) => {
        mutateUpdateStatus({id, status})
    }
    

    const handleOnChangeSelect = (key: keyof RegistrationInterface, data:string) => {
        setValue(`${key}` as keyof RegistrationInterface, data)
    }

    const updateModuleStatus = async (id:string) => {
        modalConfirm.setModalConfirm((state)=>({
            ...state,
            title: state.title,
            message: 'Apakah kamu yakin sudah mengirim modul siswa?',
            confirmLabel: 'Ya, Kirim',
            cancelLabel: state.cancelLabel,
            visible: true,
            onConfirm:async ()=>{
                modalConfirm.setModalConfirm((state)=>({
                    ...state,
                    loading: true
                }))
                const update = await updateModule(Registration.putModule, {id:id, isModule: 1})
                if(update.status){
                    toast.success(t("success-save"), {
                        position: toast.POSITION.TOP_CENTER
                    });
                }
                modalConfirm.setModalConfirm((state)=>({
                    ...state,
                    visible: false,
                    loading: false
                }));
                refetch()
            },
            onCancel:()=>{
                modalConfirm.setModalConfirm((state)=>({
                    ...state,
                    visible: false,
                }))
            }
        }))
    }

    const onFilter: SubmitHandler<{name:string}> = (data) => {
        setQuery((state)=>({
            ...state,
            name: data.name
        }));
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
        changeStatusInvoice,
        handleOnChangeSelect,
        modelFormConfirmInvoice,
        dataConfirmInvoice,
        onCancelInvoice,
        stateConfirm,
        confirmChangeStatusInvoice,
        updateModuleStatus,
        registerFilter,
        handleSubmitFilter,
        onFilter,
        onSort,
        onChangeFilter
    }
}