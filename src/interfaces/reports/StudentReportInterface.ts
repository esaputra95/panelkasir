import { Control, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

export interface StudentReport {
    startDate?: string;
    endDate?: string;
    status?: string;
    type?: 'view' | 'download'
}

export interface StudentReportFilter {
    register: UseFormRegister<StudentReport>;
    control: Control<StudentReport>;
    onSubmit: SubmitHandler<StudentReport>;
    handleSubmit: UseFormHandleSubmit<StudentReport>;
    onDownload: (data: StudentReport) => void
}

export interface DataStudentInterface {
    dataStudentReport: [][] | undefined
}

export interface ResponseApi {
    status: number;
    message: string;
    data:[][]
}