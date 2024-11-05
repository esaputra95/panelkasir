import { Control, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { OptionSelectInterface } from "../globalInterface";

export interface PurchasesReport {
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

export interface PurchasesReportFilter {
    register: UseFormRegister<PurchasesReport>;
    control: Control<PurchasesReport>;
    onSubmit: SubmitHandler<PurchasesReport>;
    handleSubmit: UseFormHandleSubmit<PurchasesReport>;
    onDownload: (data: PurchasesReport) => void,
    onExcel: (data: PurchasesReport) => void,
    isLoadingMutate: boolean
    isLoadingMutateExcel: boolean
}

export interface DataPayrollInterface {
    dataPurchasesReport: [][] | undefined
}

export interface ResponseApi {
    status: number;
    message: string;
    data:[][]
}