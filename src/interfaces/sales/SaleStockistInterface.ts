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
import { SaleStockistDetailInterface } from "./SaleStockistDetailInterface";
import { UserInterface } from "../userInterface";
import { WarehouseInterface } from "../settings/WarehouseInterface";

export interface SaleStockistInterface {
    id?: number;
    date: string,
    status: 'create' | 'sent' | 'return' | 'finish',
    invoice: string;
    userId: number;
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
    SaleStockistDetails: SaleStockistDetailInterface[]
    warehouses?: WarehouseInterface
}

export interface SaleStockistSearchInterface {
    name?: string;
    code?: string
}

export type SaleStockistFormProps = {
	handleSubmit: UseFormHandleSubmit<SaleStockistInterface>
	onSubmit: (data:SaleStockistInterface) => void;
	register: UseFormRegister<SaleStockistInterface>;
    onCancel: () => void;
    errors: FieldErrors<SaleStockistInterface>;
    isLoading?: boolean;
    idDetail?: number|null
    setValue: UseFormSetValue<SaleStockistInterface>;
    getValues: UseFormGetValues<SaleStockistInterface>;
    control: Control<SaleStockistInterface>;
    handleOnChange: (key:keyof SaleStockistInterface, keyOption:keyof SaleStockistInterface, data?: OptionSelectInterface ) => void;
    isLoadingMutate: boolean;
    status: string;
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface SaleStockistTableInterface extends SaleStockistInterface {
    users?: UserInterface
}

export interface ApiResponseSaleStockist extends ApiResponse {
    data: {
        info: InfoResponse,
        SaleStockist: SaleStockistTableInterface[]
    }
}

export interface ApiResponseUpdateSaleStockist extends ApiResponse {
    data: {
        info: InfoResponse,
        SaleStockist: SaleStockistInterface
    }
}