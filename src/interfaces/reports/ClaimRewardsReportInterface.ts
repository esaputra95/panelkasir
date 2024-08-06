import { Control, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { OptionSelectInterface } from "../globalInterface";

export interface ClaimRewardsReport {
    warehouse?: OptionSelectInterface;
    user?: OptionSelectInterface;
    status: 'create' | 'sent' | 'finish'
    startDate?: string;
    endDate?: string;
    type?: 'view' | 'download'
}

export interface ClaimRewardsReportFilter {
    register: UseFormRegister<ClaimRewardsReport>;
    control: Control<ClaimRewardsReport>;
    onSubmit: SubmitHandler<ClaimRewardsReport>;
    handleSubmit: UseFormHandleSubmit<ClaimRewardsReport>;
    onDownload: (data: ClaimRewardsReport) => void,
    isLoadingMutate: boolean
}

export interface DataPayrollInterface {
    dataClaimRewardsReport: [][] | undefined
}

export interface ResponseApi {
    status: number;
    message: string;
    data:[][]
}