import {  useMutation, useQuery } from "@tanstack/react-query"
import { deleteData, getData, getDataById, getDataSelect, postData } from "./../../models/master/courseModel"
import { useEffect, useState } from "react"
import { ApiResponseCourse, CourseInterface } from "./../../../interfaces/master/courseInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "./../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { CourseSchema } from "./../../../schema/masters"
import { AxiosError } from "axios"
import { modalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import { CourseDummy } from './../../../utils/dummy/master'
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"

export const useCourse = () => {
    const [ query, setQuery ] = useState<CourseInterface>()
    const [ idDetail, setIdDetail ] = useState<string | null>()
    const { Course } = url
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
    } = useForm<CourseInterface>({
        resolver: yupResolver(CourseSchema().schema)
    })

    useEffect(()=> {
        refetch()
    }, [page.page])
      
    const {data:dataCourse, isFetching, refetch} = useQuery<ApiResponseCourse, AxiosError>({ 
        queryKey: ['get-Course'], 
        networkMode: 'always',
        queryFn: async () => await getData(Course.get, 
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

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:string) => getDataById(Course.getById, id),
        onSuccess:(data:CourseInterface)=>{
            reset(data)
            setModalForm((state)=>({
                ...state,
                visible: true
            }))
        },
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:CourseInterface)=> postData(Course.post, data),
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
        mutationFn: (id:string) => deleteData(Course.delete, id),
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

    const onSubmit: SubmitHandler<CourseInterface> = (data) => {
        mutate({
            ...data,
            majorId: data.major?.value
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
            ...CourseDummy
        })
        setIdDetail(null)
    }

    const onDetail = async (id:string) => {
        setIdDetail(id)
        mutateById(id)
    }

    const optionCourse = async (data:string) => {
        const response = await getDataSelect(Course.getSelect, {name: data});
        if(response.status){
            return response.data.course
        }
    }

    return {
        dataCourse,
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
        optionCourse
    }
}