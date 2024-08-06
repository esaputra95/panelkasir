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
import { AgenTypeInterface } from "./agenTypeInterface";

export enum RewardStatusEnum {
    open= 'open',
    closed= 'closed',
    fulfilled= 'fulfilled'
}

export enum RewardsPublish {
    publish= 'publish',
    draft= 'draft',
    new= 'new'
}

export interface RewardInterface {
    id?: number
    name: string
    quantity: number
    description?: string
    agenTypeOption?: OptionSelectInterface[];
    agenTypes?: AgenTypeInterface;
    agenTypeId: number
    userCreate?: number
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface RewardSearchInterface {
    name?: string;
    code?: string
}

export type RewardFormProps = {
	handleSubmit: UseFormHandleSubmit<RewardInterface>
	onSubmit: (data:RewardInterface) => void;
	register: UseFormRegister<RewardInterface>;
    onCancel: () => void;
    errors: FieldErrors<RewardInterface>;
    isLoading?: boolean;
    idDetail?: number|null
    setValue: UseFormSetValue<RewardInterface>;
    getValues: UseFormGetValues<RewardInterface>;
    control: Control<RewardInterface>;
    handleOnChange: (key:keyof RewardInterface, data?: OptionSelectInterface ) => void;
    isLoadingMutate: boolean;
    status: string;
    watch: UseFormWatch<RewardInterface>
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface RewardTableInterface extends Omit<RewardInterface, 'classType' | 'classTypeId'> {

}

export interface ApiResponseReward extends ApiResponse {
    data: {
        info: InfoResponse,
        reward: RewardTableInterface[]
    }
}

export interface ApiResponseUpdateReward extends ApiResponse {
    data: {
        info: InfoResponse,
        reward: RewardInterface
    }
}