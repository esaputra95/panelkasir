import { SubmitHandler, useForm } from "react-hook-form";
import { StudentReport, ResponseApi } from "../../../interfaces/reports/StudentReportInterface";
import moment from "moment";
import { getData } from "../../models/reports/studentReportModel";
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

const useStudentReport = () => {
    const [ dataStudentReport, setDataStudentReport ] = useState<[][]>()
    const { StudentReport } = url;
    const doc = new jsPDF();
    const {
        reset,
        register,
        handleSubmit,
        control,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<StudentReport>({
        defaultValues: {
            startDate: moment().startOf('M').format('YYYY-MM-DD'),
            endDate: moment().endOf('M').format('YYYY-MM-DD')
        }
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:StudentReport)=> getData(StudentReport.get, data),
        onSuccess: (data:ResponseApi) => {
            if(data.status){
                if(getValues('type')==="view"){
                    setDataStudentReport(data.data)
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
            `LAPORAN SISWA` , 
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
                helperReport.headerReportStudent
            ],
            margin: { left:2, right:2 },
            theme:'grid',
            body: data??'',
        })
        doc.save('Laporan Siswa.pdf')
    }

    const onDownload: SubmitHandler<StudentReport> = (data) => {
        setValue('type', 'download')
        mutate({
            ...data,
        })
    }

    const onSubmit: SubmitHandler<StudentReport> = (data) => {
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
        dataStudentReport,
        onDownload
    }
}

export default useStudentReport;