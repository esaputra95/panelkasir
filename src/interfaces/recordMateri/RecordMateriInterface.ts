import { Control, FieldArrayWithId, FieldErrors, UseFormGetValues, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";
import { OptionSelectInterface } from "../globalInterface";
import { ChangeEvent } from "react";
// import { GroupBase, OptionsOrGroups } from "react-select";
import { MaterialInterface } from "../master/materialInterface";
import { StudentInterface } from "../master/studentInterface";
import { UserInterface } from "../userInterface";
import { scheduleDetailInterface } from "../schedule/sessionDetailInterface";
import { SessionInterface } from "../schedule/sessionInterface";

export interface RecordMateriInterface {
    id?: string;
    date?: string;
    studentId: string;
    tentorId?:string;
    student?: OptionSelectInterface;
    materiId: string;
    scheduleDetailId?: string;
    scheduleDetails?: scheduleDetail;
    material?: OptionSelectInterface;
    description?: string;
    advice?: string;
    userCreate?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

interface scheduleDetail extends scheduleDetailInterface {
    schedules: SessionInterface
}

export interface RecordMateriSearchInterface {
    name?: string;
    code?: string
}

export interface RecordMateriFormInterface {
    id?: string;
    date: string;
    studyGroupId?: string;
    tentorId?:string;
    detail: RecordMateriInterface[];
}

export type RecordMateriFormProps = {
	handleSubmit: UseFormHandleSubmit<RecordMateriFormInterface>
	onSubmit: (data:RecordMateriFormInterface) => void;
	register: UseFormRegister<RecordMateriFormInterface>;
    onCancel: () => void;
    errors: FieldErrors<RecordMateriFormInterface>;
    isLoading?: boolean;
    idDetail?: string | null;
    control: Control<RecordMateriFormInterface>;
    handelOnChangeForm: (event: ChangeEvent<HTMLInputElement>) => void;
    optionStudyGroup: (data: string) => Promise<OptionSelectInterface[]>
    dataOptionStudyGroup: OptionSelectInterface[];
    getListStudents: (date: string, tentorId: string, groupId: string) => Promise<void>;
    getValues: UseFormGetValues<RecordMateriFormInterface>;
    fieldDetails: FieldArrayWithId<RecordMateriFormInterface, "detail", "id">[];
    optionStudent:  (data: string) => Promise<OptionSelectInterface[]>;
    dataOptionStudent: OptionSelectInterface[];
    dataOptionCourse: OptionSelectInterface[];
    optionCourse:  (data: string) => Promise<OptionSelectInterface[]>
    updateStatus: boolean
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}
  
export interface RecordMateriTableInterface extends RecordMateriInterface {
    materials: MaterialInterface,
    students: StudentInterface,
    userTentor: UserInterface
}

export interface ApiResponseRecordMateri extends ApiResponse {
    data: {
        info: InfoResponse,
        recordMateri: RecordMateriTableInterface[]
    }
}

export interface ApiResponseUpdateRecordMateri extends ApiResponse {
    data: {
        info: InfoResponse,
        recordMateri: RecordMateriInterface
    }
}