import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";

export interface TutorInterface {
    id?: string;
    code?: string;
    name: string;
    price: number;
    description?: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface TutorSearchInterface {
    name?: string;
    code?: string
}

export type TutorFormProps = {
	handleSubmit: UseFormHandleSubmit<TutorInterface>
	onSubmit: (data:TutorInterface) => void;
	register: UseFormRegister<TutorInterface>;
    onCancel: () => void;
    errors: FieldErrors<TutorInterface>;
    isLoading?: boolean;
    idDetail?: string | null
}

interface Info {
    page: number;
    limit: number;
    total: number;
  }
  
export interface ClassDataTypeInterface {
    tutor: TutorInterface[];
    info: Info;
}

export interface ApiResponseTutor extends ApiResponse {
    data: {
        info: InfoResponse,
        tutor: TutorInterface[]
    }
}

export interface TutorFilter {
    name?: string,
    code?:string
}