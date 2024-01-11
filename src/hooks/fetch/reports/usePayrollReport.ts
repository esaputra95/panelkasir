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
import { ApiResponseSetting } from "../../../interfaces/settings/settingInterface";
import { getData as getDataSetting}  from "../../models/settings/settingModel"
import hexToRgb from "../../../utils/hexToRgb"

const usePayrollReport = () => {
    const [ dataPayrollReport, setDataPayrollReport ] = useState<[][]>()
    const {
        ReportPayroll,
        Setting
    } = url;
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

    const toPdf = async (data:string[][]) => {
        const headerData:ApiResponseSetting = await getDataSetting(Setting.get);
        const icon = headerData.data.setting.find(value=> value.label === "icon")
        const hotline = headerData.data.setting.find(value=> value.label === "hotline")
        const address = headerData.data.setting.find(value=> value.label === "address")
        const city = headerData.data.setting.find(value=> value.label === "city")
        const postalCode = headerData.data.setting.find(value=> value.label === "postal-code")
        const website = headerData.data.setting.find(value=> value.label === "website")
        const email = headerData.data.setting.find(value=> value.label === "email")

        doc.addImage(`${import.meta.env.VITE_API_URL}/images/${icon?.value}`, 'JPEG', 2, 2, 25, 25);
        doc.setFontSize(9)
        doc.text([
            'LAPORAN PENGGAJIAN TENTOR', 
            `Head Office: ${address?.value ?? ''}`,
            `${city?.value ?? ''}, ${postalCode?.value ?? ''}`,
            `hotline : ${hotline?.value ?? ''}`,
            `Website: ${website?.value ?? ''}`,
            `Email: ${email?.value ?? ''}`,
            `Rentang Waktu ${moment(getValues('startDate')).format('DD-MM-YYYY')} - ${moment(getValues('endDate')).format('DD-MM-YYYY')}`,
        ], 34, 6);

        if(getValues('tentor')){
            const height = 8;
            const textWidth=206
            
            const rgb = hexToRgb('#1bbd9d');
            doc.setFillColor(rgb.r, rgb.g, rgb.b);
            doc.rect(2, 34, textWidth, height, 'F');

            doc.setTextColor('white');
            doc.setFontSize(10)
            doc.text([
                `${t('tutors')} : ${getValues('tentor.label')}`,
            ], 4, 34 + height - 4); 
        }
        let newHead:string[]=[];
        for (const value of helperReport.headerReportPayroll) {
            newHead=[...newHead,
                t(value)
            ]
        }
        autoTable(doc, {
            head: [
                newHead
            ],
            margin: { left:2, right:2, top:44 },
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