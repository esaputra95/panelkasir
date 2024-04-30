import { 
    FieldErrors,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue
} from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";

export enum BankTypeEnum {
    transfer= 'transfer',
    va= 'va',
    ewallet= 'ewallet',
    retail= 'retail',
    qr= 'qr'
}

export enum BankStatusEnum {
    publish='publish',
    draft='draft'
}

export interface BankInterface {
    id?: number;
    code: string;
    name: string;
    branch?: string;
    description?: string;
    tutorial?: string;
    account_name: string;
    type: BankTypeEnum;
    image?: string;
    account_number?: string;
    status: BankStatusEnum;
    bank?: string;
    bank_account_name?: string
    created_at?: Date
    updated_at?: Date
}

export interface BankSearchInterface {
    name?: string;
    code?: string
}

export type BankFormProps = {
	handleSubmit: UseFormHandleSubmit<BankInterface>
	onSubmit: (data:BankInterface) => void;
	register: UseFormRegister<BankInterface>;
    onCancel: () => void;
    errors: FieldErrors<BankInterface>;
    isLoading?: boolean;
    idDetail?: number | null;
    setValue: UseFormSetValue<BankInterface>;
    getValues: UseFormGetValues<BankInterface>
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface BankTableInterface extends Omit<BankInterface, 'classType' | 'classTypeId'> {

}

export interface ApiResponseBank extends ApiResponse {
    data: {
        info: InfoResponse,
        banks: BankTableInterface[]
    }
}

export interface ApiResponseUpdateBank extends ApiResponse {
    data: {
        info: InfoResponse,
        banks: BankInterface
    }
}