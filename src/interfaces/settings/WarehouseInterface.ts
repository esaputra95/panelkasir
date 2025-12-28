import { 
    Control,
    FieldErrors,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue
} from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";
import { OptionSelectInterface } from "../globalInterface";

export enum WarehouseStatusEnum {
    open= 'open',
    closed= 'closed',
    fulfilled= 'fulfilled'
}

export enum WarehousesPublish {
    publish= 'publish',
    draft= 'draft',
    new= 'new'
}

export interface WarehouseInterface {
    id?: number;
    name: string;
    description?: string;
    phone?: string;
    email?: string;
    address?: string;
    status?: number;
    expiredDate?: string;
    owner?: OptionSelectInterface;
    ownerId?: string;
    userCreate?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface WarehouseSearchInterface {
    name?: string;
    code?: string;
}

export type WarehouseFormProps = {
	handleSubmit: UseFormHandleSubmit<WarehouseInterface>
	onSubmit: (data:WarehouseInterface) => void;
	register: UseFormRegister<WarehouseInterface>;
    onCancel: () => void;
    errors: FieldErrors<WarehouseInterface>;
    isLoading?: boolean;
    idDetail?: number|null
    setValue: UseFormSetValue<WarehouseInterface>;
    getValues: UseFormGetValues<WarehouseInterface>;
    control: Control<WarehouseInterface>;
    handleOnChange: (key:keyof WarehouseInterface, keyOption:keyof WarehouseInterface, data?: OptionSelectInterface ) => void;
    isLoadingMutate: boolean;
    status: string;
    optionUser: (data: string) => Promise<OptionSelectInterface[]>;
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface WarehouseTableInterface extends Omit<WarehouseInterface, 'classType' | 'classTypeId'> {

}

export interface ApiResponseWarehouse extends ApiResponse {
    data: {
        info: InfoResponse,
        store: WarehouseTableInterface[]
    }
}

export interface ApiResponseUpdateWarehouse extends ApiResponse {
    data: {
        info: InfoResponse,
        store: WarehouseInterface
    }
}