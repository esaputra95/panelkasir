import { useMutation, useQuery } from "@tanstack/react-query"
import {
    deleteData,
    getData,
    getDataById,
    getDataSelect,
    postData
} from "../../models/masters/MosqueModel"
import { ChangeEvent, useEffect, useState } from "react"
import { 
    ApiResponseMosque, 
    ApiResponseUpdateMosque,
    MosqueInterface
} from "../../../interfaces/masters/MosqueInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { MosqueSchema } from "../../../schema/masters"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { OptionSelectInterface } from "../../../interfaces/globalInterface"
import { MosqueDummy } from "../../../utils/dummy/master"
import { uploadImage } from "../../models/articles/ArticleModel"

export const useMosque = () => {
    const [loading, setLoading] = useState(false)
    const [ query, setQuery ] = useState({
        name: ''
    })
    const [ imageUpload, setImageUpload ] = useState<Blob|undefined>(undefined)
    const [ idDetail, setIdDetail ] = useState<number|null>()
    const [ dataOptionMosque, setDataOptionMosque] = useState<OptionSelectInterface[]>([{value:'', label:''}])
    const { Mosque } = url
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
    } = useForm<MosqueInterface>({
        resolver: yupResolver(MosqueSchema().schema)
    });

    const {
        register:registerFilter,
        handleSubmit:handleSubmitFilter,
    } = useForm<MosqueInterface>()

    useEffect(()=> {
        refetch()
    }, [page.page])
    
    const {data:dataMosque, isFetching, refetch} = useQuery<ApiResponseMosque, AxiosError>({ 
        queryKey: ['class-master', query], 
        networkMode: 'always',
        queryFn: async () => await getData(Mosque.get, 
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

    const optionMosque = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(Mosque.getSelect, {name: data});
        if(response.status){
            setDataOptionMosque(response.data.Mosque);
            return response.data.Mosque
        }
        return [{value:'', label:''}]
    }

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:number) => getDataById(Mosque.getById, id),
        onSuccess:(data:ApiResponseUpdateMosque)=>{
            const mosque = data.data.Mosques;
            if(data.status){
                reset({
                    id: mosque.id,
                    name: mosque.name,
                    province: mosque.province,
                    provinceOption: {
                        value: mosque.provinces?.id,
                        label: mosque.provinces?.province_name
                    },
                    city: mosque.city,
                    cityOption: {
                        value: mosque.cities?.id,
                        label: mosque.cities?.city_name
                    },
                    district: mosque.district,
                    districtOption: {
                        value : mosque.districts?.id,
                        label: mosque.districts?.district_name
                    },
                    address: mosque.address,
                    bankAccount: mosque.bankAccount,
                    phone: mosque.phone
                })
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
        mutationFn: (data:MosqueInterface)=> postData(Mosque.post, data),
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
            setLoading(false)
        },
        onError: async (errors) => {
            const err = errors as AxiosError<DataMessageError>
            let message = `${errors}`
            if(err.response?.status === 400){
                message = await handleMessageErrors(err.response?.data?.errors)
            }
            setLoading(false)
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
        mutationFn: (id:number) => deleteData(Mosque.delete, id),
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

    const onSubmit: SubmitHandler<MosqueInterface> = async (data) => {
        setLoading(true)
        let upload:string='';
        if(imageUpload){
            upload = await uploadImage(Mosque.image, imageUpload);
        }
        mutate({
            ...data,
            image: upload ?? data.image
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
        reset(MosqueDummy)
        setIdDetail(null)
    }

    const onDetail = async (id:number) => {
        setIdDetail(id)
        mutateById(id)
    }

    const onFilter: SubmitHandler<MosqueInterface> = (data) => {
        setQuery((state)=>({
            ...state,
            name: data.name
        }));
    }

    const handleOnChangeSelect = (key: keyof MosqueInterface, value: OptionSelectInterface) => {
        setValue(key, value.value)
    }

    const handleOnChangeImage = (e:ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageUpload(file)
        }
    }

    return {
        dataMosque,
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
        optionMosque,
        dataOptionMosque,
        onFilter,
        registerFilter,
        handleSubmitFilter,
        setValue,
        getValues,
        watch,
        handleOnChangeSelect,
        handleOnChangeImage,
        loading
    }
}