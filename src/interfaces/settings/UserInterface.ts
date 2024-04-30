import { 
    FieldErrors,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue
} from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";

export enum UserRoleEnum {
    superadmin= 'superadmin',
    // content= 'content',
    // customer_service= 'customer_service',
    // finance= 'finance',
    // operation= 'operation'
}

export interface UserInterface {
    id?: number
    name: string
    email: string
    email_verified_at?: Date | null
    password?: string
    role?: UserRoleEnum | null
    remember_token?: string | null
    created_at?: Date | null
    updated_at?: Date | null
}

export interface UserSearchInterface {
    name?: string;
    code?: string
}

export type UserFormProps = {
	handleSubmit: UseFormHandleSubmit<UserInterface>
	onSubmit: (data:UserInterface) => void;
	register: UseFormRegister<UserInterface>;
    onCancel: () => void;
    errors: FieldErrors<UserInterface>;
    isLoading?: boolean;
    idDetail?: number|null
    setValue: UseFormSetValue<UserInterface>;
    getValues: UseFormGetValues<UserInterface>
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface UserTableInterface extends Omit<UserInterface, 'classType' | 'classTypeId'> {

}

export interface ApiResponseUser extends ApiResponse {
    data: {
        info: InfoResponse,
        user: UserTableInterface[]
    }
}

export interface ApiResponseUpdateUser extends ApiResponse {
    data: {
        info: InfoResponse,
        user: UserInterface
    }
}