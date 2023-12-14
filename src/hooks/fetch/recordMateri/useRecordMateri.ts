import {  useMutation, useQuery } from "@tanstack/react-query"
import {
    deleteData,
    getData,
    getDataById,
    getDataSelect,
    getStudyGroup,
    postData
} from "../../models/recordMateri/recordMateriModel"
import { 
    ChangeEvent,
    useEffect,
    useState
} from "react"
import { 
    ApiResponseRecordMateri,
    ApiResponseUpdateRecordMateri,
    RecordMateriFormInterface,
    RecordMateriInterface
} from "../../../interfaces/recordMateri/RecordMateriInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { RecordMateriSchema } from "../../../schema/recordMateri"
import { AxiosError } from "axios"
import { modalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import { RecordMateriDummy } from '../../../utils/dummy/recordMaterDummy'
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { OptionSelectInterface } from "../../../interfaces/globalInterface"
import { OptionDummy } from "../../../utils/dummy/setting"
import useAccess from "../../../utils/useAccess"

export const useRecordMateri = () => {
    const [ query, setQuery ] = useState<RecordMateriInterface>()
    const [ idDetail, setIdDetail ] = useState<string | null>()
    const [ dataOptionRecordMateri, setDataOptionRecordMateri] = useState<OptionSelectInterface[]>([OptionDummy])
    const { RecordMateri } = url
    const { modalForm, setModalForm } = modalFormState()
    const { t } = useTranslation();
    const modalConfirm = modalConfirmState()
    const page = usePage();
    const {token} = useAccess() 
    
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
        setValue,
        getValues,
        control,
        formState: { errors },
    } = useForm<RecordMateriFormInterface>({
        resolver: yupResolver(RecordMateriSchema().schema),
        defaultValues: RecordMateriDummy
    })

    useEffect(()=> {
        refetch()
    }, [page.page])
      
    const {data:dataRecordMateri, isFetching, refetch} = useQuery<ApiResponseRecordMateri, AxiosError>({ 
        queryKey: ['class-master'], 
        networkMode: 'always',
        queryFn: async () => await getData(RecordMateri.get, 
            {
                ...query, 
                page:page.page,
                limit: page.limit
            }
        ),
        onSuccess(data) {
            page.setTotal(Math.ceil((data?.data?.info?.total  ?? 1)/(data?.data?.info?.limit ?? page.limit)));
        },
        onError: (errors) => {
            toast.error(errors.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const optionRecordMateri = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(RecordMateri.getSelect, {name: data});
        setDataOptionRecordMateri(response.data.class);
        return response.data.class
    }

    const optionStudyGroup = async (data: string) => {
        const response = await getStudyGroup(RecordMateri.getStudyGroup, {name: data, tentorId: token?.id ?? ''});
        setDataOptionRecordMateri(response.data.studyGroup);
        return response.data.studyGroup
    }

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:string) => getDataById(RecordMateri.getById, id),
        onSuccess:(data:ApiResponseUpdateRecordMateri)=>{
            if(data.status){
                reset(data.data.recordMateri)
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
        mutationFn: (data:RecordMateriInterface)=> postData(RecordMateri.post, data),
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
            
        },
        onError: async (errors) => {
            const err = errors as AxiosError<DataMessageError>
            let message = `${errors}`
            if(err.response?.status === 400){
                message = await handleMessageErrors(err.response?.data?.errors)
            }
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const {mutate:mutateDelete} = useMutation({
        mutationFn: (id:string) => deleteData(RecordMateri.delete, id),
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
        onError:(error) => {
            const err = error as AxiosError
            toast.success(`${err}`, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const onSubmit: SubmitHandler<RecordMateriFormInterface> = (data) => {
        mutate({
            ...data,
            studentId: "",
            materiId: ""
        })
        
    }

    const onDelete = (id: string) => {
        modalConfirm.setModalConfirm((state)=>({
            ...state,
            title: state.title,
            message: state.message,
            confirmLabel: state.confirmLabel,
            cancelLabel: state.cancelLabel,
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
        reset({
            ...RecordMateriDummy
        })
        setIdDetail(null)
    }

    const onDetail = async (id:string) => {
        setIdDetail(id)
        mutateById(id)
    }

    const handelOnChangeForm = (event:ChangeEvent<HTMLInputElement>) => {
        setValue(
            event.target.name as keyof RecordMateriFormInterface, 
            event.target.value
        )
        if(event.target.name==="date"){
            getStudents()
        }
    }

    const getStudents = () => {
        // getStudyGroup(
        //     RecordMateri.getStudyGroup,
        //     {
        //         tentorId: token?.id ?? '',
        //         date: getValues('date'),
        //         groupId: ''
        //     }
        // )
    }

    return {
        dataRecordMateri,
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
        optionRecordMateri,
        dataOptionRecordMateri,
        handelOnChangeForm,
        optionStudyGroup
    }
}