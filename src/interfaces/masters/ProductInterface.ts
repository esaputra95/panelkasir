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
import { ProductCategoryInterface } from "./ProductCategoryInterface";
import { ProductBrandInterface } from "./ProductBrandInterface";
import { ProductSchema } from "../../schema/masters";
import { InferType } from "yup";

export type ProductSchemaType = InferType<ReturnType<typeof ProductSchema>["schema"]>;

export enum ProductStatusEnum {
    open= 'open',
    closed= 'closed',
    fulfilled= 'fulfilled'
}

export enum ProductsPublish {
    publish= 'publish',
    draft= 'draft',
    new= 'new'
}

export interface ProductInterface {
    id?: number;
    barcode?: string;
    code: string;
    name: string;
    image?: string;
    description?: string;
    productCategoryId: number;
    productCategoryOption?: OptionSelectInterface;
    type: 'item' | 'package';
    sellingPrice: number;
    purchasePrice: number;
    userCreate?: number;
    stocks?: StockInterface[];
    settingPoints: SettingPointInterface[];
    settingPackages?: SettingPackageInterface[];
    categories?: ProductCategoryInterface;
    brands?: ProductBrandInterface;
    productPoints?: ProductPoints[];
    productPackages?: ProductPackages[];
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface SettingPointInterface {
    id?: number;
    agenTypeId?: number;
    agenTypeOption?: OptionSelectInterface;
    value: number;
    delete?: boolean;
}

export interface SettingPackageInterface {
    id?: number;
    productId?: number | undefined;
    productOption?: OptionSelectInterface;
    quantity: number;
    delete?: boolean
}

export interface StockInterface {
    id?: string
    storeId: string
    productId: string
    quantity: number
    userCreate?: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface ProductPoints {
    id: number
    productId: number;
    value: number;
    agenTypeId: number;
    userCreate?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface ProductPackages {
    id: number
    productId: number;
    productPackageId: number;
    quantity: number;
    userCreate?: number | null
    createdAt?: Date | null
    updatedAt?: Date | null
    deletedAt?: Date | null
}

export interface ProductSearchInterface {
    name?: string;
    code?: string
}

export type ProductFormProps = {
    handleSubmit: UseFormHandleSubmit<ProductInterface>
    onSubmit: (data:ProductInterface) => void;
    register: UseFormRegister<ProductInterface>;
    onCancel: () => void;
    errors: FieldErrors<ProductInterface>;
    isLoading?: boolean;
    idDetail?: number|null
    setValue: UseFormSetValue<ProductInterface>;
    getValues: UseFormGetValues<ProductInterface>;
    control: Control<ProductInterface>;
    watch: UseFormWatch<ProductInterface>
}


export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface ProductTableInterface extends Omit<ProductInterface, 'classType' | 'classTypeId'> {

}

export interface ApiResponseProduct extends ApiResponse {
    data: {
        info: InfoResponse,
        product: ProductTableInterface[]
    }
}

export interface ApiResponseUpdateProduct extends ApiResponse {
    data: {
        info: InfoResponse,
        product: ProductInterface
    }
}