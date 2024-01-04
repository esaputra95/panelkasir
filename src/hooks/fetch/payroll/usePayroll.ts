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
import { modalFormState } from "../../../utils/modalFormState"
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

export const usePayroll = () => {
    const [ query, setQuery ] = useState<PayrollInterface>()
    const [ idDetail, setIdDetail ] = useState<string | null>()
    const { Payroll } = url
    const { modalForm, setModalForm } = modalFormState()
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
            autoTable(doc, { html: '' })

            doc.setFontSize(10);
            doc.setTextColor(40);
            doc.text(
                helperReport.headerReport, 
                2, 2, 
                { 
                    baseline: 'top' ,
                }
            );
            autoTable(doc, {
                bodyStyles: { fillColor: '#FFFFFF' },
                // styles: { fillColor: '#000000',  },
                margin: { left:2, right:2},
                styles: {
                    halign:'center',
                    lineColor: '#dfe2e4',
                    fillColor: '#8d2049'
                },
                theme: 'grid',
                body: [
                    ['REKAPITULASI JUMLAH MENGAJAR TENTOR'],
                    ['ESP BIMBEL YOGYAKARTA'],
                ]
            })
            autoTable(doc, {
                bodyStyles: { fillColor: '#FFFFFF' },
                margin: { left:2, right:2},
                styles: {
                    halign:'left',
                    fillColor: '#FFFFFF',
                    lineColor: '#FFFFFF'
                },
                theme:'grid',

                body: data.tentor??''
            })
            autoTable(doc, {
                head: [
                    helperReport.headerPayroll
                ],
                margin: { left:2, right:2 },
                theme:'grid',
                body: data.data??'',
            })
            autoTable(doc, {
                bodyStyles: { fillColor: '#FFFFFF' },
                margin: { left:2, right:2},
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