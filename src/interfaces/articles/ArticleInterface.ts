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
import { ChangeEvent, Dispatch, RefObject, SetStateAction } from "react";
import { ArticleCategoryInterface } from "./ArticleCategoryInterface";

export enum ArticleTypeEnum {
    grid= 'grid',
    banner= 'banner',
    berbagi= 'berbagi',
    kenalilah_islam= 'kenalilah_islam'
}

export enum ArticlesStatusEnum {
    publish= 'active',
    draft= 'draft',
}

export interface ArticleInterface {
    id?: number
    user_id?: number;
    category_id: number;
    category?: ArticleCategoryInterface;
    categorySelect?:OptionSelectInterface;
    type: ArticleTypeEnum
    title: string;
    content: string;
    image?: string;
    hits?: number;
    status: ArticlesStatusEnum;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

export interface ArticleSearchInterface {
    name?: string;
    code?: string
}

export type ArticleFormProps = {
	handleSubmit: UseFormHandleSubmit<ArticleInterface>
	onSubmit: (data:ArticleInterface) => void;
	register: UseFormRegister<ArticleInterface>;
    onCancel: () => void;
    errors: FieldErrors<ArticleInterface>;
    isLoading?: boolean;
    idDetail?: number|null
    setValue: UseFormSetValue<ArticleInterface>;
    getValues: UseFormGetValues<ArticleInterface>;
    optionArticleCategory: (data: string) => Promise<OptionSelectInterface[]>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<ArticleInterface, any>;
    handleOnChange: (key: "category_id", key2:'categorySelect', value?: OptionSelectInterface) => void;
    handleOnChangeImage: (e: ChangeEvent<HTMLInputElement>) => void
    image: string | undefined;
    setImage: Dispatch<SetStateAction<string | undefined>>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    quillRef: RefObject<any>
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface ArticleTableInterface extends Omit<ArticleInterface, 'classType' | 'classTypeId'> {

}

export interface ApiResponseArticle extends ApiResponse {
    data: {
        info: InfoResponse,
        Articles: ArticleTableInterface[]
    }
}

export interface ApiResponseUpdateArticle extends ApiResponse {
    data: {
        info: InfoResponse,
        Articles: ArticleInterface
    }
}