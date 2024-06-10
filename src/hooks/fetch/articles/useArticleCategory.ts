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
} from "./../../models/articles/ArticleCategoryModel"
import { useEffect, useState } from "react"
import {
    ApiResponseArticleCategory,
    ApiResponseUpdateArticleCategory,
    ArticleCategoryInterface
} from "./../../../interfaces/articles/ArticleCategoryInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { ArticleCategorySchema } from "../../../schema/articles"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { OptionSelectInterface } from "../../../interfaces/globalInterface"
import { ArticleCategoryDummy } from "../../../utils/dummy/article"

export const useArticleCategory = () => {
    const [ query, setQuery ] = useState({
        name: ''
    })
    const [ idDetail, setIdDetail ] = useState<number|null>()
    const [ dataOptionArticleCategory, setDataOptionArticleCategory] = useState<OptionSelectInterface[]>([{value:'', label:''}])
    const { ArticleCategory } = url
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
        control,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<ArticleCategoryInterface>({
        resolver: yupResolver(ArticleCategorySchema().schema)
    });

    const {
        register:registerFilter,
        handleSubmit:handleSubmitFilter,
    } = useForm<ArticleCategoryInterface>()

    useEffect(()=> {
        refetch()
    }, [page.page])
    
    const {data:dataArticleCategory, isFetching, refetch} = useQuery<ApiResponseArticleCategory, AxiosError>({ 
        queryKey: ['class-master', query], 
        networkMode: 'always',
        queryFn: async () => await getData(ArticleCategory.get, 
            {
                ...query, 
                page:page.page,
                limit: page.limit
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

    const optionArticleCategory = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(ArticleCategory.getSelect, {name: data});
        if(response.status){
            setDataOptionArticleCategory(response.data.articleCategories);
            return response.data.articleCategories
        }
        return [{value:'', label:''}]
    }

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:number) => getDataById(ArticleCategory.getById, id),
        onSuccess:(data:ApiResponseUpdateArticleCategory)=>{
            if(data.status){
                reset(data.data.articleCategory)
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
        mutationFn: (data:ArticleCategoryInterface)=> postData(ArticleCategory.post, data),
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
        mutationFn: (id:number) => deleteData(ArticleCategory.delete, id),
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

    const onSubmit: SubmitHandler<ArticleCategoryInterface> = (data) => {
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
        reset(ArticleCategoryDummy)
        setIdDetail(null)
    }

    const onDetail = async (id:number) => {
        setIdDetail(id)
        mutateById(id)
    }

    const onFilter: SubmitHandler<ArticleCategoryInterface> = (data) => {
        setQuery((state)=>({
            ...state,
            name: data.name
        }));
    }

    return {
        dataArticleCategory,
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
        optionArticleCategory,
        dataOptionArticleCategory,
        onFilter,
        registerFilter,
        handleSubmitFilter,
        setValue,
        getValues
    }
}