import { Control, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { OptionSelectInterface } from "../globalInterface";

export interface SalesReport {
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

export interface SalesReportFilter {
    register: UseFormRegister<SalesReport>;
    control: Control<SalesReport>;
    onSubmit: SubmitHandler<SalesReport>;
    handleSubmit: UseFormHandleSubmit<SalesReport>;
    onDownload: (data: SalesReport) => void,
    onExcel: (data: SalesReport) => void,
    isLoadingMutate: boolean
    isLoadingMutateExcel: boolean
}

export interface DataPayrollInterface {
    dataSalesReport: [][] | undefined
}

export interface ResponseApi {
    status: number;
    message: string;
    data:[][]
}