import {  useMutation, useQuery } from "@tanstack/react-query"
import {
    cancelSession,
    checkSession,
    deleteData,
    getData,
    getDataById,
    getDataSelect,
    postData
} from "../../models/schedule/scheduleModel"
import {
    getDataById as getDataByIdGroup
} from "../../models/schedule/studyGroupModel"
import {
    getDataById as getStudyGroup
} from '../../models/schedule/studyGroupModel'
import { useEffect, useState } from "react"
import {
    ApiResponseSession,
    ApiResponseUpdateSession,
    StudentGroupQueryInterface,
    SessionInputForm,
    TimeForm,
    typeEnum
} from "../../../interfaces/schedule/sessionInterface"
import { 
    SubmitHandler,
    useFieldArray, 
    useForm
} from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { SessionSchema } from "../../../schema/schedule"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { 
    ApiResponseUpdateStudyGroup,
    StudyGroupInputForm
} from "../../../interfaces/schedule/studyGroupInterface"
import { SessionDummy } from "../../../utils/dummy/scheduleDummy"
import moment from "moment"
import { useSearchParams } from "react-router-dom"
import { getDataSelectSchedule } from "../../models/master/materialModel"
import { OptionSelectInterface } from "../../../interfaces/globalInterface"
import { OptionDummy } from "../../../utils/dummy/setting"

