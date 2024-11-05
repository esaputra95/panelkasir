import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { 
    ApiResponseUpdateSaleStockist,
    SaleStockistInterface
} from "../../../../interfaces/sales/SaleStockistInterface";
import { yupResolver } from "@hookform/resolvers/yup";
import SaleStockistSchema from "../../../../schema/sales/SaleStockistSchema";
import { useMutation } from "@tanstack/react-query";
import {
    getDataById,
    postData
} from "../../../models/sales/SaleStockistModel";
import { AxiosError } from "axios";
import { DataMessageError } from "../../../../interfaces/apiInfoInterface";
import { modalConfirmState } from "../../../../utils/modalConfirmState";
import { toast } from "react-toastify";
import url from "../../../../services/url";
import { handleMessageErrors } from "../../../../services/handleErrorMessage";
import { 
    SaleStockistDetailInterface
} from "../../../../interfaces/sales/SaleStockistDetailInterface";
import { ProductInterface } from "../../../../interfaces/masters/ProductInterface";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { t } from "i18next";

export const useSaleStockistForm = () => {
    const [idPrint, setIdPrint] = useState<number>()
    const navigate = useNavigate()
    const { id } = useParams();
    const modalConfirm = modalConfirmState()
    const { SaleStockist, Product } = url

    const {
        reset,
        register,
        handleSubmit,
        control,
        setValue,
        getValues,
        watch,
        trigger,
        formState: { errors },
    } = useForm<SaleStockistInterface>({
        resolver: yupResolver(SaleStockistSchema().schema),
        defaultValues: {
            invoice: "Auto",
            date: moment().format('YYYY-MM-DD'),
            status: 'create'
        }
    });

    const {
        fields,
        append,
        remove
    } = useFieldArray({
        control,
        name: 'SaleStockistDetails'
    });

    useEffect(()=> {
        if(id){
            setIdPrint(parseInt(id));
            mutateById(parseInt(id))
        }
    }, []);

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:number) => getDataById(SaleStockist.getById, id),
        onSuccess:(data:ApiResponseUpdateSaleStockist)=>{
            if(data.status){
                const value = data.data.SaleStockist
                reset({
                    ...value,
                    date: moment(value.date).format('YYYY-MM-DD'),
                    shippingCost: value.shippingCost,
                    total: value.total,
                    pay: value.pay,
                    remainder: value.remainder
                });
            }
        },
        onError:(error:AxiosError)=> {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const { mutate } = useMutation({
        mutationFn: async (data:SaleStockistInterface)=> {
            return await postData(SaleStockist.post, data)
        },
        onSuccess: (data) => {
            setIdPrint(data.id)
            toast.success(`${t('SaleStockist')} berhasil disimpan`, {
                position: toast.POSITION.TOP_CENTER
            });
            reset({
                date: '',
                userId:undefined,
                warehouseId: undefined,
                total: 0,
                shippingCost: 0,
                pay: 0,
            })
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
            });
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const onSubmit: SubmitHandler<SaleStockistInterface> = async (data) => {
        const detail = data.SaleStockistDetails ?? []
        let totals=0;
        for (const v of detail) {
            totals+=((v.quantity??0)*(v.sellingPrice??0))
        }
        console.log({totals});
        
        mutate({
            ...data,
            total: totals
        })
    }

    const checkProduct = async (id:number) => {
        const data = await getDataById(Product.getPrice, id)
        return data.data.Product as ProductInterface
    }

    const handleOnchangeDetail = async (index:number, key: keyof SaleStockistDetailInterface, value: number) => {
        if(key==='productId'){
            const product = await checkProduct(value);
            setValue(`SaleStockistDetails.${index}.${key}`, value);
            setValue(`SaleStockistDetails.${index}.sellingPrice`, product.sellingPrice)
            setValue(`SaleStockistDetails.${index}.total`, product.sellingPrice)
        }
        if(key==="quantity"){
            setValue(`SaleStockistDetails.${index}.quantity`, value)
            trigger(`SaleStockistDetails`)
        }
    }

    const onPrint = (id?: number) => {
        if(id){
            navigate(`/SaleStockists/invoice/${id}`)
        }
    }

    return{
        reset,
        register,
        handleSubmit,
        control,
        setValue,
        getValues,
        watch,
        errors,
        modalConfirm,
        onSubmit,
        mutateById,
        fields,
        append,
        remove,
        handleOnchangeDetail,
        idPrint,
        onPrint,
    }
}