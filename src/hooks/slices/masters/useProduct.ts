import {  useMutation, useQuery } from "@tanstack/react-query"
import {
    deleteData,
    getData,
    getDataById,
    getDataSelect,
    postData
} from "../../models/masters/ProductModel"
import { useEffect, useState } from "react"
import {
    ApiResponseProduct,
    ApiResponseUpdateProduct,
    ProductInterface,
    SettingPackageInterface,
    SettingPointInterface,
} from "../../../interfaces/masters/ProductInterface"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import ProductSchema from "../../../schema/masters/productSchema"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { OptionSelectInterface } from "../../../interfaces/globalInterface"
import { ProductDummy } from "../../../utils/dummy/master"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

export const useProduct = () => {
    const [ query, setQuery ] = useState({name: ''})
    const [ idDetail, setIdDetail ] = useState<number|null>()
    const [ dataOptionProduct, setDataOptionProduct] = useState<OptionSelectInterface[]>([{value:'', label:''}])
    const user = useSelector((state:RootState)=>state.userReducer)
    const { Product } = url
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
        watch,
        formState: { errors },
    } = useForm<ProductInterface>({
        resolver: yupResolver(ProductSchema().schema)
    });

    const {
        fields: fieldSettingPoints,
        append: appendSettingPoints,
        remove: removeSettingPoints,
    } = useFieldArray({
        control,
        name: 'settingPoints'
    })

    const {
        fields: fieldSettingPackages,
        append: appendSettingPackages,
        remove: removeSettingPackages,
    } = useFieldArray({
        control,
        name: 'settingPackages'
    })

    const {
        register:registerFilter,
        handleSubmit:handleSubmitFilter,
    } = useForm<ProductInterface>()

    useEffect(()=> {
        refetch()
    }, [page.page])
    
    const {data:dataProduct, isFetching, refetch} = useQuery<ApiResponseProduct, AxiosError>({ 
        queryKey: ['get-Product', query, user.storeId], 
        networkMode: 'always',
        queryFn: async () => await getData(Product.get, 
            {
                ...query, 
                page:page.page,
                limit: page.limit,
                storeId: user.storeId
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

    const optionProduct = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(Product.getSelect, {name: data});
        if(response.status){
            setDataOptionProduct(response.data.product);
            return response.data.product
        }
        return [{value:'', label:''}]
    }

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:number) => getDataById(Product.getById, id),
        onSuccess:(data:ApiResponseUpdateProduct)=>{
            if(data.status){
                const value = data.data.product
                const packages = value.productPackages ?? [];
                let settingPackages:SettingPackageInterface[]=[]
                for (const v of packages) {
                    settingPackages=[...settingPackages, 
                        {
                            id: v.id,
                            quantity: v.quantity ?? 0,
                            productId: v.productPackageId
                        }
                    ]
                }

                const points = value.productPoints ?? [];
                let settingPoints: SettingPointInterface[]=[]
                for (const v of points) {
                    settingPoints=[ ...settingPoints, 
                        {
                            id: v.id,
                            value: v.value,
                            agenTypeId: v.agenTypeId
                        }
                    ]
                }
                reset({
                    id: value.id,
                    name: value.name,
                    code: value.code,
                    productCategoryId: value.productCategoryId,
                    productCategoryOption: {
                        value: value?.productCategoryId+'',
                        label: value.categories?.name
                    },
                    purchasePrice: value.purchasePrice,
                    sellingPrice: value.sellingPrice,
                    type: value.type,
                    description: value.description,
                    settingPackages: settingPackages,
                    settingPoints: settingPoints
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

    const { mutate, isLoading:loading } = useMutation({
        mutationFn: async (data:ProductInterface)=> {
            return await postData(Product.post, data)
        },
        onSuccess: () => {
            setModalForm((state)=>({
                ...state,
                visible: false
            }))
            refetch()
            reset(ProductDummy)
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
        mutationFn: (id:number) => deleteData(Product.delete, id),
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

    const onSubmit: SubmitHandler<ProductInterface> = async (data) => {
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
        reset(ProductDummy)
        setIdDetail(null)
    }

    const onDetail = async (id:number) => {
        setIdDetail(id)
        mutateById(id)
    }

    const onFilter: SubmitHandler<ProductInterface> = (data) => {
        setQuery((state)=>({
            ...state,
            name: data.name
        }));
    }

    const handleOnChange = (key:keyof ProductInterface, data?: OptionSelectInterface ) => {
        setValue(key, parseInt(data?.value+''))
    }

    return {
        dataProduct,
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
        optionProduct,
        dataOptionProduct,
        onFilter,
        registerFilter,
        handleSubmitFilter,
        setValue,
        getValues,
        watch,
        handleOnChange,
        fieldSettingPoints,
        appendSettingPoints,
        removeSettingPoints,
        fieldSettingPackages,
        appendSettingPackages,
        removeSettingPackages,
    }
}