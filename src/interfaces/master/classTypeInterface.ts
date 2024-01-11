import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";

export interface ClassTypeInterface {
    id?: string;
    code?: string;
    name: string;
    price: number;
    quantity:number;
    description?: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface ClassTypeSearchInterface {
    name?: string;
    code?: string
}

export type ClassTypeFormProps = {
	handleSubmit: UseFormHandleSubmit<ClassTypeInterface>
	onSubmit: (data:ClassTypeInterface) => void;
	register: UseFormRegister<ClassTypeInterface>;
    onCancel: () => void;
    errors: FieldErrors<ClassTypeInterface>;
    isLoading?: boolean;
    idDetail?: string | null
}

interface Info {
    page: number;
    limit: number;
    total: number;
  }
  
export interface ClassDataTypeInterface {
    classType: ClassTypeInterface[];
    info: Info;
}

export interface ApiResponseClassType extends ApiResponse {
    data: {
        info: InfoResponse,
        classType: ClassTypeInterface[]
    }
}

export interface ClassTypeFilter {
    name?: string,
    code?:string
}