import { Control, FieldErrors, UseFormGetValues, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"
import { StudentInterface } from "../master/studentInterface";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";
import { OptionSelectInterface } from "../globalInterface";
import { ChangeEvent } from "react";

export interface RegisterInterface extends StudentInterface {
    packageId?: string;
    sessionId?: string;
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
    optionPackage: (data: string) => Promise<OptionSelectInterface[]>
    optionSession: (data: string) => Promise<OptionSelectInterface[]>
    optionGuidanceType: (data: string) => Promise<OptionSelectInterface[]>
    errors?: FieldErrors<RegisterInterface>;
    isLoading?: boolean;
    idDetail?: string | null;
    control?: Control<RegisterInterface>;
    handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
    getValues: UseFormGetValues<RegisterInterface>
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