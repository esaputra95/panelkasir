import { Control, FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";
import { OptionSelectInterface } from "../globalInterface";
import { ClassTypeInterface } from "../master/classTypeInterface";
import { ChangeEvent } from "react";

export interface RecordMateriInterface {
    id?: string;
    date?: string;
    studentId: string;
    student?: OptionSelectInterface;
    materiId: string;
    material?: OptionSelectInterface;
    description?: string;
    advice?: string;
    userCreate?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface RecordMateriSearchInterface {
    name?: string;
    code?: string
}

export interface RecordMateriFormInterface {
    date: string;
    detail: RecordMateriInterface[]
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
    handelOnChangeForm: (event: ChangeEvent<HTMLInputElement>) => void
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}
  
export interface RecordMateriTableInterface extends Omit<RecordMateriInterface, 'classType' | 'classTypeId'> {
    classTypes: ClassTypeInterface
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