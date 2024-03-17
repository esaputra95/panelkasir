import { Control, FieldArrayWithId, FieldErrors, UseFieldArrayAppend, UseFieldArrayRemove, UseFormGetValues, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";
import { TutorSkillInterface } from "./tutorSkillInterface";
import { OptionSelectInterface } from "../globalInterface";

export interface TutorInterface {
    id?: string
    name: string
    email: string
    username: string
    password?: string
    token?: string
    refreshToken?: string
    roleId?: string
    userType: UserType
    nickname: string
    address?: string
    phone: string;
    tentorSkills?: TutorSkillInterface[]
    userCreate?: string
    createdAt?: string
    updatedAt?: string
    deletedAt?: string
}

export interface TutorSearchInterface {
    name?: string;
    code?: string
}

export enum UserType {
    admin="admin", 
    tentor="tentor"
}

export type TutorFormProps = {
	handleSubmit: UseFormHandleSubmit<TutorInterface>
	onSubmit: (data:TutorInterface) => void;
	register: UseFormRegister<TutorInterface>;
    onCancel: () => void;
    errors: FieldErrors<TutorInterface>;
    isLoading?: boolean;
    idDetail?: string | null;
    append: UseFieldArrayAppend<TutorInterface, "tentorSkills">;
    fields: FieldArrayWithId<TutorInterface, "tentorSkills", "id">[];
    remove: UseFieldArrayRemove;
    control: Control<TutorInterface>;
    getValues: UseFormGetValues<TutorInterface>;
    dataOptionCourse: OptionSelectInterface[];
    optionCourse: (data: string) => Promise<OptionSelectInterface[]>
}

interface Info {
    page: number;
    limit: number;
    total: number;
}
export interface ClassDataTypeInterface {
    tutor: TutorInterface[];
    info: Info;
}

export interface ApiResponseTutor extends ApiResponse {
    data: {
        info: InfoResponse,
        tutor: TutorInterface[]
    }
}

export interface TutorFilter {
    name?: string,
    code?:string
}