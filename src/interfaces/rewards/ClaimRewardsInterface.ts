import { 
    Control,
    FieldArrayWithId,
    FieldErrors,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch
} from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";
import { OptionSelectInterface } from "../globalInterface";
import { UserInterface } from "../userInterface";

export enum ClaimRewardsStatusEnum {
    open= 'open',
    closed= 'closed',
    fulfilled= 'fulfilled'
}

export enum ClaimRewardssPublish {
    publish= 'publish',
    draft= 'draft',
    new= 'new'
}

export interface ClaimRewardsInterface {
    id?: number
    invoice?: string
    date: string
    userCreate?: number
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
    transactionNumber?: number
    claimRewardDetails?: ClaimRewardDetailsInterface[]
}

export interface ClaimRewardDetailsInterface {
    id?: number
    userId?: number
    date?: Date
    point?: number
    rewardId?: number
    userCreate?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    rewardOption?: OptionSelectInterface;
    userOption?: OptionSelectInterface;
    users?: UserInterface
    name?: string
    rewardName?: string
}

export interface ClaimRewardsSearchInterface {
    name?: string;
    code?: string
}

export type ClaimRewardsFormProps = {
	handleSubmit: UseFormHandleSubmit<ClaimRewardsInterface>
	onSubmit: (data:ClaimRewardsInterface) => void;
    onCancel: () => void;
    errors: FieldErrors<ClaimRewardsInterface>;
    isLoading?: boolean;
    idDetail?: number|null
    setValue: UseFormSetValue<ClaimRewardsInterface>;
    getValues: UseFormGetValues<ClaimRewardsInterface>;
    control: Control<ClaimRewardsInterface>;
    isLoadingMutate: boolean;
    status: string;
    watch: UseFormWatch<ClaimRewardsInterface>;
    checkTotalPoint: () => Promise<void>
    register: UseFormRegister<ClaimRewardsInterface>;
    fields: FieldArrayWithId<ClaimRewardsInterface, "claimRewardDetails", "id">[]
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface ClaimRewardsTableInterface extends Omit<ClaimRewardsInterface, 'classType' | 'classTypeId'> {

}

export interface ApiResponseClaimRewards extends ApiResponse {
    data: {
        info: InfoResponse,
        ClaimRewards: ClaimRewardsTableInterface[]
    }
}

export interface ApiResponseUpdateClaimRewards extends ApiResponse {
    data: {
        info: InfoResponse,
        ClaimRewards: ClaimRewardsInterface
    }
}