import {  useMutation, useQuery } from "@tanstack/react-query"
import { deleteData, getData, getDataById, getDataSelect, postData } from "../../models/master/materialModel"
import { useEffect, useState } from "react"
import { ApiResponseTutor, TutorFilter, TutorInterface } from "../../../interfaces/master/tutorInterface"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { TutorSchema } from "../../../schema/masters"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import { TutorDummy } from '../../../utils/dummy/master'
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { OptionSelectInterface } from "../../../interfaces/globalInterface"
import { OptionDummy } from "../../../utils/dummy/setting"

export const useTutor = () => {
    const [ query, setQuery ] = useState<TutorFilter>()
    const [ idDetail, setIdDetail ] = useState<string | null>()
    const [ dataOptionTutor, setDataOptionTutor] = useState<OptionSelectInterface[]>([OptionDummy])
    const { Tutor } = url
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
        getValues,
        control,
        formState: { errors },
    } = useForm<TutorInterface>({
        resolver: yupResolver(TutorSchema().schema),
        defaultValues:{
            ...TutorDummy
        }
    })

    const {
        register:registerFilter,
        handleSubmit:handleSubmitFilter,
    } = useForm<TutorFilter>()

    const { fields, append, remove } = useFieldArray({
        control,
        name: "tentorSkills"
    });

    useEffect(()=> {
        refetch()
    }, [page.page]);
    
    const {data:dataTutor, isFetching, refetch} = useQuery<ApiResponseTutor, AxiosError>({ 
        queryKey: ['class-types', query], 
        networkMode: 'always',
        queryFn: async () => await getData(Tutor.get, 
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

    const optionTutor = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(Tutor.getSelect, {name: data});
        if(response.status){
            setDataOptionTutor(response.data.tutor)
            return response.data.tutor
        }
        return [OptionDummy];
    }

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:string) => getDataById(Tutor.getById, id),
        onSuccess:(data:TutorInterface)=>{
            reset({
                ...data,
                password:''
            })
            setModalForm((state)=>({
                ...state,
                visible: true
            }))
        },
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:TutorInterface)=> postData(Tutor.post, data),
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
        mutationFn: (id:string) => deleteData(Tutor.delete, id),
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

    const onSubmit: SubmitHandler<TutorInterface> = (data) => {
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
            ...TutorDummy
        })
        setIdDetail(null)
    }

    const onDetail = async (id:string) => {
        setIdDetail(id)
        mutateById(id)
    }

    const onFilter: SubmitHandler<TutorFilter> = (data) => {
        setQuery((state)=>({
            ...state,
            name: data.name
        }));
    }

    return {
        dataTutor,
        isFetching,
        setQuery,
        onSubmit,
        isLoadingMutate,
        errors,
        reset,
        register,
        handleSubmit,
        getValues,
        modalForm, 
        setModalForm,
        onDelete,
        modalConfirm,
        onUpdate,
        onCancel,
        onDetail,
        idDetail,
        page: page,
        optionTutor,
        registerFilter,
        handleSubmitFilter,
        onFilter,
        dataOptionTutor,
        fields,
        append,
        remove,
        control
    }
}