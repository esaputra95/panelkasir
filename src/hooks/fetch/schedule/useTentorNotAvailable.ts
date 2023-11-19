import {  useMutation, useQuery } from "@tanstack/react-query"
import { deleteData, getData, getDataById, getDataSelect, postData } from "./../../models/schedule/tentorNotAvailableModel"
import { useEffect, useState } from "react"
import { ApiResponseTentorNotAvailable, TentorNotAvailableFilter, TentorNotAvailableInterface } from "./../../../interfaces/schedule/tentorNotAvailableInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "./../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { TentorNotAvailableSchema } from "./../../../schema/schedule"
import { AxiosError } from "axios"
import { modalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import { TentorNotAvailableDummy } from './../../../utils/dummy/scheduleDummy'
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"
import moment from "moment-timezone"

export const useTentorNotAvailable = () => {
    const [ query, setQuery ] = useState<TentorNotAvailableFilter>()
    const [ idDetail, setIdDetail ] = useState<string | null>()
    const { TentorNotAvailable } = url
    const { modalForm, setModalForm } = modalFormState()
    const { t } = useTranslation();
    const modalConfirm = modalConfirmState()
    const page = usePage();

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();
    
    useEffect(()=> {
        setQuery({
            name: searchParams.get('name') ?? '',
        })
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
    } = useForm<TentorNotAvailableInterface>({
        resolver: yupResolver(TentorNotAvailableSchema().schema)
    })

    const {
        register:registerFilter,
        handleSubmit:handleSubmitFilter,
    } = useForm<TentorNotAvailableFilter>()
      
    const {data:dataTentorNotAvailable, isFetching, refetch} = useQuery<ApiResponseTentorNotAvailable, AxiosError>({ 
        queryKey: ['class-types', query], 
        networkMode: 'always',
        queryFn: async () => await getData(TentorNotAvailable.get, 
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

    useEffect(()=> {
        navigate({
            pathname: "/tentor-not-available",
            search: createSearchParams({
                page: page.page+''
            }).toString()
        });
        refetch()
    }, [page.page]);

    const optionTentorNotAvailable = async (data:string) => {
        const response = await getDataSelect(TentorNotAvailable.getSelect, {name: data});
        if(response.status){
            return response.data.TentorNotAvailable
        }
    }

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:string) => getDataById(TentorNotAvailable.getById, id),
        onSuccess:(data:TentorNotAvailableInterface)=>{
            console.log('date : ', moment(data.startDate).format());
            
            reset({
                ...data,
                startDate: moment(data.startDate).tz('Asia/Jakarta').format('YYYY-MM-DDTHH:mm'),
                untilDate: moment(data.startDate).tz('Asia/Jakarta').format('YYYY-MM-DDTHH:mm')
            })
            setModalForm((state)=>({
                ...state,
                visible: true
            }))
        },
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:TentorNotAvailableInterface)=> postData(TentorNotAvailable.post, data),
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
        mutationFn: (id:string) => deleteData(TentorNotAvailable.delete, id),
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

    const onSubmit: SubmitHandler<TentorNotAvailableInterface> = (data) => {
        mutate({
            ...data,
            tentorId: data.tentor.value
        })
    }

    const onDelete = (id: string) => {
        modalConfirm.setModalConfirm((state)=>({
            ...state,
            title: state.title,
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
        reset({
            ...TentorNotAvailableDummy
        })
        setIdDetail(null)
    }

    const onDetail = async (id:string) => {
        setIdDetail(id)
        mutateById(id)
    }

    const onFilter: SubmitHandler<TentorNotAvailableFilter> = (data) => {
        navigate({
            pathname: "/tentor-not-available",
            search: createSearchParams({
                page: page.page+'',
                name: data.name+''
            }).toString()
        });
        setQuery((state)=>({
            ...state,
            name: data.name
        }));
    }

    return {
        dataTentorNotAvailable,
        isFetching,
        setQuery,
        onSubmit,
        isLoadingMutate,
        errors,
        control,
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
        optionTentorNotAvailable,
        registerFilter,
        handleSubmitFilter,
        onFilter
    }
}