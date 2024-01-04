import { SubmitHandler, useForm } from "react-hook-form";
import { PayrollReport, ResponseApi } from "../../../interfaces/reports/payrollReportInterface";
import moment from "moment";
import { getData } from "../../models/reports/payrollReportModel";
import url from "../../../services/url";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { t } from "i18next";
import { AxiosError } from "axios";
import { DataMessageError } from "../../../interfaces/apiInfoInterface";
import { handleMessageErrors } from "../../../services/handleErrorMessage";
import { useState } from "react";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import helperReport from "../../../utils/headerReport";

const usePayrollReport = () => {
    const [ dataPayrollReport, setDataPayrollReport ] = useState<[][]>()
    const {ReportPayroll} = url;
    const doc = new jsPDF();
    const {
        reset,
        register,
        handleSubmit,
        control,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<PayrollReport>({
        defaultValues: {
            startDate: moment().startOf('M').format('YYYY-MM-DD'),
            endDate: moment().endOf('M').format('YYYY-MM-DD')
        }
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:PayrollReport)=> getData(ReportPayroll.get, data),
        onSuccess: (data:ResponseApi) => {
            if(data.status){
                if(getValues('type')==="view"){
                    setDataPayrollReport(data.data)
                }else{
                    toPdf(data.data??[])
                }
                toast.success(t("success-get-data"), {
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

    const toPdf = (data:string[][]) => {
        doc.setTextColor(40);
        doc.setFontSize(16)
        doc.text(
            `LAPORAN PENGGAJIAN` , 
            2, 2, 
            { 
                baseline: 'top' ,
                align: 'justify'
            }
        );

        autoTable(doc, {
            bodyStyles: { fillColor: '#FFFFFF' },
            margin: { left:0, right:0},
            styles: {
                halign:'left',
                fillColor: '#FFFFFF',
                lineColor: '#FFFFFF'
            },
            theme:'grid',
            body: [
                [`Rentang Waktu ${moment(getValues('startDate')).format('DD-MM-YYYY')} - ${moment(getValues('endDate')).format('DD-MM-YYYY')}`]
            ]
        })
        autoTable(doc, {
            head: [
                helperReport.headerReportPayroll
            ],
            margin: { left:2, right:2 },
            theme:'grid',
            body: data??'',
        })
        doc.save('Laporan Penggajian.pdf')
    }

    const onDownload: SubmitHandler<PayrollReport> = (data) => {
        setValue('type', 'download')
        mutate({
            ...data,
        })
    }

    const onSubmit: SubmitHandler<PayrollReport> = (data) => {
        mutate({
            ...data,
        })
        setValue('type', 'view')
    }
    
    return {
        reset,
        register,
        handleSubmit,
        control,
        errors,
        onSubmit,
        isLoadingMutate,
        dataPayrollReport,
        onDownload
    }
}

export default usePayrollReport;