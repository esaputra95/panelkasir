import { Control, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { OptionSelectInterface } from "../globalInterface";

export interface ClaimPointsReport {
    warehouse?: OptionSelectInterface;
    user?: OptionSelectInterface;
    status: 'create' | 'sent' | 'finish'
    startDate?: string;
    endDate?: string;
    type?: 'view' | 'download'
}

export interface ClaimPointsReportFilter {
    register: UseFormRegister<ClaimPointsReport>;
    control: Control<ClaimPointsReport>;
    onSubmit: SubmitHandler<ClaimPointsReport>;
    handleSubmit: UseFormHandleSubmit<ClaimPointsReport>;
    onDownload: (data: ClaimPointsReport) => void,
    isLoadingMutate: boolean
}

export interface DataPayrollInterface {
    dataClaimPointsReport: [][] | undefined
}

export interface ResponseApi {
    status: number;
    message: string;
    data:[][]
}