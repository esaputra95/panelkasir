import { Control, FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";
import { OptionSelectInterface } from "../globalInterface";
import { StudentInterface } from "../master/studentInterface";
import { RegisterInterface } from "../public/registerInterface";
import { PackageInterface } from "../settings/packageInterface";
import { SessionInterface } from "../settings/sessionInterface";

export interface RegistrationInterface extends RegisterInterface {
    students: StudentInterface,
    packages: PackageInterface,
    sessions: SessionInterface
}

export interface RegistrationSearchInterface {
    name?: string;
    code?: string
}

export type RegistrationFormProps = {
	handleSubmit: UseFormHandleSubmit<RegistrationInterface>
	onSubmit: (data:RegistrationInterface) => void;
	register: UseFormRegister<RegistrationInterface>;
    onCancel: () => void;
    errors: FieldErrors<RegistrationInterface>;
    isLoading?: boolean;
    idDetail?: string | null;
    control: Control<RegistrationInterface, any>;
    classTypeOption: (data: any) => Promise<any>
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}
  
export interface RegistrationTableInterface extends RegistrationInterface {
    classTypes: RegistrationInterface
}

export interface ApiResponseRegistration extends ApiResponse {
    data: {
        info: InfoResponse,
        register: RegistrationTableInterface[]
    }
}

export interface ApiResponseUpdateRegistration extends ApiResponse {
    data: {
        info: InfoResponse,
        register: RegistrationInterface
    }
}