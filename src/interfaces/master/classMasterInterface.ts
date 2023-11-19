import { Control, FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";
import { OptionSelectInterface } from "../globalInterface";
import { ClassTypeInterface } from "./classTypeInterface";

export interface ClassMasterInterface {
    id?: string;
    code?: string;
    name: string;
    classType: OptionSelectInterface;
    classTypeId?: string;
    method?: 'online' | 'offline';
    description?: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface ClassMasterSearchInterface {
    name?: string;
    code?: string
}

export type ClassMasterFormProps = {
	handleSubmit: UseFormHandleSubmit<ClassMasterInterface>
	onSubmit: (data:ClassMasterInterface) => void;
	register: UseFormRegister<ClassMasterInterface>;
    onCancel: () => void;
    errors: FieldErrors<ClassMasterInterface>;
    isLoading?: boolean;
    idDetail?: string | null;
    control: Control<ClassMasterInterface>;
    classTypeOption: (data: string) => Promise<{label:string, value:string}[]>
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}
  
export interface ClassMasterTableInterface extends Omit<ClassMasterInterface, 'classType' | 'classTypeId'> {
    classTypes: ClassTypeInterface
}

export interface ApiResponseClassMaster extends ApiResponse {
    data: {
        info: InfoResponse,
        classMaster: ClassMasterTableInterface[]
    }
}

export interface ApiResponseUpdateClassMaster extends ApiResponse {
    data: {
        info: InfoResponse,
        classMaster: ClassMasterInterface
    }
}