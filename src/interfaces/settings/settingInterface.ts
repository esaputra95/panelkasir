import { ChangeEvent } from "react";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";
import { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

export interface SettingInterface {
    [key:string]: string
}

export interface FormSetting {
    form : SettingInterface[]
}

export interface SettingSearchInterface {
    name?: string;
}

export type SettingFormProps = {
	onSubmit: SubmitHandler<FormSetting>
    handleSubmit: UseFormHandleSubmit<FormSetting>
    register: UseFormRegister<FormSetting>;
    fields: Record<"id", string>[];
    label: string[];
    handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    imageIcon: any;
    handleOnUpload: () => Promise<void>
}

interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface ClassDataTypeInterface {
    setting: SettingInterface[];
    info: Info;
}

export interface ApiResponseSetting extends ApiResponse {
    data: {
        info: InfoResponse,
        setting: SettingInterface[]
        label: string[]
    }
}