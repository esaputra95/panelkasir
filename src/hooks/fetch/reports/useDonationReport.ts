import { SubmitHandler, useForm } from "react-hook-form";
import { DonationReport, ResponseApi } from "../../../interfaces/reports/DonationReport";
import moment from "moment";
import { getData } from "../../models/reports/reportModel";
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
import hexToRgb from "../../../utils/hexToRgb"

const useDonationReport = () => {
    const [ dataDonationReport, setDataDonationReport ] = useState<[][]>()
    const {
        DonationReport,
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
    } = useForm<DonationReport>({
        defaultValues: {
            startDate: moment().startOf('M').format('YYYY-MM-DD'),
            endDate: moment().endOf('M').format('YYYY-MM-DD')
        }
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:DonationReport)=> getData(DonationReport.get, data),
        onSuccess: (data:ResponseApi) => {
            if(data.status){
                if(getValues('type')==="view"){
                    setDataDonationReport(data.data)
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
        doc.addImage(`${import.meta.env.VITE_API_URL}/images/assets/icon.png`, 'JPEG', 12, 2, 25, 25);
        doc.setFontSize(9)
        doc.text([
            'LAPORAN DONASI',
            'Berbagi Masjid',
            'Masjid Pedia',
            'Jalan Sukarno Hatta No. 2 Komplek Sekolah Islman Terpadu Imam Syafii 2',
            'Pekanbaru, Riau'
        ], 44, 6);

        if(getValues('tentor')){
            const height = 11;
            const textWidth=186
            
            const rgb = hexToRgb('#1bbd9d');
            doc.setFillColor(rgb.r, rgb.g, rgb.b);
            doc.rect(12, 34, textWidth, height, 'F');

            doc.setTextColor('white');
            doc.setFontSize(10)
            doc.text([
                `${t('tutors')} : ${getValues('tentor.label')}`,
                `Rentang Waktu ${moment(getValues('startDate')).format('DD/MM/YYYY')} - ${moment(getValues('endDate')).format('DD/MM/YYYY')}`,
            ], 14, 34 + height - 7); 
        }
        let newHead:string[]=[];
        for (const value of helperReport.headerDonation) {
            newHead=[...newHead,
                t(value)
            ]
        }
        let top=36
        if(getValues('tentor.value')){
            top=46;
        }
        autoTable(doc, {
            head: [
                newHead
            ],
            margin: { left:12, right:12, top:top },
            theme:'grid',
            styles:{halign:'center'},
            body: data??'',
        })
        doc.save('Laporan Donasi.pdf')
    }

    const onDownload: SubmitHandler<DonationReport> = (data) => {
        setValue('type', 'download')
        mutate({
            ...data,
        })
    }

    const onSubmit: SubmitHandler<DonationReport> = (data) => {
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
        dataDonationReport,
        onDownload
    }
}

export default useDonationReport;