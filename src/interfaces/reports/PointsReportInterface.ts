import { Control, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { OptionSelectInterface } from "../globalInterface";

export interface PointsReport {
    warehouse?: OptionSelectInterface;
    user?: OptionSelectInterface;
    status: 'create' | 'sent' | 'finish'
    startDate?: string;
    endDate?: string;
    type?: 'view' | 'download'
}

export interface PointsReportFilter {
    register: UseFormRegister<PointsReport>;
    control: Control<PointsReport>;
    onSubmit: SubmitHandler<PointsReport>;
    handleSubmit: UseFormHandleSubmit<PointsReport>;
    onDownload: (data: PointsReport) => void,
    isLoadingMutate: boolean
}

export interface DataPayrollInterface {
    dataPointsReport: [][] | undefined
}

export interface ResponseApi {
    status: number;
    message: string;
    data:[][]
}