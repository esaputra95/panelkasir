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

export enum BankAccountStatusEnum {
    open= 'open',
    closed= 'closed',
    fulfilled= 'fulfilled'
}

export enum BankAccountsPublish {
    publish= 'publish',
    draft= 'draft',
    new= 'new'
}

export interface BankAccountInterface {
    id?: number;
    name: string;
    description?: string;
    userCreate?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface BankAccountSearchInterface {
    name?: string;
    code?: string
}

export type BankAccountFormProps = {
	handleSubmit: UseFormHandleSubmit<BankAccountInterface>
	onSubmit: (data:BankAccountInterface) => void;
	register: UseFormRegister<BankAccountInterface>;
    onCancel: () => void;
    errors: FieldErrors<BankAccountInterface>;
    isLoading?: boolean;
    idDetail?: number|null
    setValue: UseFormSetValue<BankAccountInterface>;
    getValues: UseFormGetValues<BankAccountInterface>;
    control: Control<BankAccountInterface>;
    handleOnChange: (key:keyof BankAccountInterface, data?: OptionSelectInterface ) => void;
    isLoadingMutate: boolean;
    status: string;
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface BankAccountTableInterface extends Omit<BankAccountInterface, 'classType' | 'classTypeId'> {

}

export interface ApiResponseBankAccount extends ApiResponse {
    data: {
        info: InfoResponse,
        account: BankAccountTableInterface[]
    }
}

export interface ApiResponseUpdateBankAccount extends ApiResponse {
    data: {
        info: InfoResponse,
        account: BankAccountInterface
    }
}