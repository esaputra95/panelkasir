import { Control, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { OptionSelectInterface } from "../globalInterface";

export interface DonationReport {
    tentor?: OptionSelectInterface;
    startDate?: string;
    endDate?: string;
    type?: 'view' | 'download',
    status?: string
}

export interface DonationReportFilter {
    register: UseFormRegister<DonationReport>;
    control: Control<DonationReport>;
    onSubmit: SubmitHandler<DonationReport>;
    handleSubmit: UseFormHandleSubmit<DonationReport>;
    onDownload: (data: DonationReport) => void,
    isLoadingMutate: boolean
}

export interface DataDonationInterface {
    dataDonationReport: [][] | undefined
}

export interface ResponseApi {
    status: number;
    message: string;
    data:[][]
}