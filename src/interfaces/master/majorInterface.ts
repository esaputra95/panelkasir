import { Control, FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";
import { OptionSelectInterface } from "../globalInterface";
import { UniversityInterface } from "./universityInterface";

export interface MajorInterface {
    id?: string;
    code?: string;
    name: string;
    universityId?: string;
    university?: OptionSelectInterface;
    universities?: UniversityInterface;
    description?: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface MajorSearchInterface {
    name?: string;
    code?: string
}

export type MajorFormProps = {
	handleSubmit: UseFormHandleSubmit<MajorInterface>
	onSubmit: (data:MajorInterface) => void;
	register: UseFormRegister<MajorInterface>;
    onCancel: () => void;
    errors: FieldErrors<MajorInterface>;
    isLoading?: boolean;
    idDetail?: string | null;
    optionUniversity: (data: string) => Promise<any>;
    control: Control<UniversityInterface, any>;
}

interface Info {
    page: number;
    limit: number;
    total: number;
  }
  
export interface ClassDataTypeInterface {
    major: MajorInterface[];
    info: Info;
}

export interface ApiResponseMajor extends ApiResponse {
    data: {
        info: InfoResponse,
        major: MajorInterface[]
    }
}