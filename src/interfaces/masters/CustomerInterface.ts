import { 
    FieldErrors,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue
} from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";

export enum CustomerTypeEnum {
    transfer= 'transfer',
    va= 'va',
    ewallet= 'ewallet',
    retail= 'retail',
    qr= 'qr'
}



export enum CustomerStatusEnum {
    email_verify= 'email_verify',
    active= 'active',
    block= 'block'
}

export interface CustomerInterface {
    id?: number;
    name: string;
    email: string;
    address?: string;
    photo?: string;
    province_id?: number;
    city_id?: number;
    district_id?: number
    subdistrict_id?: number;
    password?: string
    phone?: string;
    status: CustomerStatusEnum;
    reg_id?: string;
    google_id?: string;
    facebook_id?: string;
    zipay?: string;
    zipay_status?: boolean;
    zipay_token?: string;
    zipay_account_name?: string;
    device_name?: string;
    device_id?: string;
    token?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    is_mitra?: boolean;
}

export interface CustomerSearchInterface {
    name?: string;
    code?: string
}

export type CustomerFormProps = {
	handleSubmit: UseFormHandleSubmit<CustomerInterface>
	onSubmit: (data:CustomerInterface) => void;
	register: UseFormRegister<CustomerInterface>;
    onCancel: () => void;
    errors: FieldErrors<CustomerInterface>;
    isLoading?: boolean;
    idDetail?: number | null;
    setValue: UseFormSetValue<CustomerInterface>;
    getValues: UseFormGetValues<CustomerInterface>
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface CustomerTableInterface extends Omit<CustomerInterface, 'classType' | 'classTypeId'> {

}

export interface ApiResponseCustomer extends ApiResponse {
    data: {
        info: InfoResponse,
        Customers: CustomerTableInterface[]
    }
}

export interface ApiResponseUpdateCustomer extends ApiResponse {
    data: {
        info: InfoResponse,
        Customers: CustomerInterface
    }
}