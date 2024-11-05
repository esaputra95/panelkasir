import {  useMutation, useQuery } from "@tanstack/react-query"
import {
    deleteData,
    getData,
    getDataById,
    getDataSelect,
    postData
} from "../../models/settings/WarehouseModel"
import { useEffect, useState } from "react"
import {
    ApiResponseWarehouse,
    ApiResponseUpdateWarehouse,
    WarehouseInterface
} from "../../../interfaces/settings/WarehouseInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import WarehouseSchema, {  } from "../../../schema/settings/WarehouseSchema"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { OptionSelectInterface } from "../../../interfaces/globalInterface"
import { WarehouseDummy } from "../../../utils/dummy/setting"

export const useWarehouse = () => {
    const [loading, setLoading] = useState(false)
    const [ query, setQuery ] = useState({name: ''})
    const [ idDetail, setIdDetail ] = useState<number|null>()
    const [ dataOptionWarehouse, setDataOptionWarehouse] = useState<OptionSelectInterface[]>([{value:'', label:''}])
    const { store } = url
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
    } = useForm<WarehouseInterface>({
        resolver: yupResolver(WarehouseSchema().schema)
    });

    const {
        register:registerFilter,
        handleSubmit:handleSubmitFilter,
    } = useForm<WarehouseInterface>()

    useEffect(()=> {
        refetch()
    }, [page.page])
    
    const {
        data:dataWarehouse,
        isFetching, refetch
    } = useQuery<ApiResponseWarehouse, AxiosError>({ 
        queryKey: ['get-Warehouse', query], 
        networkMode: 'always',
        queryFn: async () => await getData(store.get, 
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

    const optionWarehouse = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(store.select, {name: data});
        if(response.status){
            setDataOptionWarehouse(response.data.store);
            return response.data.store
        }
        return [{value:'', label:''}]
    }

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:number) => getDataById(store.getById, id),
        onSuccess:(data:ApiResponseUpdateWarehouse)=>{
            if(data.status){
                const value = data.data.store
                reset({
                    id: value.id,
                    name: value.name,
                    phone: value.phone,
                    email: value.email,
                    description: value.description,
                    address: value.address
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

    const { mutate } = useMutation({
        mutationFn: async (data:WarehouseInterface)=> {
            return await postData(store.post, data)
        },
        onSuccess: () => {
            setModalForm((state)=>({
                ...state,
                visible: false
            }))
            setLoading(false);
            refetch()
            reset(WarehouseDummy)
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
            setLoading(false)
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const {mutate:mutateDelete} = useMutation({
        mutationFn: (id:number) => deleteData(store.delete, id),
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

    const onSubmit: SubmitHandler<WarehouseInterface> = async (data) => {
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
        reset(WarehouseDummy)
        setIdDetail(null)
    }

    const onDetail = async (id:number) => {
        setIdDetail(id)
        mutateById(id)
    }

    const onFilter: SubmitHandler<WarehouseInterface> = (data) => {
        setQuery((state)=>({
            ...state,
            name: data.name
        }));
    }

    const handleOnChange = (key:keyof WarehouseInterface, keyOption:keyof WarehouseInterface, data?: OptionSelectInterface ) => {
        setValue(key, parseInt(data?.value+''))
        console.log({keyOption});
        
        // setValue(keyOption, data)
    }

    return {
        dataWarehouse,
        isFetching,
        setQuery,
        onSubmit,
        loading,
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
        optionWarehouse,
        dataOptionWarehouse,
        onFilter,
        registerFilter,
        handleSubmitFilter,
        setValue,
        getValues,
        handleOnChange
    }
}