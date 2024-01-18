import { useMutation, useQuery } from "@tanstack/react-query"
import {
    deleteData,
    getData,
    getDataById,
    postData,
    getDataPayrollSession,
    getPayrollDetail
} from "../../models/payroll/payrollModel"
import { useEffect, useState } from "react"
import { 
    ApiResponsePayroll,
    ApiResponseUpdatePayroll,
    PayrollInterface,
    PayrollResponse
} from "../../../interfaces/payroll/payrollInterface"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { PayrollSchema } from "../../../schema/payroll"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import { PayrollDummy } from '../../../utils/dummy/payrollDummy'
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { OptionSelectInterface } from "../../../interfaces/globalInterface"
import { SingleValue } from "react-select"
import { NumberFormatValues } from "react-number-format"
import moment from "moment"
import { PayrollDetailInterface } from "../../../interfaces/payroll/payrollDetailInterface"
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import helperReport from "../../../utils/headerReport"
import { ApiResponseSetting } from "../../../interfaces/settings/settingInterface"
import { getData as getDataSetting}  from "../../models/settings/settingModel"
import hexToRgb from "../../../utils/hexToRgb"

export const usePayroll = () => {
    const [ query, setQuery ] = useState<PayrollInterface>()
    const [ idDetail, setIdDetail ] = useState<string | null>()
    const { 
        Payroll,
        Setting
    } = url
    const { modalForm, setModalForm } = ModalFormState()
    const { t } = useTranslation();
    const modalConfirm = modalConfirmState()
    const page = usePage();
    const doc = new jsPDF();
    
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
        getValues,
        setValue,
        formState: { errors },
    } = useForm<PayrollInterface>({
        resolver: yupResolver(PayrollSchema().schema)
    })

    const {
        fields,
    } = useFieldArray({
        control,
        name: 'payrollDetails'
    })

    useEffect(()=> {
        refetch()
    }, [page.page])

    const {data:dataPayroll, isFetching, refetch} = useQuery<ApiResponsePayroll, AxiosError>({ 
        queryKey: ['class-master'], 
        networkMode: 'always',
        queryFn: async () => await getData(Payroll.get, 
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

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:string) => getDataById(Payroll.getById, id),
        onSuccess:(data:ApiResponseUpdatePayroll)=>{
            if(data.status){
                const dataPayroll = {
                    ...data.data.payroll,
                    month: moment(data.data.payroll.month+'-01').format('YYYY-MM'),
                }
                let dataPayrollDetail:PayrollDetailInterface[]=[]
                for (const valueDetail of data.data.payroll.payrollDetails) {
                    dataPayrollDetail=[
                        ...dataPayrollDetail,
                        {
                            ...valueDetail,
                            time: moment(valueDetail.schedules?.date).format('YYYY-MM-DD')
                        }
                    ]
                }
                reset({
                    ...dataPayroll,
                    payrollDetails: dataPayrollDetail
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
        mutationFn: (data:PayrollInterface)=> postData(Payroll.post, data),
        onSuccess: async (data) => {
            if(data.status){
                setModalForm((state)=>({
                    ...state,
                    visible: false
                }))
                refetch()
                reset()
                toast.success(t("success-save"), {
                    position: toast.POSITION.TOP_CENTER
                });
            }else{
                const err = data as AxiosError<DataMessageError>
                let message = `${errors}`
                if(err.response?.status === 400){
                    message = await handleMessageErrors(err.response?.data?.errors)
                }
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
        mutationFn: (id:string) => deleteData(Payroll.delete, id),
        onSuccess: () => {
            modalConfirm.setModalConfirm({
                ...modalConfirm.modalConfirm,
                loading: false,
                visible: false,
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

    const onSubmit: SubmitHandler<PayrollInterface> = (data) => {
        mutate({
            ...data
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
            type:'danger',
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

    const handleOnChange = (data:SingleValue<OptionSelectInterface>)=> {
        setValue('userId', data?.value ?? '')
    }

    const handleOnChangeText = (key: keyof PayrollInterface, data:NumberFormatValues) => {
        if(key==="basicSalary"){
            const total = parseFloat(getValues('sessionSalary')?.replace(/,/g, '')??0) + parseFloat(data.value)
            setValue('total', total.toString())
        }
    }

    const getPayrollSession = async (tentorId:string, month:string) => {
        const data:PayrollResponse = await getDataPayrollSession(Payroll.getDataPayrollSession, tentorId, month)
        setValue('sessionSalary', data.data.salary+'')
        setValue('payrollDetails', data.data.payrollData)
        setValue('total', parseFloat(getValues('basicSalary')?.replace(/,/g,'')) + parseFloat(data.data.salary+'')+'')
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
            ...PayrollDummy
        })
        setIdDetail(null)
    }

    const onDetail = async (id:string) => {
        setIdDetail(id)
        mutateById(id)
    }

    const printPayroll = async (id:string) => {
        const data = await getPayrollDetail(Payroll.getPayrollDetail, id)
        if(data.status){
            const headerData:ApiResponseSetting = await getDataSetting(Setting.get);
            const icon = headerData.data.setting.find(value=> value.label === "icon")
            const hotline = headerData.data.setting.find(value=> value.label === "hotline")
            const address = headerData.data.setting.find(value=> value.label === "address")
            const city = headerData.data.setting.find(value=> value.label === "city")
            const postalCode = headerData.data.setting.find(value=> value.label === "postal-code")
            const website = headerData.data.setting.find(value=> value.label === "website")
            const email = headerData.data.setting.find(value=> value.label === "email")

            doc.addImage(`${import.meta.env.VITE_API_URL}/images/${icon?.value}`, 'JPEG', 12, 2, 25, 25);
            doc.setFontSize(9)
            doc.text([
                'REKAPITULASI JUMLAH MENGAJAR TENTOR', 
                `Head Office: ${address?.value ?? ''}`,
                `${city?.value ?? ''}, ${postalCode?.value ?? ''}`,
                `hotline : ${hotline?.value ?? ''}`,
                `Website: ${website?.value ?? ''}`,
                `Email: ${email?.value ?? ''}`
            ], 44, 6);
            
            const height = 15;
            const textWidth=186
            
            const rgb = hexToRgb('#1bbd9d');
            doc.setFillColor(rgb.r, rgb.g, rgb.b);
            doc.rect(12, 34, textWidth, height, 'F');

            doc.setTextColor('white');
            doc.setFontSize(10)
            doc.text([
                `${data.tentor[0] ?? ''}`,
                `${data.tentor[1] ?? ''}`,
                `${data.tentor[2] ?? ''}`,
            ], 14, 33 + height - 10); 

            let newHead:string[]=[];
            for (const value of helperReport.headerPayroll) {
                newHead=[...newHead,
                    t(value)
                ]
            }
            autoTable(doc, {
                head: [
                    newHead
                ],
                margin: { left:12, right:12, top:50 },
                theme:'grid',
                styles:{halign:'center'},
                body: data.data??'',
            })
            autoTable(doc, {
                bodyStyles: { fillColor: '#FFFFFF' },
                margin: { left:12, right:12},
                styles: {
                    halign:'left',
                    fillColor: '#FFFFFF',
                    lineColor: '#FFFFFF'
                },
                theme:'grid',
                body:helperReport.signature
            })
            doc.save('Gaji Tentor.pdf')
        }
    }

    return {
        dataPayroll,
        isFetching,
        setQuery,
        onSubmit,
        isLoadingMutate,
        errors,
        reset,
        register,
        getValues,
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
        getPayrollSession,
        handleOnChange,
        fields,
        handleOnChangeText,
        printPayroll
    }
}