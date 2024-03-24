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
} from "./../../models/settings/guidanceTypeModel"
import { useEffect, useState } from "react"
import { 
    ApiResponseGuidanceType,
    GuidanceTypeInterface
} from "./../../../interfaces/settings/guidanceTypeInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "./../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { GuidanceTypeSchema } from "./../../../schema/settings"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import { GuidanceTypeDummy, OptionDummy } from './../../../utils/dummy/setting'
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { OptionSelectInterface } from "../../../interfaces/globalInterface"

export const useGuidanceType = () => {
    const [ query, setQuery ] = useState<GuidanceTypeInterface>()
    const [ idDetail, setIdDetail ] = useState<string | null>()
    const [ dataOptionGuidanceType, setDataOptionGuidanceType ] = useState<OptionSelectInterface[]>([OptionDummy])
    const { GuidanceType } = url
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
        formState: { errors },
    } = useForm<GuidanceTypeInterface>({
        resolver: yupResolver(GuidanceTypeSchema().schema)
    })

    useEffect(()=> {
        refetch()
    }, [page.page])
      
    const {data:dataGuidanceType, isFetching, refetch} = useQuery<ApiResponseGuidanceType, AxiosError>({ 
        queryKey: ['class-types'], 
        networkMode: 'always',
        queryFn: async () => await getData(GuidanceType.get, 
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

    const optionGuidanceType = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(GuidanceType.getSelect, {name: data});
        setDataOptionGuidanceType(response.data.guidanceType)
        return response.data.guidanceType
    }

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:string) => getDataById(GuidanceType.getById, id),
        onSuccess:(data:GuidanceTypeInterface)=>{
            reset(data)
            setModalForm((state)=>({
                ...state,
                visible: true
            }))
        },
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:GuidanceTypeInterface)=> postData(GuidanceType.post, data),
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
        mutationFn: (id:string) => deleteData(GuidanceType.delete, id),
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

    const onSubmit: SubmitHandler<GuidanceTypeInterface> = (data) => {
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
            ...GuidanceTypeDummy
        })
        setIdDetail(null)
    }

    const onDetail = async (id:string) => {
        setIdDetail(id)
        mutateById(id)
    }

    return {
        dataGuidanceType,
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
        optionGuidanceType,
        dataOptionGuidanceType
    }
}