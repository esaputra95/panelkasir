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
import { ApiResponseDonationCategory, DonationCategoryInterface } from "./DonationCategoryInterface";
import { ChangeEvent, Dispatch, RefObject, SetStateAction } from "react";
import { MosqueInterface } from "../masters/MosqueInterface";

export enum DonationStatusEnum {
    open= 'open',
    closed= 'closed',
    fulfilled= 'fulfilled'
}

export enum DonationsPublish {
    publish= 'publish',
    draft= 'draft',
    new= 'new'
}

export interface DonationInterface {
    id?: number;
    mosque_id?: number;
    mosques?: MosqueInterface
    mosqueOption?:OptionSelectInterface; 
    category_id: number;
    categories?: DonationCategoryInterface;
    categoryOption?: OptionSelectInterface
    name: string;
    code?: string;
    image?: string;
    text?: string;
    target: number;
    publish: DonationsPublish;
    status: DonationStatusEnum;
    mosque_type: string;
    start_date?: Date;
    end_date?: Date;
    created_by?: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

export interface DonationSearchInterface {
    name?: string;
    code?: string
}

export type DonationFormProps = {
	handleSubmit: UseFormHandleSubmit<DonationInterface>
	onSubmit: (data:DonationInterface) => void;
	register: UseFormRegister<DonationInterface>;
    onCancel: () => void;
    errors: FieldErrors<DonationInterface>;
    isLoading?: boolean;
    idDetail?: number|null
    setValue: UseFormSetValue<DonationInterface>;
    getValues: UseFormGetValues<DonationInterface>;
    optionDonationCategory: (data: string) => Promise<OptionSelectInterface[]>;
    dataDonationCategory: ApiResponseDonationCategory | undefined;
    control: Control<DonationInterface>;
    optionMosque: (data: string) => Promise<OptionSelectInterface[]>;
    dataOptionMosque: OptionSelectInterface[];
    handleOnChangeImage: (e: ChangeEvent<HTMLInputElement>) => void;
    image: string | undefined;
    setImage: Dispatch<SetStateAction<string | undefined>>;
    handleOnChange: (key:keyof DonationInterface, keyOption:keyof DonationInterface, data?: OptionSelectInterface ) => void;
    isLoadingMutate: boolean;
    status: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    quillRef: RefObject<any>
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface DonationTableInterface extends Omit<DonationInterface, 'classType' | 'classTypeId'> {

}

export interface ApiResponseDonation extends ApiResponse {
    data: {
        info: InfoResponse,
        Donations: DonationTableInterface[]
    }
}

export interface ApiResponseUpdateDonation extends ApiResponse {
    data: {
        info: InfoResponse,
        Donations: DonationInterface
    }
}