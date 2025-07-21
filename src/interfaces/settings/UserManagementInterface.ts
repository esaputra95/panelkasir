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

export enum UserManagementRoleEnum {
    superadmin= 'superadmin',
    admin= 'admin',
    cashier= 'cashier',
    owner='owner',
    supervisor='supervisor'
}

export enum UserVerifiedEnum {
    active='active',
    email_verification='emil_verification',
    non_active='non_active'
}
export interface UserManagementInterface {
    id?: number;
    name: string;
    username?:string;
    password?: string;
    email: string;
    phone?: string;
    level: UserManagementRoleEnum
    storeId?: string;
    token?: string;
    verified?: UserVerifiedEnum;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface UserManagementSearchInterface {
    name?: string;
    code?: string
}

export type UserManagementFormProps = {
	handleSubmit: UseFormHandleSubmit<UserManagementInterface>
	onSubmit: (data:UserManagementInterface) => void;
	register: UseFormRegister<UserManagementInterface>;
    onCancel: () => void;
    errors: FieldErrors<UserManagementInterface>;
    isLoading?: boolean;
    idDetail?: number|null
    setValue: UseFormSetValue<UserManagementInterface>;
    getValues: UseFormGetValues<UserManagementInterface>;
    control: Control<UserManagementInterface>;
    watch: UseFormWatch<UserManagementInterface>
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface UserManagementTableInterface extends Omit<UserManagementInterface, 'classType' | 'classTypeId'> {

}

export interface ApiResponseUserManagement extends ApiResponse {
    data: {
        info: InfoResponse,
        UserManagement: UserManagementTableInterface[]
    }
}

export interface ApiResponseUpdateUserManagement extends ApiResponse {
    data: {
        info: InfoResponse,
        UserManagement: UserManagementInterface
    }
}