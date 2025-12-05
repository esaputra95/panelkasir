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
import moment from "moment"
import { useSearchParams } from "react-router-dom"

export const useWarehouse = () => {
    const [searchParams] = useSearchParams()
    const [loading, setLoading] = useState(false)
    const [ idDetail, setIdDetail ] = useState<number|null>()
    const [ dataOptionWarehouse, setDataOptionWarehouse] = useState<OptionSelectInterface[]>([{value:'', label:''}])
    const { store } = url
    const { modalForm, setModalForm } = ModalFormState()
    const { t } = useTranslation();
    const modalConfirm = modalConfirmState()
    const page = usePage();
    
    // Read filters from URL params
    const query = {
        name: searchParams.get('name') || '',
        phone: searchParams.get('phone') || '',
        email: searchParams.get('email') || '',
        address: searchParams.get('address') || '',
        sortby: searchParams.get('sortby') || '',
        sort: searchParams.get('sort') || ''
    }

    // Read page from URL params
    const currentPage = parseInt(searchParams.get("page") || "1")
    
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

    useEffect(()=> {
        refetch()
    }, [currentPage, query.name, query.phone, query.email, query.address, query.sortby, query.sort])
    
    const {
        data:dataWarehouse,
        isFetching, refetch
    } = useQuery<ApiResponseWarehouse, AxiosError>({ 
        queryKey: ['get-Warehouse', query, currentPage], 
        networkMode: 'always',
        queryFn: async () => await getData(store.get, 
            {
                ...query, 
                page:currentPage,
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
                    address: value.address,
                    expiredDate: moment(value.expiredDate).format('YYYY-MM-DD')
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
            message: 'Aksi ini akan menghapus semua riwayat transaksi yang terkait dengan Toko. Data tidak dapat dikembalikan lagi.',
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

    const handleOnChange = (key:keyof WarehouseInterface, keyOption:keyof WarehouseInterface, data?: OptionSelectInterface ) => {
        setValue(key, parseInt(data?.value+''))
    }

    return {
        dataWarehouse,
        isFetching,
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
        setValue,
        getValues,
        handleOnChange
    }
}