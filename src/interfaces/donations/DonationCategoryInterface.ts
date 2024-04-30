import { 
    FieldErrors,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue
} from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";

export enum CategoryStatusEnum {
    publish= 'publish',
    draft= 'draft'
}

export interface DonationCategoryInterface {
    id?: number
    name: string;
    status: CategoryStatusEnum;
    parent?: number;
    image?: string;
    order?: number;
    created_at?: Date | null
    updated_at?: Date | null
    deleted_at?: Date | null
}

export interface DonationCategorySearchInterface {
    name?: string;
    code?: string
}

export type DonationCategoryFormProps = {
	handleSubmit: UseFormHandleSubmit<DonationCategoryInterface>
	onSubmit: (data:DonationCategoryInterface) => void;
	register: UseFormRegister<DonationCategoryInterface>;
    onCancel: () => void;
    errors: FieldErrors<DonationCategoryInterface>;
    isLoading?: boolean;
    idDetail?: number|null
    setValue: UseFormSetValue<DonationCategoryInterface>;
    getValues: UseFormGetValues<DonationCategoryInterface>
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface DonationCategoryTableInterface extends Omit<DonationCategoryInterface, 'classType' | 'classTypeId'> {

}

export interface ApiResponseDonationCategory extends ApiResponse {
    data: {
        info: InfoResponse,
        DonationCategory: DonationCategoryTableInterface[]
    }
}

export interface ApiResponseUpdateDonationCategory extends ApiResponse {
    data: {
        info: InfoResponse,
        DonationCategory: DonationCategoryInterface
    }
}