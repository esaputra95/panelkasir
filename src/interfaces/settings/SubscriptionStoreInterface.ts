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

export enum SubscriptionStoreRoleEnum {
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

export interface SubscriptionStoreInterface {
    id?: string;
    storeId: string;
    startDate: string; // ISO format date string
    endDate: string;
    userCreate?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    stores?: Store;
    users?: User;
}

export interface Store {
    id: string;
    name: string;
    ownerId: string;
    address: string;
    expiredDate: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    userCreate: string | null;
}

export interface User {
    id: string;
    name: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    level: string;       // e.g. "owner"
    verified: string;    // e.g. "active"
    storeId: string | null;
    createdAt: string;
    updatedAt: string;
    token: string;
    deletedAt: string | null;
    userCreate: string | null;
}

export interface SubscriptionStoreSearchInterface {
    name?: string;
    code?: string
}

export type SubscriptionStoreFormProps = {
	handleSubmit: UseFormHandleSubmit<SubscriptionStoreInterface>
	onSubmit: (data:SubscriptionStoreInterface) => void;
	register: UseFormRegister<SubscriptionStoreInterface>;
    onCancel: () => void;
    errors: FieldErrors<SubscriptionStoreInterface>;
    isLoading?: boolean;
    idDetail?: string|null
    setValue: UseFormSetValue<SubscriptionStoreInterface>;
    getValues: UseFormGetValues<SubscriptionStoreInterface>;
    control: Control<SubscriptionStoreInterface>;
    watch: UseFormWatch<SubscriptionStoreInterface>
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface ApiResponseSubscriptionStore extends ApiResponse {
    data: {
        info: InfoResponse,
        subscriptionStore: SubscriptionStoreInterface[]
    }
}

export interface ApiResponseUpdateSubscriptionStore extends ApiResponse {
    data: {
        info: InfoResponse,
        subscriptionStore: SubscriptionStoreInterface
    }
}