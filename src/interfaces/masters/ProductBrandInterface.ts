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

export enum ProductBrandStatusEnum {
    open= 'open',
    closed= 'closed',
    fulfilled= 'fulfilled'
}

export enum ProductBrandsPublish {
    publish= 'publish',
    draft= 'draft',
    new= 'new'
}

export interface ProductBrandInterface {
    id?: number;
    name: string;
    description?: string;
    userCreate?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface ProductBrandSearchInterface {
    name?: string;
    code?: string
}

export type ProductBrandFormProps = {
	handleSubmit: UseFormHandleSubmit<ProductBrandInterface>
	onSubmit: (data:ProductBrandInterface) => void;
	register: UseFormRegister<ProductBrandInterface>;
    onCancel: () => void;
    errors: FieldErrors<ProductBrandInterface>;
    isLoading?: boolean;
    idDetail?: number|null
    setValue: UseFormSetValue<ProductBrandInterface>;
    getValues: UseFormGetValues<ProductBrandInterface>;
    control: Control<ProductBrandInterface>;
    handleOnChange: (key:keyof ProductBrandInterface, data?: OptionSelectInterface ) => void;
    status: string;
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface ProductBrandTableInterface extends Omit<ProductBrandInterface, 'classType' | 'classTypeId'> {

}

export interface ApiResponseProductBrand extends ApiResponse {
    data: {
        info: InfoResponse,
        productBrand: ProductBrandTableInterface[]
    }
}

export interface ApiResponseUpdateProductBrand extends ApiResponse {
    data: {
        info: InfoResponse,
        productBrand: ProductBrandInterface
    }
}