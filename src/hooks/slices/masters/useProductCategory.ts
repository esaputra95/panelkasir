import {  useMutation, useQuery } from "@tanstack/react-query"
import {
    deleteData,
    getData,
    getDataById,
    getDataSelect,
    postData
} from "../../models/masters/ProductCategoryModel"
import { useEffect, useState } from "react"
import {
    ApiResponseProductCategory,
    ApiResponseUpdateProductCategory,
    ProductCategoryInterface
} from "../../../interfaces/masters/ProductCategoryInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import ProductCategorySchema from "../../../schema/masters/productCategorySchema"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { OptionSelectInterface } from "../../../interfaces/globalInterface"
import { ProductCategoryDummy } from "../../../utils/dummy/master"

export const useProductCategory = () => {
    const [ query, setQuery ] = useState({name: ''})
    const [ idDetail, setIdDetail ] = useState<number|null>()
    const [ dataOptionProductCategory, setDataOptionProductCategory] = useState<OptionSelectInterface[]>([{value:'', label:''}])
    const { ProductCategory } = url
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
    } = useForm<ProductCategoryInterface>({
        resolver: yupResolver(ProductCategorySchema().schema)
    });

    const {
        register:registerFilter,
        handleSubmit:handleSubmitFilter,
    } = useForm<ProductCategoryInterface>()

    useEffect(()=> {
        refetch()
    }, [page.page])
    
    const {data:dataProductCategory, isFetching, refetch} = useQuery<ApiResponseProductCategory, AxiosError>({ 
        queryKey: ['get-ProductCategory', query], 
        networkMode: 'always',
        queryFn: async () => await getData(ProductCategory.get, 
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

    const optionProductCategory = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(ProductCategory.getSelect, {name: data});
        if(response.status){
            setDataOptionProductCategory(response.data.productCategory);
            return response.data.productCategory
        }
        return [{value:'', label:''}]
    }

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:number) => getDataById(ProductCategory.getById, id),
        onSuccess:(data:ApiResponseUpdateProductCategory)=>{
            if(data.status){
                const value = data.data.productCategory
                reset({
                    id: value.id,
                    name: value.name,
                    description: value.description
                });
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

    const { mutate, isLoading } = useMutation({
        mutationFn: async (data:ProductCategoryInterface)=> {
            return await postData(ProductCategory.post, data)
        },
        onSuccess: () => {
            setModalForm((state)=>({
                ...state,
                visible: false
            }))
            refetch()
            reset(ProductCategoryDummy)
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
        mutationFn: (id:number) => deleteData(ProductCategory.delete, id),
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

    const onSubmit: SubmitHandler<ProductCategoryInterface> = async (data) => {
        mutate(data)
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
        reset(ProductCategoryDummy)
        setIdDetail(null)
    }

    const onDetail = async (id:number) => {
        setIdDetail(id)
        mutateById(id)
    }

    const onFilter: SubmitHandler<ProductCategoryInterface> = (data) => {
        setQuery((state)=>({
            ...state,
            name: data.name
        }));
    }

    const handleOnChange = (key:keyof ProductCategoryInterface, data?: OptionSelectInterface ) => {
        setValue(key, parseInt(data?.value+''))
    }

    return {
        dataProductCategory,
        isFetching,
        setQuery,
        onSubmit,
        isLoading,
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
        optionProductCategory,
        dataOptionProductCategory,
        onFilter,
        registerFilter,
        handleSubmitFilter,
        setValue,
        getValues,
        handleOnChange
    }
}