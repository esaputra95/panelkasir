import { Control, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { OptionSelectInterface } from "../globalInterface";

export interface MarginsReport {
    warehouse?: OptionSelectInterface;
    storeId?: string;
    accountCash?: OptionSelectInterface;
    accountCashId?: string;
    user?: OptionSelectInterface;
    status: 'create' | 'sent' | 'finish'
    startDate?: string;
    endDate?: string;
    type?: 'view' | 'download' | 'excel'
}

export interface MarginsReportFilter {
    register: UseFormRegister<MarginsReport>;
    control: Control<MarginsReport>;
    onSubmit: SubmitHandler<MarginsReport>;
    handleSubmit: UseFormHandleSubmit<MarginsReport>;
    onDownload: (data: MarginsReport) => void,
    onExcel: (data: MarginsReport) => void,
    isLoadingMutate: boolean
    isLoadingMutateExcel: boolean
}

export interface DataPayrollInterface {
    dataMarginsReport: [][] | undefined
}

export interface ResponseApi {
    status: number;
    message: string;
    data:[][]
}