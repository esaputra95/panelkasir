import {  useMutation, useQuery } from "@tanstack/react-query"
import {
    deleteData,
    getData,
    getDataSelect,
} from "../../../models/sales/SaleStockistModel"
import { useEffect, useState } from "react"
import {
    ApiResponseSaleStockist,
    SaleStockistInterface
} from "../../../../interfaces/sales/SaleStockistInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../../services/url"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../../utils/modalConfirmState"
import usePage from "../../../../utils/pageState"
import { DataMessageError } from "../../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../../services/handleErrorMessage"
import { OptionSelectInterface } from "../../../../interfaces/globalInterface"

export const useSaleStockist = () => {
    const [ query, setQuery ] = useState({name: ''})
    const [ dataOptionSaleStockist, setDataOptionSaleStockist] = useState<OptionSelectInterface[]>([{value:'', label:''}])
    const { SaleStockist } = url
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
        register:registerFilter,
        handleSubmit:handleSubmitFilter,
    } = useForm<SaleStockistInterface>()

    useEffect(()=> {
        refetch()
    }, [page.page])
    
    const {
        data:dataSaleStockist,
        isFetching, refetch
    } = useQuery<ApiResponseSaleStockist, AxiosError>({ 
        queryKey: ['get-SaleStockist', query], 
        networkMode: 'always',
        queryFn: async () => await getData(SaleStockist.get, 
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

    const optionSaleStockist = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(SaleStockist.getSelect, {name: data});
        if(response.status){
            setDataOptionSaleStockist(response.data.agentType);
            return response.data.agentType
        }
        return [{value:'', label:''}]
    }

    const {mutate:mutateDelete} = useMutation({
        mutationFn: (id:number) => deleteData(SaleStockist.delete, id),
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

    const onFilter: SubmitHandler<SaleStockistInterface> = (data) => {
        setQuery((state)=>({
            ...state,
            name: data.invoice
        }));
    }

    return {
        dataSaleStockist,
        isFetching,
        setQuery,
        modalForm, 
        setModalForm,
        onDelete,
        modalConfirm,
        page: page,
        optionSaleStockist,
        dataOptionSaleStockist,
        onFilter,
        registerFilter,
        handleSubmitFilter
    }
}