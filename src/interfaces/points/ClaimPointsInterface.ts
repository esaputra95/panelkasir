import { 
    FieldArrayWithId,
    FieldErrors,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormWatch,
} from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";

export enum ClaimPointsStatusEnum {
    open= 'open',
    closed= 'closed',
    fulfilled= 'fulfilled'
}

export enum ClaimPointssPublish {
    publish= 'publish',
    draft= 'draft',
    new= 'new'
}

export interface ClaimPointDetailsInterface {
    id?: number
    claimPointId?: number
    date?: number
    startDate?: Date
    endDate?: Date
    point?: number
    userId?: number
    price?: number
    total?: number
    name?: string
}

export interface ClaimPointsInterface {
    id: number
    invoice: string | null
    date: Date
    userCreate: number | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    transactionNumber: number | null
}

export interface ClaimPointsSearchInterface {
    name?: string;
    code?: string
}

export type ClaimPointsFormProps = {
	handleSubmit: UseFormHandleSubmit<FormInterface>
	onSubmit: (data:FormInterface) => void;
	register: UseFormRegister<FormInterface>;
    onCancel: () => void;
    errors: FieldErrors<FormInterface>;
    isLoading?: boolean;
    isLoadingMutate: boolean;
    status: string;
    checkPoint: (date: string) => Promise<void>;
    fields: FieldArrayWithId<FormInterface, "form", "id">[];
    watch: UseFormWatch<FormInterface>
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface ClaimPointsTableInterface extends Omit<ClaimPointsInterface, 'classType' | 'classTypeId'> {

}

export interface ApiResponseClaimPoints extends ApiResponse {
    data: {
        info: InfoResponse,
        ClaimPoints: ClaimPointsTableInterface[]
    }
}

export interface ApiResponseUpdateClaimPoints extends ApiResponse {
    data: {
        info: InfoResponse,
        ClaimPoints: ClaimPointsInterface
    }
}

export interface FormInterface {
    form: ClaimPointDetailsInterface[],
    date: string;
}