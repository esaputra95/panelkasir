import { SubmitHandler, useForm } from "react-hook-form";
import { SalesReport, ResponseApi } from "../../../interfaces/reports/SalesReportInterface";
import moment from "moment";
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
import { downloadFile, getData, getDataById } from "../../models/globalModel";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ApiResponseUpdateWarehouse } from "../../../interfaces/settings/WarehouseInterface";

const useSalesReport = () => {
    const [ dataSalesReport, setDataSalesReport ] = useState<[][]>()
    const user = useSelector((state:RootState)=>state.userReducer)
    const {
        ReportSales,
        store
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
    } = useForm<SalesReport>({
        defaultValues: {
            startDate: moment().startOf('M').format('YYYY-MM-DD'),
            endDate: moment().endOf('M').format('YYYY-MM-DD')
        }
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:SalesReport)=> getData(ReportSales.report, {
            startDate: data.startDate,
            endDate: data.endDate,
            storeId: user.storeId,
            accountCashId: data.accountCash?.value
        }),
        onSuccess: async (data:ResponseApi) => {
            if(data.status){
                if(getValues('type')==="view"){
                    setDataSalesReport(data.data)
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

    const { mutate:mutatePdf, isLoading:isLoadingMutateExcel } = useMutation({
        mutationFn: (data:SalesReport)=> getData(ReportSales.excel, {
            startDate: data.startDate,
            endDate: data.endDate,
            storeId: data.warehouse?.value,
            accountCashId: data.accountCash?.value
        }),
        onSuccess: async () => {
            await downloadFile(ReportSales.download, 'Laporan Penjualan')
            toast.success(t("success-get-data"), {
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

    const toPdf = async (data:string[][]) => {
        const selectedStoreId = getValues('warehouse.value') || user.storeId;
        const headerData:ApiResponseUpdateWarehouse = await getDataById(store.getById, selectedStoreId+'');
        
        const storeData = headerData?.data?.store ?? {}

        doc.setFontSize(9)
        doc.text([
            t('sales report'), 
            `Nama Toko: ${storeData.name ?? ''}`,
            `Alamat: ${storeData.address ?? ''}`,
            `Telepon: ${storeData?.phone ?? ''}`,
            `Metode Bayar: ${getValues('accountCash.label') ?? ''}`,
        ], 12, 6);

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
        for (const value of helperReport.headerSalesReport) {
            newHead=[...newHead,
                t(value)
            ]
        }
        autoTable(doc, {
            head: [
                newHead
            ],
            margin: { left:12, right:12, top:26 },
            theme:'grid',
            styles:{halign:'left'},
            body: data??'',
        })
        doc.save(`${t('sales report')}.pdf`)
    }

    const onDownload: SubmitHandler<SalesReport> = (data) => {
        setValue('type', 'download')
        mutate({
            ...data,
        })
    }
    const onExcel: SubmitHandler<SalesReport> = (data) => {
        setValue('type', 'excel')
        mutatePdf({
            ...data,
        })
    }

    const onSubmit: SubmitHandler<SalesReport> = (data) => {
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
        dataSalesReport,
        onDownload,
        onExcel,
        isLoadingMutateExcel
    }
}

export default useSalesReport;