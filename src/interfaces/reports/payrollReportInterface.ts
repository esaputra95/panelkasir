import { Control, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { OptionSelectInterface } from "../globalInterface";

export interface PayrollReport {
    tentor?: OptionSelectInterface;
    startDate?: string;
    endDate?: string;
    type?: 'view' | 'download'
}

export interface PayrollReportFilter {
    register: UseFormRegister<PayrollReport>;
    optionTutor : (data: string) => Promise<OptionSelectInterface[]>;
    control: Control<PayrollReport>;
    onSubmit: SubmitHandler<PayrollReport>;
    handleSubmit: UseFormHandleSubmit<PayrollReport>;
    onDownload: (data: PayrollReport) => void,
    isLoadingMutate: boolean
}

export interface DataPayrollInterface {
    dataPayrollReport: [][] | undefined
}

export interface ResponseApi {
    status: number;
    message: string;
    data:[][]
}