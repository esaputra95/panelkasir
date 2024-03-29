import {  useMutation, useQuery } from "@tanstack/react-query"
import {
    deleteData,
    getData,
    getDataById,
    getDataSelect,
    getListStudent,
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
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { RecordMateriSchema } from "../../../schema/recordMateri"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../utils/modalFormState"
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
import moment from "moment"


export const useRecordMateri = () => {
    const [ updateStatus, setUpdateStatus ] = useState<boolean>(false)
    const [ query, setQuery ] = useState<RecordMateriInterface>({studentId: '', materiId:''})
    const [ idDetail, setIdDetail ] = useState<string | null>()
    const [ dataOptionRecordMateri, setDataOptionRecordMateri] = useState<OptionSelectInterface[]>([OptionDummy])
    const [ dataOptionStudyGroup, setDataOptionStudyGroup] = useState<OptionSelectInterface[]>([OptionDummy])
    const { RecordMateri } = url
    const { modalForm, setModalForm } = ModalFormState()
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

    const {
        fields:fieldDetails
    } = useFieldArray({
        control,
        name: 'detail'
    })

    useEffect(()=> {
        setValue('tentorId', token?.id)
    }, [token])

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
            setUpdateStatus(false)
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
        const response = await getStudyGroup(
            RecordMateri.getStudyGroup, 
            {
                name: data, tentorId: getValues('tentorId') ?? ''
            }
        );

        setDataOptionStudyGroup(response);
        return response
    }

    const { mutate:mutateById } = useMutation({
        networkMode: 'always',
        mutationFn: (id:string) => {
            return getDataById(RecordMateri.getById, id)
        },
        onSuccess:(data:ApiResponseUpdateRecordMateri)=>{
            if(data.status){
                const recordMateri = data.data.recordMateri
                reset({
                    id: recordMateri.id,
                    date: moment(recordMateri.date).format('YYYY-MM-DD'),
                    date2: moment(recordMateri.date).format('YYYY-MM-DD'),
                    studyGroupId: recordMateri.scheduleDetails?.schedules.studyGroupId,
                    tentorId: recordMateri.tentorId,
                    detail: [
                        {
                            studentId: recordMateri.studentId,
                            description: recordMateri.description,
                            advice: recordMateri.advice,
                            materiId: recordMateri.materiId
                        }
                    ]
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
        mutationFn: (data:RecordMateriInterface)=> postData(RecordMateri.post, data),
        onSuccess: () => {
            setModalForm((state)=>({
                ...state,
                visible: false
            }))
            reset({
                date: '',
                date2: '',
                tentor: OptionDummy,
                detail: [],
                tentorId: '',
            })
            refetch()

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
        mutationFn: (id:string) => {
            return deleteData(RecordMateri.delete, id)
        },
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
        setUpdateStatus(true)
        mutateById(id)
    }

    const onCancel = () => {
        setUpdateStatus(false)
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
    }

    const getListStudents = async (date?:string|undefined, tentorId?:string|undefined, date2?: string|undefined) => {
        const data = await getListStudent(RecordMateri.getListStudent, {
            tentorId: tentorId??'',
            date: date??'',
            date2: date2??''
        });
        const list = data.data?.listStudent ?? []
        
        let listStudent:RecordMateriInterface[]=[]
        for (let index = 0; index < list.length; index++) {
            listStudent=[
                ...listStudent,
                {
                    studentId: list[index].studentId,
                    materiId: list[index].materiId,
                    scheduleDetailId: list[index].id
                }
            ]
        }
        setValue('detail', listStudent)
    }

    const handleOnChangeStudents = async (data:string) => {
        setQuery(prevState => ({
            ...prevState,
            studentId: data
        }));
    }

    const handleOnSearchStudent = ()=> {
        refetch()
    }

    return {
        dataRecordMateri,
        isFetching,
        setQuery,
        onSubmit,
        getValues,
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
        optionStudyGroup,
        getListStudents,
        fieldDetails,
        handleOnChangeStudents,
        handleOnSearchStudent,
        dataOptionStudyGroup,
        updateStatus
    }
}