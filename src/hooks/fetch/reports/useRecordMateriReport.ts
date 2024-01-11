import { SubmitHandler, useForm } from "react-hook-form";
import { RecordMateriReport, ResponseApi } from "../../../interfaces/reports/RecordMateriReportInterface";
import moment from "moment";
import { getData } from "../../models/reports/recordMateriReportModel";
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
import { ApiResponseSetting } from "../../../interfaces/settings/settingInterface";
import icon from './../../../assets/icon.jpeg'
import hexToRgb from "../../../utils/hexToRgb";
import { ApiResponseUpdateStudent } from "../../../interfaces/registers/studentInterface";
import { getDataById as getDataStudentById } from "./../../models/registers/studentModel"

const useRecordMateriReport = () => {
    const [ dataRecordMateriReport, setDataRecordMateriReport ] = useState<[][]>()
    const { 
        RecordMateriPayroll, 
        Setting,
        Student
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
    } = useForm<RecordMateriReport>({
        defaultValues: {
            startDate: moment().startOf('M').format('YYYY-MM-DD'),
            endDate: moment().endOf('M').format('YYYY-MM-DD')
        }
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:RecordMateriReport)=> getData(RecordMateriPayroll.get, data),
        onSuccess: (data:ResponseApi) => {
            if(data.status){
                if(getValues('type')==="view"){
                    setDataRecordMateriReport(data.data)
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
        const hotline = headerData.data.setting.find(value=> value.label === "hotline")
        const address = headerData.data.setting.find(value=> value.label === "address")
        const city = headerData.data.setting.find(value=> value.label === "city")
        const postalCode = headerData.data.setting.find(value=> value.label === "postal-code")
        const website = headerData.data.setting.find(value=> value.label === "website")
        const email = headerData.data.setting.find(value=> value.label === "email")

        doc.addImage(icon, 'JPEG', 2, 2, 30, 30);
        doc.setFontSize(9)
        doc.text([
            'LAPORAN JADWAL ESP SISWA', 
            `Head Office: ${address?.value ?? ''}`,
            `${city?.value ?? ''}, ${postalCode?.value ?? ''}`,
            `hotline : ${hotline?.value ?? ''}`,
            `Website: ${website?.value ?? ''}`,
            `Email: ${email?.value ?? ''}`
        ], 34, 6);

        if(getValues('student')){
            const student:ApiResponseUpdateStudent = await getDataStudentById(Student.getById, getValues('student.value'));
            const textWidth = doc.getStringUnitWidth(`Siswa : ${getValues('student.label')}`) * 23;
            const height = 16;
            // Draw filled rectangle as background
            const rgb = hexToRgb('#1bbd9d');
            doc.setFillColor(rgb.r, rgb.g, rgb.b);
            doc.rect(2, 34, textWidth, height, 'F');
            // Add the text
            doc.setTextColor('white'); // Reset text color to black
            doc.setFontSize(10)
            doc.text([
                `${t('name')} : ${getValues('student.label')}`,
                `${t('major')} : ${student.data.student.studyProgram}`,
                `${t('study-groups')} : ${student.data.student?.studyGroupDetails?.[0].studyGroups?.name}`
            ], 4, 34 + height - 11); // subtract 3 for better alignment
        }

        let newHead:string[]=[];
        for (const value of helperReport.headerRecordMateriReport) {
            newHead=[...newHead,
                t(value)
            ]
        }
        autoTable(doc, {
            head: [
                newHead
            ],
            margin: { left:2, right:2, top:51 },
            theme:'grid',
            body: data??'',
        })
        doc.save('LAPORAN RECORD MATERI.pdf')
    }

    const onDownload: SubmitHandler<RecordMateriReport> = (data) => {
        setValue('type', 'download')
        mutate({
            ...data,
        })
    }

    const onSubmit: SubmitHandler<RecordMateriReport> = (data) => {
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
        dataRecordMateriReport,
        onDownload
    }
}

export default useRecordMateriReport;