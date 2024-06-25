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
import { CityInterface, DistrictInterface, ProvinceInterface } from "./AddressInterface";
import { ChangeEvent } from "react";

export enum MosqueTypeEnum {
    transfer= 'transfer',
    va= 'va',
    ewallet= 'ewallet',
    retail= 'retail',
    qr= 'qr'
}



export enum MosqueStatusEnum {
    email_verify= 'email_verify',
    active= 'active',
    block= 'block'
}

export interface MosqueInterface {
    id?: number
    uuid?: string
    code?: string
    place_typology_id?: number;
    username?: string;
    password?: string;
    name: string
    phone: string;
    description?: string;
    address: string;
    bankAccount?: string;
    street?: string;
    subdistrict?: string;
    district?: string;
    districtOption?: OptionSelectInterface
    cityOption?: OptionSelectInterface
    city?: string;
    province?: string;
    provinceOption?: OptionSelectInterface
    country?: string;
    lat?: number;
    lng?: number;
    postalcode?: string;
    since_year?: number;
    monthly_infaq?: number;
    capacity?: number;
    type?: string
    visimisi?: string;
    verified?: boolean
    funded?: number
    published_at?: Date;
    created_at?: Date;
    updated_at?: Date;
    provinces?: ProvinceInterface;
    cities?: CityInterface;
    districts?: DistrictInterface;
    image?: string;
}

export interface MosqueSearchInterface {
    name?: string;
    code?: string
}

export type MosqueFormProps = {
	handleSubmit: UseFormHandleSubmit<MosqueInterface>
	onSubmit: (data:MosqueInterface) => void;
	register: UseFormRegister<MosqueInterface>;
    onCancel: () => void;
    errors: FieldErrors<MosqueInterface>;
    isLoading?: boolean;
    idDetail?: number|null
    setValue: UseFormSetValue<MosqueInterface>;
    getValues: UseFormGetValues<MosqueInterface>;
    control: Control<MosqueInterface>;
    watch: UseFormWatch<MosqueInterface>;
    handleOnChangeSelect: (key: keyof MosqueInterface, value: OptionSelectInterface) => void;
    handleOnChangeImage: (e: ChangeEvent<HTMLInputElement>) => void;
    loading: boolean
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface MosqueTableInterface extends Omit<MosqueInterface, 'classType' | 'classTypeId'> {

}

export interface ApiResponseMosque extends ApiResponse {
    data: {
        info: InfoResponse,
        Mosques: MosqueTableInterface[]
    }
}

export interface ApiResponseUpdateMosque extends ApiResponse {
    data: {
        info: InfoResponse,
        Mosques: MosqueInterface
    }
}