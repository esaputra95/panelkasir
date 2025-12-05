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
} from "../../models/settings/UserManagementModel"
import { useEffect, useState } from "react"
import {
    ApiResponseUserManagement,
    ApiResponseUpdateUserManagement,
    UserManagementInterface
} from "../../../interfaces/settings/UserManagementInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { UserManagementSchema } from "../../../schema/settings"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { OptionSelectInterface } from "../../../interfaces/globalInterface"
import { UserManagementDummy } from "../../../utils/dummy/setting"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import usePaging from "../../../utils/usePaging"

export const useUserManagement = () => {
    const [ query, setQuery ] = useState({
        name: '', email:'', phone:'', address: '', role:''
    })
    const [ idDetail, setIdDetail ] = useState<number|null>()
    const [ dataOptionUserManagement, setDataOptionUserManagement] = useState<OptionSelectInterface[]>([{value:'', label:''}])
    const { UserManagement } = url
    const { modalForm, setModalForm } = ModalFormState()
    const { t } = useTranslation();
    const modalConfirm = modalConfirmState()
    const page = usePage();
    const User = useSelector((state:RootState)=> state.userReducer)
    const { queryParams } = usePaging();
    
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
    } = useForm<UserManagementInterface>({
        resolver: yupResolver(UserManagementSchema().schema),
        defaultValues: {
            ...UserManagementDummy
        }
    });

    const {
        register:registerFilter,
        handleSubmit:handleSubmitFilter,
    } = useForm<UserManagementInterface>()

    useEffect(()=> {
        refetch()
    }, [page.page])
    
    const {data:dataUserManagement, isFetching, refetch} = useQuery<ApiResponseUserManagement, AxiosError>({ 
        queryKey: ['UserManagement-query', query, User.storeId, queryParams], 
        networkMode: 'always',
        queryFn: async () => await getData(UserManagement.get, 
            {
                ...query,
                page: page.page,
                limit: page.limit,
                storeId: User.storeId,
                ...queryParams
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

    const optionUserManagement = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(UserManagement.getSelect, {name: data});
        if(response.status){
            setDataOptionUserManagement(response.data.UserManagement);
            return response.data.UserManagement
        }
        return [{value:'', label:''}]
    }

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:number) => getDataById(UserManagement.getById, id),
        onSuccess:(data:ApiResponseUpdateUserManagement)=>{
            if(data.status){
                reset({
                    ...data.data.UserManagement,
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
        mutationFn: (data:UserManagementInterface)=> postData(UserManagement.post, data),
        onSuccess: () => {
            setModalForm((state)=>({
                ...state,
                visible: false
            }))
            refetch()
            reset({
                ...UserManagementDummy
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
        mutationFn: (id:number) => deleteData(UserManagement.delete, id),
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

    const onSubmit: SubmitHandler<UserManagementInterface> = (data) => {
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
        reset(UserManagementDummy)
        setIdDetail(null)
    }

    const onDetail = async (id:number) => {
        setIdDetail(id)
        mutateById(id)
    }

    const onFilter: SubmitHandler<UserManagementInterface> = (data) => {
        setQuery((state)=>({
            ...state,
            name: data.name
        }));
    }

    return {
        dataUserManagement,
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
        optionUserManagement,
        dataOptionUserManagement,
        onFilter,
        registerFilter,
        handleSubmitFilter,
        setValue,
        getValues,
        watch,
    }
}