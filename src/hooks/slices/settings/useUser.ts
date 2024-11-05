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

export const useUser = () => {
    const [ query, setQuery ] = useState({
        name: '', email:'', phone:'', address: '', role:''
    })
    const [ idDetail, setIdDetail ] = useState<number|null>()
    const [ dataOptionUser, setDataOptionUser] = useState<OptionSelectInterface[]>([{value:'', label:''}])
    const [ dataOptionStockist, setDataOptionStockist] = useState<OptionSelectInterface[]>([{value:'', label:''}])
    const { User } = url
    const { modalForm, setModalForm } = ModalFormState()
    const { t } = useTranslation();
    const modalConfirm = modalConfirmState()
    const page = usePage();
    const user = useSelector((state:RootState)=> state.userReducer)
    
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

    const {
        register:registerFilter,
        handleSubmit:handleSubmitFilter,
    } = useForm<UserInterface>()

    useEffect(()=> {
        refetch()
    }, [page.page])
    
    const {data:dataUser, isFetching, refetch} = useQuery<ApiResponseUser, AxiosError>({ 
        queryKey: ['user-query', query, user.storeId], 
        networkMode: 'always',
        queryFn: async () => await getData(User.get, 
            {
                ...query,
                page: page.page,
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
        const response = await getDataSelect(User.getSelect, {name: data});
        if(response.status){
            setDataOptionUser(response.data.user);
            return response.data.user
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

    const onFilter: SubmitHandler<UserInterface> = (data) => {
        setQuery((state)=>({
            ...state,
            name: data.name
        }));
    }

    return {
        dataUser,
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
        optionUser,
        dataOptionUser,
        onFilter,
        registerFilter,
        handleSubmitFilter,
        setValue,
        getValues,
        watch,
        optionStockist,
        dataOptionStockist
    }
}