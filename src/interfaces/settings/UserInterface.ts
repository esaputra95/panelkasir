import { 
    Control,
    FieldErrors,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch
} from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";
import { UserManagementRoleEnum, UserVerifiedEnum } from "./UserManagementInterface";

export enum UserRoleEnum {
    superadmin= 'superadmin',
    admin= 'admin',
    cashier= 'cashier',
    agent= 'agent',
    afiliator= 'afiliator',
    leader= 'leader'
}

export interface UserInterface {
    id?: string;
    name: string;
    username?:string;
    password?: string;
    email: string;
    phone: string;
    level: UserManagementRoleEnum
    storeId?: string;
    token?: string;
    verified?: UserVerifiedEnum;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
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
    idDetail?: string|null
    setValue: UseFormSetValue<UserInterface>;
    getValues: UseFormGetValues<UserInterface>;
    control: Control<UserInterface>;
    watch: UseFormWatch<UserInterface>
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