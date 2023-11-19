import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";

export interface SchoolYearInterface {
    id?: string;
    name: string;
    startYear: Date;
    endYear: Date;
    description?: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface SchoolYearSearchInterface {
    name?: string;
}

export type SchoolYearFormProps = {
	handleSubmit: UseFormHandleSubmit<SchoolYearInterface>
	onSubmit: (data:SchoolYearInterface) => void;
	register: UseFormRegister<SchoolYearInterface>;
    onCancel: () => void;
    errors: FieldErrors<SchoolYearInterface>;
    isLoading?: boolean;
    idDetail?: string | null
}

interface Info {
    page: number;
    limit: number;
    total: number;
  }
  
export interface ClassDataTypeInterface {
    schoolYear: SchoolYearInterface[];
    info: Info;
}

export interface ApiResponseSchoolYear extends ApiResponse {
    data: {
        info: InfoResponse,
        schoolYear: SchoolYearInterface[]
    }
}