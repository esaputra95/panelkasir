import {  useMutation, useQuery } from "@tanstack/react-query"
import { deleteData, getData, getDataById, getDataSelect, postData } from "../../models/registers/studentModel"
import { useEffect, useState } from "react"
import { ApiResponseStudent, ApiResponseUpdateStudent, StudentRegisterInterface } from "../../../interfaces/registers/studentInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { StudentSchema } from "../../../schema/registers"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import { StudentDummy } from '../../../utils/dummy/register'
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { OptionSelectInterface } from "../../../interfaces/globalInterface"
import { OptionDummy } from "../../../utils/dummy/setting"
import { RegistrationInterface } from "../../../interfaces/registers/registrationInterface"
import { getData as getDataSetting}  from "../../models/settings/settingModel"
import jsPDF from "jspdf";
import { ApiResponseSetting } from "../../../interfaces/settings/settingInterface"

export const useStudent = () => {
    const [ query, setQuery ] = useState<{name:string}>()
    const [ idDetail, setIdDetail ] = useState<string | null>()
    const [ dataOptionStudent, setDataOptionStudent] = useState<OptionSelectInterface[]>([OptionDummy])
    const [ dataRegister, setDataRegister ] = useState<RegistrationInterface[]>([])
    const {
        Student,
        Setting
    } = url
    const { modalForm, setModalForm } = ModalFormState()
    const { modalForm:modalFormRegister, setModalForm:setModelFormRegister } = ModalFormState()
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
        formState: { errors },
    } = useForm<StudentRegisterInterface>({
        resolver: yupResolver(StudentSchema().schema)
    });

    const {
        register:registerFilter,
        handleSubmit:handleSubmitFilter,
    } = useForm<StudentRegisterInterface>();

    const onFilter: SubmitHandler<{name:string}> = (data) => {
        setQuery((state)=>({
            ...state,
            name: data.name
        }));
    };

    useEffect(()=> {
        refetch()
    }, [page.page])
    
    const {data:dataStudent, isFetching, refetch} = useQuery<ApiResponseStudent, AxiosError>({ 
        queryKey: ['class-master', query], 
        networkMode: 'always',
        queryFn: async () => await getData(Student.get, 
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

    const printAddress = async (id:string) => {
        const student:ApiResponseUpdateStudent = await getDataById(Student.getById, id);
        if(student.status){
            const headerData:ApiResponseSetting = await getDataSetting(Setting.get);
            if(headerData.status){
                const doc = new jsPDF({
                    orientation: 'landscape',
                    format:'a6'
                });

                const name = headerData.data.setting.find(value=> value.label === "company-name")
                const hotline = headerData.data.setting.find(value=> value.label === "hotline")
                const address = headerData.data.setting.find(value=> value.label === "address")
                const city = headerData.data.setting.find(value=> value.label === "city")
                const postalCode = headerData.data.setting.find(value=> value.label === "postal-code")
                const website = headerData.data.setting.find(value=> value.label === "website")
                const email = headerData.data.setting.find(value=> value.label === "email");
                doc.setFontSize(12)
                doc.setFont('', 'bold')
                doc.text('INFORMASI PENGIRIM DAN PENERIMA', 
                    2, 6
                )
                doc.setFontSize(9)
                doc.setFont('', 'normal')
                doc.text([
                    'PENGIRIM', 
                    `Nama: ${name?.value ?? ''}`,
                    `Head Office: ${address?.value ?? ''}`,
                    `${city?.value ?? ''}, ${postalCode?.value ?? ''}`,
                    `Hotline : ${hotline?.value ?? ''}`,
                    `Website: ${website?.value ?? ''}`,
                    `Email: ${email?.value ?? ''}`,
                ], 2, 16);
                doc.text([
                    'PENERIMA', 
                    `Nama: ${student.data.student?.name}`,
                    `Negara: ${student.data.student?.country}`,
                    `Privinsi: ${student.data.student?.province}`,
                    `Kota: ${student.data.student?.city}`,
                    `Alamat: ${student.data.student?.address}`,
                    `Hp: ${student.data.student?.phone}`,
                ], 2, 44);
                doc.save(`Alamat ${student.data.student.name}.pdf`)
            }
        }
    }

    const optionStudent = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(Student.getSelect, {name: data});
        if(response.status){
            setDataOptionStudent(response.data.class);
            return response.data.class
        }
        return [OptionDummy]
    }

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:string) => getDataById(Student.getById, id),
        onSuccess:(data:ApiResponseUpdateStudent)=>{
            if(data.status){
                reset(data.data.student)
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

    const { mutate:mutateOpenRegister } = useMutation({
        mutationFn: (id:string) => getDataById(Student.getById, id),
        onSuccess:(data:ApiResponseUpdateStudent)=>{
            if(data.status){
                setModelFormRegister((state)=>({
                    ...state,
                    title: 'List Pendaftaran',
                    visible: true
                }))
                
                setDataRegister(data.data?.student?.registers ?? [])
            }
        },
        onError:(error:AxiosError)=> {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:StudentRegisterInterface)=> postData(Student.post, data),
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
        mutationFn: (id:string) => deleteData(Student.delete, id),
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

    const onSubmit: SubmitHandler<StudentRegisterInterface> = (data) => {
        mutate({
            ...data,
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
        setModelFormRegister((state)=>({
            ...state,
            visible: false
        }))
        reset({
            ...StudentDummy
        })
        setIdDetail(null)
    }
    
    const onOpenRegister = async (id:string) => {
        mutateOpenRegister(id)
    }

    const onDetail = async (id:string) => {
        setIdDetail(id)
        mutateById(id)
    }

    return {
        dataStudent,
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
        optionStudent,
        dataOptionStudent,
        onOpenRegister,
        dataRegister,
        modalFormRegister,
        registerFilter,
        handleSubmitFilter,
        onFilter,
        printAddress
    }
}