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

export enum ProductCategoryStatusEnum {
    open= 'open',
    closed= 'closed',
    fulfilled= 'fulfilled'
}

export enum ProductCategorysPublish {
    publish= 'publish',
    draft= 'draft',
    new= 'new'
}

export interface ProductCategoryInterface {
    id?: number;
    name: string;
    description?: string;
    userCreate?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface ProductCategorySearchInterface {
    name?: string;
    code?: string
}

export type ProductCategoryFormProps = {
	handleSubmit: UseFormHandleSubmit<ProductCategoryInterface>
	onSubmit: (data:ProductCategoryInterface) => void;
	register: UseFormRegister<ProductCategoryInterface>;
    onCancel: () => void;
    errors: FieldErrors<ProductCategoryInterface>;
    isLoading?: boolean;
    idDetail?: number|null
    setValue: UseFormSetValue<ProductCategoryInterface>;
    getValues: UseFormGetValues<ProductCategoryInterface>;
    control: Control<ProductCategoryInterface>;
    handleOnChange: (key:keyof ProductCategoryInterface, data?: OptionSelectInterface ) => void;
    status: string;
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface ProductCategoryTableInterface extends Omit<ProductCategoryInterface, 'classType' | 'classTypeId'> {

}

export interface ApiResponseProductCategory extends ApiResponse {
    data: {
        info: InfoResponse,
        productCategory: ProductCategoryTableInterface[]
    }
}

export interface ApiResponseUpdateProductCategory extends ApiResponse {
    data: {
        info: InfoResponse,
        productCategory: ProductCategoryInterface
    }
}