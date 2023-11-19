import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";

export interface GuidanceTypeInterface {
    id?: string;
    name: string;
    total: number;
    type?: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface GuidanceTypeSearchInterface {
    name?: string;
}

export type GuidanceTypeFormProps = {
	handleSubmit: UseFormHandleSubmit<GuidanceTypeInterface>
	onSubmit: (data:GuidanceTypeInterface) => void;
	register: UseFormRegister<GuidanceTypeInterface>;
    onCancel: () => void;
    errors: FieldErrors<GuidanceTypeInterface>;
    isLoading?: boolean;
    idDetail?: string | null
}

interface Info {
    page: number;
    limit: number;
    total: number;
  }
  
export interface ClassDataTypeInterface {
    guidanceType: GuidanceTypeInterface[];
    info: Info;
}

export interface ApiResponseGuidanceType extends ApiResponse {
    data: {
        info: InfoResponse,
        guidanceType: GuidanceTypeInterface[]
    }
}