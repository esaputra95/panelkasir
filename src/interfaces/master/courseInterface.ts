import {
    Control,
    FieldErrors,
    UseFormHandleSubmit,
    UseFormRegister
} from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";
import { OptionSelectInterface } from "../globalInterface";
import { MajorInterface } from "./majorInterface";

export interface CourseInterface {
    id?: string;
    code?: string;
    name: string;
    majorId?: string;
    major?: OptionSelectInterface;
    majors?: MajorInterface;
    description?: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface CourseSearchInterface {
    name?: string;
    code?: string
}

export type CourseFormProps = {
	handleSubmit: UseFormHandleSubmit<CourseInterface>
	onSubmit: (data:CourseInterface) => void;
	register: UseFormRegister<CourseInterface>;
    onCancel: () => void;
    errors: FieldErrors<CourseInterface>;
    isLoading?: boolean;
    idDetail?: string | null;
    optionMajor: (data: string) => Promise<any>;
    control: Control<CourseInterface, any>;
}

interface Info {
    page: number;
    limit: number;
    total: number;
}
  
export interface ClassDataTypeInterface {
    course: CourseInterface[];
    info: Info;
}

export interface ApiResponseCourse extends ApiResponse {
    data: {
        info: InfoResponse,
        course: CourseInterface[]
    }
}