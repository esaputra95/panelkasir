import { Control, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { OptionSelectInterface } from "../globalInterface";

export interface ReportBase {
    warehouse?: OptionSelectInterface;
    storeId?: string;
    accountCash?: OptionSelectInterface;
    accountCashId?: string;
    user?: OptionSelectInterface;
    startDate?: string;
    endDate?: string;
    type?: 'view' | 'download' | 'excel'
}

export interface ReportFilterProps<T extends ReportBase> {
    register: UseFormRegister<T>;
    control: Control<T>;
    onSubmit: SubmitHandler<T>;
    handleSubmit: UseFormHandleSubmit<T>;
    onDownload: (data: T) => void,
    onExcel: (data: T) => void,
    isLoadingMutate: boolean
    isLoadingMutateExcel: boolean
}

export interface ReportDataProps {
    data: [][] | undefined
}

export interface ResponseApi {
    status: number;
    message: string;
    data:[][]
}
