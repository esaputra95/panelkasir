import { Control, FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"
import { StudentInterface } from "../master/studentInterface";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";

export interface RegisterInterface extends StudentInterface {
    packageId?: any;
    sessionId?: any;
    status?: number;
}

export interface QueryStudentInterface {
    name?: string
}

export interface RegisterFormInterface {
    handleSubmit: UseFormHandleSubmit<RegisterInterface>
	onSubmit: (data:RegisterInterface) => void;
	register: UseFormRegister<RegisterInterface>;
    onCancel?: () => void;
    optionPackage: (data: any) => Promise<any>
    optionSession: (data: any) => Promise<any>
    optionGuidanceType: (data: any) => Promise<any>
    errors?: FieldErrors<RegisterInterface>;
    isLoading?: boolean;
    idDetail?: string | null;
    control?: Control<RegisterInterface, any>
}

export interface RegisterSearchInterface extends RegisterInterface {
    page?: number;
    limit?: number;
    order?: string
}

export interface ApiResponseRegister extends ApiResponse {
    data: {
        info: InfoResponse,
        register: RegisterInterface[]
    }
}