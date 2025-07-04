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

export enum PaymentMethodRoleEnum {
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
export interface PaymentMethodInterface {
    id?: number;
    name: string;
    image:string;
    balance?: string
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface PaymentMethodSearchInterface {
    name?: string;
    code?: string
}

export type PaymentMethodFormProps = {
	handleSubmit: UseFormHandleSubmit<PaymentMethodInterface>
	onSubmit: (data:PaymentMethodInterface) => void;
	register: UseFormRegister<PaymentMethodInterface>;
    onCancel: () => void;
    errors: FieldErrors<PaymentMethodInterface>;
    isLoading?: boolean;
    idDetail?: number|null
    setValue: UseFormSetValue<PaymentMethodInterface>;
    getValues: UseFormGetValues<PaymentMethodInterface>;
    control: Control<PaymentMethodInterface>;
    watch: UseFormWatch<PaymentMethodInterface>
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface PaymentMethodTableInterface extends Omit<PaymentMethodInterface, 'classType' | 'classTypeId'> {

}

export interface ApiResponsePaymentMethod extends ApiResponse {
    data: {
        info: InfoResponse,
        PaymentMethod: PaymentMethodTableInterface[]
    }
}

export interface ApiResponseUpdatePaymentMethod extends ApiResponse {
    data: {
        info: InfoResponse,
        PaymentMethod: PaymentMethodInterface
    }
}