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
import { OptionSelectInterface } from "../globalInterface";

export enum UserRoleEnum {
    superadmin= 'superadmin',
    admin= 'admin',
    cashier= 'cashier',
    agent= 'agent',
    afiliator= 'afiliator',
    leader= 'leader'
}



export interface UserInterface {
    id?: number;
    code?: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    agentTypeId: number;
    agentTypeOption?: OptionSelectInterface;
    role: UserRoleEnum;
    leaderId?: number;
    referrerId?: number;
    leaderOption?: OptionSelectInterface;
    referrerOption?: OptionSelectInterface;
    password?: string;
    warehouseId?: number;
    ktpImage?: string;
    kkImage?: string;
    profileImage?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    userCreate?: number;
    token?: string;
    refreshToken?: string;
    status?: number;
    stockist?: number;
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