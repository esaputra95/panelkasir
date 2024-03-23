import { Control, SubmitHandler, UseFormGetValues, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { OptionSelectInterface } from "../globalInterface";

export interface RecordMateriReport {
    tentor?: OptionSelectInterface;
    student?: OptionSelectInterface;
    material?: OptionSelectInterface;
    startDate?: string;
    endDate?: string;
    type?: 'view' | 'download'
}

export interface RecordMateriReportFilter {
    register: UseFormRegister<RecordMateriReport>;
    optionTutor : (data: string) => Promise<OptionSelectInterface[]>;
    optionStudentAll: (data: string) => Promise<OptionSelectInterface[]>;
    optionCourse: (data: string) => Promise<OptionSelectInterface[]>;
    control: Control<RecordMateriReport>;
    onSubmit: SubmitHandler<RecordMateriReport>;
    handleSubmit: UseFormHandleSubmit<RecordMateriReport>;
    onDownload: (data: RecordMateriReport) => void
}

export interface DataRecordMateriInterface {
    dataRecordMateriReport: [][] | undefined;
    getValues: UseFormGetValues<RecordMateriReport>
}

export interface ResponseApi {
    status: number;
    message: string;
    data:[][]
}