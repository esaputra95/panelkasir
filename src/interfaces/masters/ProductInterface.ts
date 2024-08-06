import { 
    Control,
    FieldArrayWithId,
    FieldErrors,
    UseFieldArrayAppend,
    UseFieldArrayRemove,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch
} from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";
import { OptionSelectInterface } from "../globalInterface";
import { ProductCategoryInterface } from "./ProductCategoryInterface";

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
    settingPoints: SettingPointInterface[];
    settingPackages?: SettingPackageInterface[];
    productCategories?: ProductCategoryInterface;
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
    handleOnChange: (key:keyof ProductInterface, data?: OptionSelectInterface ) => void;
    isLoadingMutate: boolean;
    status: string;
    fieldSettingPoints: FieldArrayWithId<ProductInterface, "settingPoints", "id">[];
    appendSettingPoints: UseFieldArrayAppend<ProductInterface, "settingPoints">;
    removeSettingPoints: UseFieldArrayRemove;
    fieldSettingPackages: FieldArrayWithId<ProductInterface, "settingPackages", "id">[];
    appendSettingPackages: UseFieldArrayAppend<ProductInterface, "settingPackages">;
    removeSettingPackages: UseFieldArrayRemove;
    optionProduct: (data: string) => Promise<OptionSelectInterface[]>;
    dataOptionProduct: OptionSelectInterface[];
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
        Product: ProductTableInterface[]
    }
}

export interface ApiResponseUpdateProduct extends ApiResponse {
    data: {
        info: InfoResponse,
        Product: ProductInterface
    }
}