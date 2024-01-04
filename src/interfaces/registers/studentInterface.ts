import { Control, FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";
import { ClassTypeInterface } from "../master/classTypeInterface";
import { StudentInterface } from "../master/studentInterface";

export interface StudentRegisterInterface extends StudentInterface {
}

export interface StudentSearchInterface {
    name?: string;
    code?: string
}

export type StudentFormProps = {
	handleSubmit: UseFormHandleSubmit<StudentInterface>
	onSubmit: (data:StudentInterface) => void;
	register: UseFormRegister<StudentInterface>;
    onCancel: () => void;
    errors: FieldErrors<StudentInterface>;
    isLoading?: boolean;
    idDetail?: string | null;
    control: Control<StudentInterface>;
    classTypeOption: (data: string) => Promise<{label:string, value:string}[]>
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface StudentTableInterface extends Omit<StudentInterface, 'classType' | 'classTypeId'> {
    classTypes: ClassTypeInterface
}

export interface ApiResponseStudent extends ApiResponse {
    data: {
        info: InfoResponse,
        student: StudentTableInterface[]
    }
}

export interface ApiResponseUpdateStudent extends ApiResponse {
    data: {
        info: InfoResponse,
        student: StudentInterface
    }
}