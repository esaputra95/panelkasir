import {  useMutation, useQuery } from "@tanstack/react-query"
import { deleteData, getData, getDataById, getDataSelect, postData } from "./../../models/master/classTypeModal"
import { useEffect, useState } from "react"
import { ApiResponseClassType, ClassTypeFilter, ClassTypeInterface } from "./../../../interfaces/master/classTypeInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "./../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import ClassTypeSchema from "./../../../schema/masters/classTypeSchema"
import { AxiosError } from "axios"
import { modalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import { classTypeDummy } from './../../../utils/dummy/master'
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { OptionSelectInterface } from "../../../interfaces/globalInterface"
import { OptionDummy } from "../../../utils/dummy/setting"

export const useClassType = () => {
    const [ query, setQuery ] = useState<ClassTypeFilter>()
    const [ idDetail, setIdDetail ] = useState<string | null>()
    const [ dataOptionClassType, setDataOptionClassType ] = useState<OptionSelectInterface[]>([OptionDummy])
    const { classType } = url
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
        formState: { errors },
    } = useForm<ClassTypeInterface>({
        resolver: yupResolver(ClassTypeSchema().schema)
    })

    const {
        register:registerFilter,
        handleSubmit:handleSubmitFilter,
    } = useForm<ClassTypeFilter>()

    useEffect(()=> {
        refetch()
    }, [page.page]);
    
    const {data:dataClassType, isFetching, refetch} = useQuery<ApiResponseClassType, AxiosError>({ 
        queryKey: ['class-types', query], 
        networkMode: 'always',
        queryFn: async () => await getData(classType.get, 
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

    const optionClassType = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(classType.getSelect, {name: data});
        if(response.status){
            setDataOptionClassType(response.data.classType);
            return response.data.classType
        }
        return [OptionDummy]
    }

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:string) => getDataById(classType.getById, id),
        onSuccess:(data:ClassTypeInterface)=>{
            reset(data)
            setModalForm((state)=>({
                ...state,
                visible: true
            }))
        },
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:ClassTypeInterface)=> postData(classType.post, data),
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
        mutationFn: (id:string) => deleteData(classType.delete, id),
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

    const onSubmit: SubmitHandler<ClassTypeInterface> = (data) => {
        mutate(data)
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
            ...classTypeDummy
        })
        setIdDetail(null)
    }

    const onDetail = async (id:string) => {
        setIdDetail(id)
        mutateById(id)
    }

    const onFilter: SubmitHandler<ClassTypeFilter> = (data) => {
        setQuery((state)=>({
            ...state,
            name: data.name
        }));
    }

    return {
        dataClassType,
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
        optionClassType,
        registerFilter,
        handleSubmitFilter,
        onFilter,
        dataOptionClassType
    }
}