export const useSession = () => {
    const [ query, setQuery ] = useState<StudentGroupQueryInterface>()
    const [ idDetail, setIdDetail ] = useState<string | null>()
    const [ dataOptionTutor, setDataOptionTutor] = useState<OptionSelectInterface[]>([OptionDummy])
    const [ updateStatus, setUpdateState] = useState<boolean>(false)
    const [ , setRerender ] = useState(0)
    const { SessionSchedule, StudyGroup, Tutor } = url
    const { modalForm, setModalForm } = ModalFormState()
    const { t } = useTranslation();
    const modalConfirm = modalConfirmState()
    const page = usePage();
    const [queryUrl] = useSearchParams()
    
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
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<SessionInputForm>({
        resolver: yupResolver(SessionSchema().schema),
        defaultValues: SessionDummy
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "scheduleDetails"
    });

    const {
        fields:fieldDate,
        append: appendDate,
        remove: removeDate
    } = useFieldArray({
        control,
        name: 'time'
    });

    const {
        append: appendIdDeleteSessionDetail
    }= useFieldArray({
        control,
        name: 'idDeleteSessionDetails'
    })

    useEffect(()=> {
        refetch()
    }, [page.page])
    
    const {data:dataSession, isFetching, refetch} = 
    useQuery<ApiResponseSession, AxiosError>({ 
        queryKey: ['schedule'], 
        networkMode: 'always',
        refetchOnWindowFocus: false,
        queryFn: async () => await getData(SessionSchedule.get, 
            {
                ...query, 
                page:page.page,
                limit: page.limit,
                studyGroupId: queryUrl.get('id') ?? ''
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

    useEffect(()=> {
        setValue('schedule.studyGroupId', queryUrl.get('id')??'')
        checkSessions(queryUrl.get('id')??'')
    }, [])

    const {data:dataGroup, refetch:refetchForm} = useQuery({
        queryKey: ['group'],
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const data:ApiResponseUpdateStudyGroup = await getDataByIdGroup(StudyGroup.getById, queryUrl.get('id')??'')
            return data.data
        },
        onSuccess: (data:StudyGroupInputForm)=> {
            console.log('sampai sini');
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let detail:any=[]
            for (let index = 0; index < data.studyGroup.total; index++) {
                detail=[...detail,
                    {
                        date: '',
                        courseId : 'OptionDummy',
                        tentorId: '',
                        roomId: '',
                        type: typeEnum.study
                    }
                ]
            }
            setValue('time', detail)
        }
    })

    const optionSession = async (data:string) => {
        const response = await getDataSelect(SessionSchedule.getSelect, {name: data});
        if(response.status){
            return response.data.Session
        }
    }

    const optionTutorSchedule = async (name: string, index:number): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelectSchedule(Tutor.getSelectSchedule, {
            courseId: getValues(`time.${index}.courseId`),
            name: name,
            date: getValues(`time.${index}.date`)
        });
        if(response.status){
            setDataOptionTutor(response.data.tutor)
            return response.data.tutor
        }
        return [OptionDummy];
    }

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:string) => getDataById(SessionSchedule.getById, id),
        onSuccess:(data:ApiResponseUpdateSession)=>{
            if(data.status){
                const dataSession = {
                    schedule: data.data.schedule,
                    scheduleDetails: [
                        ...data.data.scheduleDetails
                    ],
                    time: [
                        {
                            date: moment(data.data.schedule.date).tz('Asia/Jakarta').format('YYYY-MM-DDTHH:mm'),
                            courseId : data.data.schedule.courseId,
                            tentorId: data.data.schedule.tentorId,
                            roomId: data.data.schedule.roomId,
                            type: typeEnum.study
                        }
                    ]
                }
                
                reset(dataSession)
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
        mutationFn: (data:SessionInputForm)=> postData(SessionSchedule.post, data),
        onSuccess: async (data) => {
            if(data.status){
                setModalForm((state)=>({
                    ...state,
                    visible: false
                }))
                refetch()
                reset(SessionDummy)
                toast.success(t("success-save"), {
                    position: toast.POSITION.TOP_CENTER
                });
            }else{
                const message = await handleMessageErrors(data.response.data.errors)
                toast.error(message, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
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
        mutationFn: (id:string) => deleteData(SessionSchedule.delete, id),
        onSuccess: () => {
            refetch()
            toast.success(t("success-delete"), {
                position: toast.POSITION.TOP_CENTER
            });
            modalConfirm.setModalConfirm({
                ...modalConfirm.modalConfirm,
                loading: false,
                visible: false
            })
        },
        onError:(error) => {
            modalConfirm.setModalConfirm({
                ...modalConfirm.modalConfirm,
                loading: false,
                visible: false
            })
            const err = error as AxiosError<DataMessageError>
            toast.error(`${err.response?.data?.errors[0].msg}`, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const onSubmit: SubmitHandler<SessionInputForm> = async (data) => {
        const check = await checkOverlap(data.time);
        if(check.status){
            setError(`time.${check.index??0}.date`, {
                message: 'Jadwal ini bentrok'
            })
            setError(`time.${check.index2??0}.date`, {
                message: 'Jadwal ini bentrok'
            })
        }else{
            mutate({
                ...data,
            })
        }
    }

    const checkOverlap = async (data:TimeForm[]) =>{
        for (let i = 0; i < data.length; i++) {
            for (let j = i + 1; j < data.length; j++) {
                const check = await isOverlap(data[i].date, data[j].date)
                if(check) return {status:true, index:i, index2:j}
            }
        }
        return {
            status:false
        };
    }

    const isOverlap = async (time1:string, time2:string) => {
        const start1 = new Date(time1);
        const end1 = new Date(new Date(time1).getTime() + 90 * 60000);
        const start2 = new Date(time2);
        const end2 = new Date(new Date(time2).getTime() + 90 * 60000);
    
        // Memeriksa apakah ada tumpang tindih
        return !(end1 <= start2 || start1 >= end2);
    }

    const onDelete = (id: string) => {
        modalConfirm.setModalConfirm((state)=>({
            ...state,
            title: state.title,
            type: 'danger',
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
        setUpdateState(true)
        mutateById(id)
    }

    const onCancel = () => {
        setModalForm((state)=>({
            ...state,
            visible: false
        }))
        reset(SessionDummy)
        setIdDetail(null)
    }

    const onDetail = async (id:string) => {
        setIdDetail(id)
        mutateById(id)
    }
    
    const onCancelSession = (id:string) => {
        modalConfirm.setModalConfirm((state)=>({
            ...state,
            title: t("cancel-schedule"),
            type: 'warning',
            message: t("message-cancel-schedule"),
            confirmLabel: 'Ya',
            cancelLabel: state.cancelLabel,
            visible: true,
            onConfirm:()=>{
                modalConfirm.setModalConfirm((state)=>({
                    ...state,
                    loading: true
                }))
                mutateCancelSession(id)
            },
            onCancel:()=>{
                modalConfirm.setModalConfirm((state)=>({
                    ...state,
                    visible: false,
                }))
            }
        }))
    }
    
    const {
        mutate:mutateCancelSession
    } = useMutation({
        mutationKey: ['cancel-schedule'],
        mutationFn: async (id:string)=>
            cancelSession(SessionSchedule.cancelSchedule, id),
        onSuccess: ()=> {
            modalConfirm.setModalConfirm({
                ...modalConfirm.modalConfirm,
                loading: false,
                visible: false
            })
            refetch()
            toast.success(t("success-cancel-schedule"), {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const isWeekday = (date:Date) => {
        const day = date.getDay();
        return day === 0;
    };

    const handleOnChangeTime = async (
        index:number,
        key: keyof TimeForm,
        value: string
    ) => {
        setValue(`time.${index}.${key}`, value)
        const status = await checkSession(SessionSchedule.checkSchedule, {
            date: getValues(`time.${index}.date`),
            tentorId: getValues(`time.${index}.tentorId`),
            roomId: getValues(`time.${index}.roomId`),
            courseId : getValues(`time.${index}.courseId`) 
        });
        try {
            if(status){
                setError(`time.${index}.date`, {
                    type:'value',
                    message: 'Jadwal sudah digunakan'
                })
            }else{
                if(key==='date'){
                    const checkDate = isWeekday(new Date(value));
                    if(checkDate){
                        setError(`time.${index}.date`, {
                            type:'value',
                            message: 'Hari libur tidak boleh dipilih'
                        })
                    }else{
                        throw new Error()
                    }
                }else{
                    throw new Error()
                }
            }
        } catch (error) {
            clearErrors(`time.${index}.date`)
        }
    }

    const handleOnChangeSession = async (
        key: 'schedule.scheduleType' | 'schedule.studyGroupId' | 'schedule.method',
        value: string 
    ) => {
        setValue(key, value)
        if(key==='schedule.studyGroupId'){
            setValue('schedule.studyGroupId', value)
            await checkSessions(value);
        }
    }

    const checkSessions = async (id: string) => {
        const data:ApiResponseUpdateStudyGroup = await getStudyGroup(StudyGroup.getById, id) 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let dataDetail: any[]=[]
        for (let index = 0; index < data.data.studyGroupDetails.length; index++) {
            dataDetail=[...dataDetail,
            {
                studentId: data.data.studyGroupDetails[index].studentId
            }]
        }
        setValue('scheduleDetails', [...dataDetail]);
        return 1;
    }

    const handleOnChangeSessionDetail = (
        value: string,
        index: number
    ) => {
        setValue(`scheduleDetails.${index}.studentId`, value)
        setRerender(state=>state+1)
    }

    const handleOpenForm = () => {
        refetchForm()
        checkSessions(queryUrl.get('id') ?? '')
        setModalForm((state)=> ({...state, visible:true}))
    }

    return {
        dataSession,
        isFetching,
        setQuery,
        onSubmit,
        isLoadingMutate,
        errors,
        reset,
        register,
        setValue,
        getValues,
        fields,
        fieldDate,
        append,
        appendDate,
        remove,
        removeDate,
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
        optionSession,
        updateStatus,
        handleOnChangeTime,
        handleOnChangeSession,
        handleOnChangeSessionDetail,
        onCancelSession,
        appendIdDeleteSessionDetail,
        dataGroup,
        optionTutorSchedule,
        dataOptionTutor,
        handleOpenForm
    }
}