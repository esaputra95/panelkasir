import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";

export interface SessionInterface {
    id?: string;
    name: string;
    quantity: number;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface SessionSearchInterface {
    name?: string;
}

export type SessionFormProps = {
	handleSubmit: UseFormHandleSubmit<SessionInterface>
	onSubmit: (data:SessionInterface) => void;
	register: UseFormRegister<SessionInterface>;
    onCancel: () => void;
    errors: FieldErrors<SessionInterface>;
    isLoading?: boolean;
    idDetail?: string | null
}

interface Info {
    page: number;
    limit: number;
    total: number;
  }
  
export interface ClassDataTypeInterface {
    session: SessionInterface[];
    info: Info;
}

export interface ApiResponseSession extends ApiResponse {
    data: {
        info: InfoResponse,
        session: SessionInterface[]
    }
}