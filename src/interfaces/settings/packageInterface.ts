import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";

export interface PackageInterface {
    id?: string;
    name: string;
    description?: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface PackageSearchInterface {
    name?: string;
}

export type PackageFormProps = {
	handleSubmit: UseFormHandleSubmit<PackageInterface>
	onSubmit: (data:PackageInterface) => void;
	register: UseFormRegister<PackageInterface>;
    onCancel: () => void;
    errors: FieldErrors<PackageInterface>;
    isLoading?: boolean;
    idDetail?: string | null
}

interface Info {
    page: number;
    limit: number;
    total: number;
  }
  
export interface ClassDataTypeInterface {
    Package: PackageInterface[];
    info: Info;
}

export interface ApiResponsePackage extends ApiResponse {
    data: {
        info: InfoResponse,
        package: PackageInterface[]
    }
}