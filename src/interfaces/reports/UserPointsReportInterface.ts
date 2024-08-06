import { Control, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { OptionSelectInterface } from "../globalInterface";

export interface UserPointsReport {
    warehouse?: OptionSelectInterface;
    user?: OptionSelectInterface;
    status: 'create' | 'sent' | 'finish'
    startDate?: string;
    endDate?: string;
    type?: 'view' | 'download'
}

export interface UserPointsReportFilter {
    register: UseFormRegister<UserPointsReport>;
    control: Control<UserPointsReport>;
    onSubmit: SubmitHandler<UserPointsReport>;
    handleSubmit: UseFormHandleSubmit<UserPointsReport>;
    onDownload: (data: UserPointsReport) => void,
    isLoadingMutate: boolean
}

export interface DataPayrollInterface {
    dataUserPointsReport: [][] | undefined
}

export interface ResponseApi {
    status: number;
    message: string;
    data:[][]
}