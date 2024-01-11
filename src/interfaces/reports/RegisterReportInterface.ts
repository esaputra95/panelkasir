import { Control, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { OptionSelectInterface } from "../globalInterface";

export interface RegisterReport {
    startDate?: string;
    endDate?: string;
    method?: string;
    room?:string;
    typeStudy?:string;
    RegisterType?:OptionSelectInterface;
    course?:OptionSelectInterface
    type?: 'view' | 'download'
}

export interface RegisterReportFilter {
    register: UseFormRegister<RegisterReport>;
    control: Control<RegisterReport>;
    onSubmit: SubmitHandler<RegisterReport>;
    handleSubmit: UseFormHandleSubmit<RegisterReport>;
    onDownload: (data: RegisterReport) => void;
    isLoadingMutate: boolean
}

export interface DataRegisterInterface {
    dataRegisterReport: [][] | undefined
}

export interface ResponseApi {
    status: number;
    message: string;
    data:[][]
}