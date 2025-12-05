import { 
    useMutation,
    useQuery
} from "@tanstack/react-query"
import {
    deleteData,
    getData,
    getDataById,
    getUsersForSelection,
    postData
} from "../../models/settings/NotificationModel"
import { useEffect, useState } from "react"
import {
    ApiResponseNotification,
    ApiResponseUpdateNotification,
    ApiResponseUsers,
    NotificationFormInterface,
    UserSelectionInterface
} from "../../../interfaces/settings/NotificationInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { NotificationSchema } from "../../../schema/settings"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import usePaging from "../../../utils/usePaging"

const NotificationDummy: NotificationFormInterface = {
    title: '',
    body: '',
    type: '',
    screen: '',
    referenceId: '',
    metadata: '',
    userIds: []
}

export const useNotification = () => {
    const [ query, setQuery ] = useState({
        title: '', body: '', type: ''
    })
    const [ idDetail, setIdDetail ] = useState<string|null>()
    const [ selectedUserIds, setSelectedUserIds ] = useState<string[]>([])
    const [ searchUsers, setSearchUsers ] = useState('')
    const [ allUsers, setAllUsers ] = useState<UserSelectionInterface[]>([])
    
    const { Notification } = url
    const { modalForm, setModalForm } = ModalFormState()
    const { t } = useTranslation();
    const modalConfirm = modalConfirmState()
    const page = usePage();
    const User = useSelector((state:RootState)=> state.userReducer)
    const { queryParams } = usePaging();
    
    useEffect(()=> {
        setModalForm((state)=>({
            ...state,
            label: 'Form Notification'
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    } = useForm<NotificationFormInterface>({
        resolver: yupResolver(NotificationSchema().schema),
        defaultValues: {
            ...NotificationDummy
        }
    }); 

    useEffect(()=> {
        refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page.page])
    
    const {data:dataNotification, isFetching, refetch} = useQuery<ApiResponseNotification, AxiosError>({ 
        queryKey: ['Notification-query', query, User.storeId, queryParams], 
        networkMode: 'always',
        queryFn: async () => await getData(Notification.get, 
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

    // Fetch users for selection
    useQuery<ApiResponseUsers, AxiosError>({
        queryKey: ['Users-for-notification', searchUsers],
        networkMode: 'always',
        queryFn: async () => await getUsersForSelection(Notification.getUsers, { name: searchUsers }),
        onSuccess(data) {
            if (data?.data?.users) {
                setAllUsers(data.data.users)
            }
        },
        onError: (errors) => {
            toast.error(errors.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:string) => getDataById(Notification.getById, id),
        onSuccess:(data:ApiResponseUpdateNotification)=>{
            if(data.status){
                const notification = data.data.notification
                const userIds = notification?.recipients?.map(r => r.userId) || []
                reset({
                    id: notification.id,
                    title: notification.title || '',
                    body: notification.body,
                    type: notification.type || '',
                    screen: notification.screen || '',
                    referenceId: notification.referenceId || '',
                    metadata: notification.metadata ? JSON.stringify(notification.metadata) : '',
                    userIds: userIds
                })
                setSelectedUserIds(userIds)
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
        mutationFn: (data:NotificationFormInterface)=> postData(Notification.post, data),
        onSuccess: () => {
            setModalForm((state)=>({
                ...state,
                visible: false
            }))
            refetch()
            reset({
                ...NotificationDummy
            })
            setSelectedUserIds([])
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
        mutationFn: (id:string) => deleteData(Notification.delete, id),
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

    const onSubmit: SubmitHandler<NotificationFormInterface> = (data) => {
        mutate({
            ...data,
            userIds: selectedUserIds
        })
    }

    const onDelete = (id: string) => {
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

    const onUpdate = (id:string) => {
        mutateById(id)
    }

    const onCancel = () => {
        setModalForm((state)=>({
            ...state,
            visible: false
        }))
        reset(NotificationDummy)
        setIdDetail(null)
        setSelectedUserIds([])
    }

    const onDetail = async (id:string) => {
        setIdDetail(id)
        mutateById(id)
    }

    const onFilter: SubmitHandler<NotificationFormInterface> = (data) => {
        setQuery((state)=>({
            ...state,
            title: data.title || ''
        }));
    }

    const onUserSelect = (userId: string) => {
        setSelectedUserIds(prev => {
            if (prev.includes(userId)) {
                return prev.filter(id => id !== userId)
            } else {
                return [...prev, userId]
            }
        })
    }

    const onSelectAll = () => {
        if (selectedUserIds.length === allUsers.length) {
            setSelectedUserIds([])
        } else {
            setSelectedUserIds(allUsers.map(u => u.id))
        }
    }

    // Sync selectedUserIds with form's userIds field
    useEffect(() => {
        setValue('userIds', selectedUserIds)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedUserIds])

    return {
        dataNotification: dataNotification?.data,
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
        onFilter,
        setValue,
        getValues,
        watch,
        users: allUsers,
        selectedUserIds,
        onUserSelect,
        onSelectAll,
        searchUsers,
        setSearchUsers,
    }
}
