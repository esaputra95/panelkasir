import { SubmitHandler, useForm } from "react-hook-form";
import { ReportBase, ResponseApi } from "../../../interfaces/reports/ReportInterface";
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
import { downloadFile, getData, getDataById } from "../../models/globalModel";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ApiResponseUpdateWarehouse } from "../../../interfaces/settings/WarehouseInterface";

const useBestSellerReport = () => {
    const [ dataReport, setDataReport ] = useState<[][]>()
    const user = useSelector((state:RootState)=>state.userReducer)
    const {
        ReportBestSeller,
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
    } = useForm<ReportBase>({
        defaultValues: {
            startDate: moment().startOf('M').format('YYYY-MM-DD'),
            endDate: moment().endOf('M').format('YYYY-MM-DD')
        }
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:ReportBase)=> getData(ReportBestSeller.report, {
            startDate: data.startDate,
            endDate: data.endDate,
            storeId: data.warehouse?.value,
        }),
        onSuccess: async (data:ResponseApi) => {
            if(data.status){
                if(getValues('type')==="view"){
                    setDataReport(data.data)
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
        mutationFn: (data:ReportBase)=> getData(ReportBestSeller.excel, {
            startDate: data.startDate,
            endDate: data.endDate,
            storeId: data.warehouse?.value,
        }),
        onSuccess: async () => {
            await downloadFile(ReportBestSeller.download, 'Laporan Best Seller')
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
            t('best seller report'), 
            `Nama Toko: ${storeData.name ?? ''}`,
            `Alamat: ${storeData.address ?? ''}`,
            `Telepon: ${storeData?.phone ?? ''}`,
        ], 12, 6);

        let newHead:string[]=[];
        const headers = helperReport.headerBestSellerReport;
        for (const value of headers) {
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
        doc.save(`${t('best seller report')}.pdf`)
    }

    const onDownload: SubmitHandler<ReportBase> = (data) => {
        setValue('type', 'download')
        mutate({
            ...data,
        })
    }
    const onExcel: SubmitHandler<ReportBase> = (data) => {
        setValue('type', 'excel')
        mutatePdf({
            ...data,
        })
    }

    const onSubmit: SubmitHandler<ReportBase> = (data) => {
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
        dataReport,
        onDownload,
        onExcel,
        isLoadingMutateExcel
    }
}

export default useBestSellerReport;
