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
} from "../../models/settings/UserModel"
import { useEffect, useState } from "react"
import {
    ApiResponseUser,
    ApiResponseUpdateUser,
    UserInterface
} from "../../../interfaces/settings/UserInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { UserSchema } from "../../../schema/settings"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { OptionSelectInterface } from "../../../interfaces/globalInterface"
import { UserDummy } from "../../../utils/dummy/setting"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { useSearchParams } from "react-router-dom"

export const useUser = () => {
    const [searchParams] = useSearchParams()
    const [ idDetail, setIdDetail ] = useState<number|null>()
    const [ dataOptionUser, setDataOptionUser] = useState<OptionSelectInterface[]>([{value:'', label:''}])
    const [ dataOptionStockist, setDataOptionStockist] = useState<OptionSelectInterface[]>([{value:'', label:''}])
    const { User } = url
    const { modalForm, setModalForm } = ModalFormState()
    const { t } = useTranslation();
    const modalConfirm = modalConfirmState()
    const page = usePage();
    const user = useSelector((state:RootState)=> state.userReducer)
    
    // Read filters from URL params
    const query = {
        name: searchParams.get('name') || '',
        email: searchParams.get('email') || '',
        phone: searchParams.get('phone') || '',
        level: searchParams.get('level') || '',
        verified: searchParams.get('verified') || '',
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
        watch,
        formState: { errors },
    } = useForm<UserInterface>({
        resolver: yupResolver(UserSchema().schema),
        defaultValues: {
            ...UserDummy
        }
    });

    useEffect(()=> {
        refetch()
    }, [currentPage, query.name, query.email, query.phone, query.level, query.verified, query.sortby, query.sort])
    
    const {data:dataUser, isFetching, refetch} = useQuery<ApiResponseUser, AxiosError>({ 
        queryKey: ['user-query', query, user.storeId, currentPage], 
        networkMode: 'always',
        queryFn: async () => await getData(User.get, 
            {
                ...query,
                page: currentPage,
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

    const optionUser = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getData(User.get, {name: data, level: 'owner'});
        if(response.status){
            const option = response.data.user.map((item:UserInterface)=>({
                value: item.id,
                label: item.name + ' - ' + item.email
            }))
            setDataOptionUser(option);
            return option
        }
        return [{value:'', label:''}]
    }
    
    const optionStockist = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(User.getStockistSelect, {name: data});
        if(response.status){
            setDataOptionStockist(response.data.user);
            return response.data.user
        }
        return [{value:'', label:''}]
    }

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:number) => getDataById(User.getById, id),
        onSuccess:(data:ApiResponseUpdateUser)=>{
            if(data.status){
                reset({
                    ...data.data.user,
                    password: ''
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
        mutationFn: (data:UserInterface)=> postData(User.post, data),
        onSuccess: () => {
            setModalForm((state)=>({
                ...state,
                visible: false
            }))
            refetch()
            reset({
                ...UserDummy
            })
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
        mutationFn: (id:number) => deleteData(User.delete, id),
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

    const onSubmit: SubmitHandler<UserInterface> = (data) => {
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
        reset(UserDummy)
        setIdDetail(null)
    }

    const onDetail = async (id:number) => {
        setIdDetail(id)
        mutateById(id)
    }

    return {
        dataUser,
        isFetching,
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
        optionUser,
        dataOptionUser,
        setValue,
        getValues,
        watch,
        optionStockist,
        dataOptionStockist
    }
}