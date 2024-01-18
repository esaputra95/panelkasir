import { Control, FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";
import { OptionSelectInterface } from "../globalInterface";

export interface TentorNotAvailableInterface {
    id?: string;
    tentorId?: string;
    tentor?: OptionSelectInterface;
    startDate: string;
    untilDate: string;
    description?: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface TentorNotAvailableSearchInterface {
    name?: string;
    code?: string
}

export type TentorNotAvailableFormProps = {
	handleSubmit: UseFormHandleSubmit<TentorNotAvailableInterface>
	onSubmit: (data:TentorNotAvailableInterface) => void;
	register: UseFormRegister<TentorNotAvailableInterface>;
    onCancel: () => void;
    optionTutor: (data: string) => Promise<OptionSelectInterface[]>;
    errors: FieldErrors<TentorNotAvailableInterface>;
    control: Control<TentorNotAvailableInterface>;
    isLoading?: boolean;
    idDetail?: string | null
}

interface Info {
    page: number;
    limit: number;
    total: number;
  }
  
export interface ClassDataTypeInterface {
    TentorNotAvailable: TentorNotAvailableInterface[];
    info: Info;
}

export interface ApiResponseTentorNotAvailable extends ApiResponse {
    data: {
        info: InfoResponse,
        TentorNotAvailable: TentorNotAvailableInterface[]
    }
}

export interface TentorNotAvailableFilter {
    name?: string,
    code?: string,
    tentorId?: string
}