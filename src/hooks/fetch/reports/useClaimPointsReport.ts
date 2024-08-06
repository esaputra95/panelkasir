import { SubmitHandler, useForm } from "react-hook-form";
import { ClaimPointsReport, ResponseApi } from "../../../interfaces/reports/ClaimPointsReportInterface";
import moment from "moment";
import { getData } from "../../models/reports/ClaimPointsReportModel";
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
import { getData as getDataSetting}  from "../../models/settings/settingModel"
import hexToRgb from "../../../utils/hexToRgb"
import { ApiResponseSetting } from "../../../interfaces/settingInterface";

const useClaimPointsReport = () => {
    const [ dataClaimPointsReport, setDataClaimPointsReport ] = useState<[][]>()
    const {
        Report,
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
    } = useForm<ClaimPointsReport>({
        defaultValues: {
            startDate: moment().startOf('M').format('YYYY-MM-DD'),
            endDate: moment().endOf('M').format('YYYY-MM-DD')
        }
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:ClaimPointsReport)=> getData(Report.claimPointsReport, data),
        onSuccess: (data:ResponseApi) => {
            if(data.status){
                if(getValues('type')==="view"){
                    setDataClaimPointsReport(data.data)
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
        const email = headerData.data.setting.find(value=> value.label === "email")

        doc.addImage(`${import.meta.env.VITE_API_URL}/images/${icon?.value}`, 'JPEG', 12, 2, 25, 25);
        doc.setFontSize(9)
        doc.text([
            t('ClaimPoints report'), 
            `Head Office: ${address?.value ?? ''}`,
            `hotline : ${hotline?.value ?? ''}`,
            `Email: ${email?.value ?? ''}`
        ], 44, 6);

        if(getValues('user')){
            const height = 11;
            const textWidth=186
            
            const rgb = hexToRgb('#1bbd9d');
            doc.setFillColor(rgb.r, rgb.g, rgb.b);
            doc.rect(12, 34, textWidth, height, 'F');

            doc.setTextColor('white');
            doc.setFontSize(10)
            doc.text([
                `${t('tutors')} : ${getValues('user.label')}`,
                `Rentang Waktu ${moment(getValues('startDate')).format('DD/MM/YYYY')} - ${moment(getValues('endDate')).format('DD/MM/YYYY')}`,
            ], 14, 34 + height - 7); 
        }
        let newHead:string[]=[];
        for (const value of helperReport.headerClaimPointsReport) {
            newHead=[...newHead,
                t(value)
            ]
        }
        let top=36
        if(getValues('user.value')){
            top=46;
        }
        autoTable(doc, {
            head: [
                newHead
            ],
            margin: { left:12, right:12, top:top },
            theme:'grid',
            styles:{halign:'left'},
            body: data??'',
        })
        doc.save(`${t('claim-points-report')}.pdf`)
    }

    const onDownload: SubmitHandler<ClaimPointsReport> = (data) => {
        setValue('type', 'download')
        mutate({
            ...data,
        })
    }

    const onSubmit: SubmitHandler<ClaimPointsReport> = (data) => {
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
        dataClaimPointsReport,
        onDownload
    }
}

export default useClaimPointsReport;