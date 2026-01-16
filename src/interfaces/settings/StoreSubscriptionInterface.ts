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

export enum StoreSubscriptionTypeEnum {
    TRIAL = 'TRIAL',
    PAID = 'PAID',
}

export enum StoreSubscriptionStatusEnum {
    ACTIVE = 'ACTIVE',
    EXPIRED = 'EXPIRED',
    CANCELLED = 'CANCELLED'
}

export interface StoreSubscriptionInterface {
    id?: string;
    storeId: string;
    type: StoreSubscriptionTypeEnum;
    startDate: Date | string;
    endDate: Date | string;
    durationMonth: number;
    price: number;
    status: StoreSubscriptionStatusEnum;
    paymentRef?: string;
    createdAt?: Date;
    updatedAt?: Date;
    userCreate?: string;
    store?: {
        id?: string;
        name?: string;
    };
    user?: {
        id?: string;
        name?: string;
    };
}

export interface StoreSubscriptionSearchInterface {
    storeId?: string;
    type?: string;
    status?: string;
}

export type StoreSubscriptionFormProps = {
    handleSubmit: UseFormHandleSubmit<StoreSubscriptionInterface>
    onSubmit: (data:StoreSubscriptionInterface) => void;
    register: UseFormRegister<StoreSubscriptionInterface>;
    onCancel: () => void;
    errors: FieldErrors<StoreSubscriptionInterface>;
    isLoading?: boolean;
    idDetail?: string|null
    setValue: UseFormSetValue<StoreSubscriptionInterface>;
    getValues: UseFormGetValues<StoreSubscriptionInterface>;
    control: Control<StoreSubscriptionInterface>;
    watch: UseFormWatch<StoreSubscriptionInterface>
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface StoreSubscriptionTableInterface extends StoreSubscriptionInterface {

}

export interface ApiResponseStoreSubscription extends ApiResponse {
    data: {
        info: InfoResponse,
        storeSubscriptions: StoreSubscriptionTableInterface[]
    }
}

export interface ApiResponseUpdateStoreSubscription extends ApiResponse {
    data: {
        info: InfoResponse,
        storeSubscription: StoreSubscriptionInterface
    }
}
