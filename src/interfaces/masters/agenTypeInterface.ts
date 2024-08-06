import { 
    Control,
    FieldErrors,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue
} from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";

export enum AgenTypeStatusEnum {
    open= 'open',
    closed= 'closed',
    fulfilled= 'fulfilled'
}

export enum AgenTypesPublish {
    publish= 'publish',
    draft= 'draft',
    new= 'new'
}

export interface AgenTypeInterface {
    id?: number;
    name: string;
    description: string;
    type: 'stockist' | 'point';
    level: number;
    userCreate?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface AgenTypeSearchInterface {
    name?: string;
    code?: string
}

export type AgenTypeFormProps = {
	handleSubmit: UseFormHandleSubmit<AgenTypeInterface>
	onSubmit: (data:AgenTypeInterface) => void;
	register: UseFormRegister<AgenTypeInterface>;
    onCancel: () => void;
    errors: FieldErrors<AgenTypeInterface>;
    isLoading?: boolean;
    idDetail?: number|null
    setValue: UseFormSetValue<AgenTypeInterface>;
    getValues: UseFormGetValues<AgenTypeInterface>;
    control: Control<AgenTypeInterface>;
    isLoadingMutate: boolean;
    status: string;
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface AgenTypeTableInterface extends Omit<AgenTypeInterface, 'classType' | 'classTypeId'> {

}

export interface ApiResponseAgenType extends ApiResponse {
    data: {
        info: InfoResponse,
        AgenType: AgenTypeTableInterface[]
    }
}

export interface ApiResponseUpdateAgenType extends ApiResponse {
    data: {
        info: InfoResponse,
        AgenType: AgenTypeInterface
    }
}