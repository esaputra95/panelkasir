import { Control, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { OptionSelectInterface } from "../globalInterface";

export interface ScheduleReport {
    startDate?: string;
    endDate?: string;
    method?: string;
    room?:string;
    typeStudy?:string;
    scheduleType?:OptionSelectInterface;
    course?:OptionSelectInterface;
    student?:OptionSelectInterface;
    tentor?: OptionSelectInterface;
    type?: 'view' | 'download'
}

export interface ScheduleReportFilter {
    register: UseFormRegister<ScheduleReport>;
    control: Control<ScheduleReport>;
    onSubmit: SubmitHandler<ScheduleReport>;
    handleSubmit: UseFormHandleSubmit<ScheduleReport>;
    onDownload: (data: ScheduleReport) => void;
    isLoadingMutate: boolean
}

export interface DataScheduleInterface {
    dataScheduleReport: [][] | undefined
}

export interface ResponseApi {
    status: number;
    message: string;
    data:[][]
}