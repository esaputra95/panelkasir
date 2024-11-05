import { 
    Control,
    FieldErrors,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue
} from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";

export enum MemberStatusEnum {
    open= 'open',
    closed= 'closed',
    fulfilled= 'fulfilled'
}

export enum MembersPublish {
    publish= 'publish',
    draft= 'draft',
    new= 'new'
}

export interface MemberInterface {
    id?: number
    ownerId?: string;
    level?: number;
    name: string;
    phone?: string;
    address?: string
    userCreate?: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface MemberSearchInterface {
    name?: string;
    code?: string
}

export type MemberFormProps = {
	handleSubmit: UseFormHandleSubmit<MemberInterface>
	onSubmit: (data:MemberInterface) => void;
	register: UseFormRegister<MemberInterface>;
    onCancel: () => void;
    errors: FieldErrors<MemberInterface>;
    isLoading?: boolean;
    idDetail?: number|null
    setValue: UseFormSetValue<MemberInterface>;
    getValues: UseFormGetValues<MemberInterface>;
    control: Control<MemberInterface>;
    isLoadingMutate: boolean;
    status: string;
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface MemberTableInterface extends Omit<MemberInterface, 'classType' | 'classTypeId'> {

}

export interface ApiResponseMember extends ApiResponse {
    data: {
        info: InfoResponse,
        member: MemberTableInterface[]
    }
}

export interface ApiResponseUpdateMember extends ApiResponse {
    data: {
        info: InfoResponse,
        member: MemberInterface
    }
}