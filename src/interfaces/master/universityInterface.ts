import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";

export interface UniversityInterface {
    id?: string;
    code?: string;
    name: string;
    description?: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface UniversitySearchInterface {
    name?: string;
    code?: string
}

export type UniversityFormProps = {
	handleSubmit: UseFormHandleSubmit<UniversityInterface>
	onSubmit: (data:UniversityInterface) => void;
	register: UseFormRegister<UniversityInterface>;
    onCancel: () => void;
    errors: FieldErrors<UniversityInterface>;
    isLoading?: boolean;
    idDetail?: string | null
}

interface Info {
    page: number;
    limit: number;
    total: number;
  }
  
export interface ClassDataTypeInterface {
    university: UniversityInterface[];
    info: Info;
}

export interface ApiResponseUniversity extends ApiResponse {
    data: {
        info: InfoResponse,
        university: UniversityInterface[]
    }
}