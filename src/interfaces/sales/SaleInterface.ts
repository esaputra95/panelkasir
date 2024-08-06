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
import { SaleDetailInterface } from "./SaleDetailInterface";
import { UserInterface } from "../userInterface";
import { WarehouseInterface } from "../settings/WarehouseInterface";
import { MemberInterface } from "../masters/MemberInterface";

export interface SaleInterface {
    id?: number;
    date: string,
    status: 'create' | 'sent' | 'return' | 'finish',
    invoice: string;
    userId: number;
    memberId?: number;
    memberOption?: OptionSelectInterface;
    userOption?: OptionSelectInterface;
    total?: number;
    point?: number;
    tax?: number;
    warehouseId: number;
    warehouseOption?: OptionSelectInterface;
    accountBankId?: number;
    cost?: number;
    shippingCost?: number;
    userCreate?: number;
    pay?: number;
    remainder?: number;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    saleDetails: SaleDetailInterface[]
    warehouses?: WarehouseInterface
    members?: MemberInterface
}

export interface SaleSearchInterface {
    name?: string;
    code?: string
}

export type SaleFormProps = {
	handleSubmit: UseFormHandleSubmit<SaleInterface>
	onSubmit: (data:SaleInterface) => void;
	register: UseFormRegister<SaleInterface>;
    onCancel: () => void;
    errors: FieldErrors<SaleInterface>;
    isLoading?: boolean;
    idDetail?: number|null
    setValue: UseFormSetValue<SaleInterface>;
    getValues: UseFormGetValues<SaleInterface>;
    control: Control<SaleInterface>;
    handleOnChange: (key:keyof SaleInterface, keyOption:keyof SaleInterface, data?: OptionSelectInterface ) => void;
    isLoadingMutate: boolean;
    status: string;
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface SaleTableInterface extends SaleInterface {
    users?: UserInterface
}

export interface ApiResponseSale extends ApiResponse {
    data: {
        info: InfoResponse,
        Sale: SaleTableInterface[]
    }
}

export interface ApiResponseUpdateSale extends ApiResponse {
    data: {
        info: InfoResponse,
        Sale: SaleInterface
    }
}