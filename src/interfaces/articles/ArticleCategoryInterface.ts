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

export interface ArticleCategoryInterface {
    id?: number;
    name: string;
    slug?: string;
    image?: string;
    status: CategoryStatusEnum;
    parent?: number;
    order?: number;
    created_at?: Date;
    updated_at?: Date;
}


export interface ArticleCategorySearchInterface {
    name?: string;
    code?: string
}

export type ArticleCategoryFormProps = {
	handleSubmit: UseFormHandleSubmit<ArticleCategoryInterface>
	onSubmit: (data:ArticleCategoryInterface) => void;
	register: UseFormRegister<ArticleCategoryInterface>;
    onCancel: () => void;
    errors: FieldErrors<ArticleCategoryInterface>;
    isLoading?: boolean;
    idDetail?: number|null
    setValue: UseFormSetValue<ArticleCategoryInterface>;
    getValues: UseFormGetValues<ArticleCategoryInterface>
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface ArticleCategoryTableInterface extends Omit<ArticleCategoryInterface, 'classType' | 'classTypeId'> {

}

export interface ApiResponseArticleCategory extends ApiResponse {
    data: {
        info: InfoResponse,
        articleCategory: ArticleCategoryTableInterface[]
    }
}

export interface ApiResponseUpdateArticleCategory extends ApiResponse {
    data: {
        info: InfoResponse,
        articleCategory: ArticleCategoryInterface
    }
}