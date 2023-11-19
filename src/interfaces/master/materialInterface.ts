import { Control, FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";
import { OptionSelectInterface } from "../globalInterface";
import { UniversityInterface } from "./universityInterface";
import { CourseInterface } from "./courseInterface";

export interface MaterialInterface {
    id?: string;
    code?: string;
    name: string;
    courseId?: string;
    course?: OptionSelectInterface;
    courses?: CourseInterface;
    description?: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface MaterialSearchInterface {
    name?: string;
    code?: string
}

export type MaterialFormProps = {
	handleSubmit: UseFormHandleSubmit<MaterialInterface>
	onSubmit: (data:MaterialInterface) => void;
	register: UseFormRegister<MaterialInterface>;
    onCancel: () => void;
    errors: FieldErrors<MaterialInterface>;
    isLoading?: boolean;
    idDetail?: string | null;
    optionCourse: (data: string) => Promise<any>;
    control: Control<UniversityInterface, any>;
}

interface Info {
    page: number;
    limit: number;
    total: number;
  }
  
export interface ClassDataTypeInterface {
    material: MaterialInterface[];
    info: Info;
}

export interface ApiResponseMaterial extends ApiResponse {
    data: {
        info: InfoResponse,
        material: MaterialInterface[]
    }
}