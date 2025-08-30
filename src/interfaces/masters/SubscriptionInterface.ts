import { 
    Control,
    FieldErrors,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue
} from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";

export enum SubscriptionStatusEnum {
    open= 'open',
    closed= 'closed',
    fulfilled= 'fulfilled'
}

export enum SubscriptionsPublish {
    publish= 'publish',
    draft= 'draft',
    new= 'new'
}

export interface SubscriptionInterface {
    id?: string;
    storeId?: string | null;
    startDate?: Date | null;
    endDate?: Date | null;
    userCreate?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    }

export interface SubscriptionSearchInterface {
    name?: string;
    code?: string
}

export type SubscriptionFormProps = {
	handleSubmit: UseFormHandleSubmit<SubscriptionInterface>
	onSubmit: (data:SubscriptionInterface) => void;
	register: UseFormRegister<SubscriptionInterface>;
    onCancel: () => void;
    errors: FieldErrors<SubscriptionInterface>;
    isLoading?: boolean;
    idDetail?: string|null
    setValue: UseFormSetValue<SubscriptionInterface>;
    getValues: UseFormGetValues<SubscriptionInterface>;
    control: Control<SubscriptionInterface>;
    isLoadingMutate: boolean;
    status: string;
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface SubscriptionTableInterface extends Omit<SubscriptionInterface, 'classType' | 'classTypeId'> {

}

export interface ApiResponseSubscription extends ApiResponse {
    data: {
        info: InfoResponse,
        Subscription: SubscriptionTableInterface[]
    }
}

export interface ApiResponseUpdateSubscription extends ApiResponse {
    data: {
        info: InfoResponse,
        Subscription: SubscriptionInterface
    }
}