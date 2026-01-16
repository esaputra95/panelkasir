import { Control, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { OptionSelectInterface } from "../globalInterface";

export interface SubscriptionReport {
    store?: OptionSelectInterface;
    storeId?: string;
    startDate?: string;
    endDate?: string;
    type?: 'view' | 'download' | 'excel'
}

export interface SubscriptionReportFilter {
    register: UseFormRegister<SubscriptionReport>;
    control: Control<SubscriptionReport>;
    onSubmit: SubmitHandler<SubscriptionReport>;
    handleSubmit: UseFormHandleSubmit<SubscriptionReport>;
    onDownload: (data: SubscriptionReport) => void,
    onExcel: (data: SubscriptionReport) => void,
    isLoadingMutate: boolean
    isLoadingMutateExcel: boolean
}

export interface DataSubscriptionReportInterface {
    dataSubscriptionReport: [][] | undefined
}

export interface ResponseApi {
    status: number;
    message: string;
    data:[][]
}
