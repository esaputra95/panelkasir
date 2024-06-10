import {  useMutation, useQuery } from "@tanstack/react-query"
import {
    deleteData,
    getData,
    getDataById,
    getDataSelect,
    postData,
    uploadImage
} from "../../models/donations/DonationModel"
import { ChangeEvent, useEffect, useState } from "react"
import {
    ApiResponseDonation,
    ApiResponseUpdateDonation,
    DonationInterface
} from "../../../interfaces/donations/DonationInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { DonationSchema } from "../../../schema/donations"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { OptionSelectInterface } from "../../../interfaces/globalInterface"
import { DonationDummy } from "../../../utils/dummy/donation"

export const useDonation = () => {
    const [loading, setLoading] = useState(false)
    const [ query, setQuery ] = useState({name: ''})
    const [ image, setImage ] = useState<string|undefined>(undefined)
    const [ imageUpload, setImageUpload ] = useState<Blob|undefined>(undefined)
    const [ idDetail, setIdDetail ] = useState<number|null>()
    const [ dataOptionDonation, setDataOptionDonation] = useState<OptionSelectInterface[]>([{value:'', label:''}])
    const { Donation } = url
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
    } = useForm<DonationInterface>({
        resolver: yupResolver(DonationSchema().schema)
    });

    const {
        register:registerFilter,
        handleSubmit:handleSubmitFilter,
    } = useForm<DonationInterface>()

    useEffect(()=> {
        refetch()
    }, [page.page])
    
    const {data:dataDonation, isFetching, refetch} = useQuery<ApiResponseDonation, AxiosError>({ 
        queryKey: ['get-donation', query], 
        networkMode: 'always',
        queryFn: async () => await getData(Donation.get, 
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

    const optionDonation = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(Donation.getSelect, {name: data});
        if(response.status){
            setDataOptionDonation(response.data.class);
            return response.data.class
        }
        return [{value:'', label:''}]
    }

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:number) => getDataById(Donation.getById, id),
        onSuccess:(data:ApiResponseUpdateDonation)=>{
            if(data.status){
                const value = data.data.Donations
                reset({
                    id: value.id,
                    name: value.name,
                    target: value.target,
                    status: value.status,
                    publish: value.publish,
                    place_type: value.place_type,
                    category_id: value.category_id,
                    categoryOption: {
                        value: value.category?.id,
                        label: value.category?.name
                    },
                    place_id: value.place_id,
                    placeOption: {
                        value: value.place?.id,
                        label: value.place?.name
                    },
                    text: value.text,
                    image: value.image
                });
                setImage(value.image)
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
        mutationFn: async (data:DonationInterface)=> {
            return await postData(Donation.post, data)
        },
        onSuccess: () => {
            setModalForm((state)=>({
                ...state,
                visible: false
            }))
            setLoading(false);
            refetch()
            reset(DonationDummy)
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
        mutationFn: (id:number) => deleteData(Donation.delete, id),
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

    const onSubmit: SubmitHandler<DonationInterface> = async (data) => {
        setLoading(true)
        let upload:string='';
        let newData={
            ...data
        }
        if(image !== data.image){
            upload = await uploadImage(Donation.image, imageUpload);
            newData={
                ...newData,
                image: upload
            }
        }else{
            delete newData.image;
        }
        mutate(newData)
        
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
        reset(DonationDummy)
        setImage('')
        setIdDetail(null)
    }

    const onDetail = async (id:number) => {
        setIdDetail(id)
        mutateById(id)
    }

    const onFilter: SubmitHandler<DonationInterface> = (data) => {
        setQuery((state)=>({
            ...state,
            name: data.name
        }));
    }

    const handleOnChange = (key:keyof DonationInterface, keyOption:keyof DonationInterface, data?: OptionSelectInterface ) => {
        setValue(key, parseInt(data?.value+''))
        setValue(keyOption, data)
    }

    const handleOnChangeImage = (e:ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageUpload(file)
            setImage(URL.createObjectURL(file));
        }
    }

    return {
        dataDonation,
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
        optionDonation,
        dataOptionDonation,
        onFilter,
        registerFilter,
        handleSubmitFilter,
        setValue,
        getValues,
        handleOnChangeImage,
        image,
        setImage,
        handleOnChange,
    }
}