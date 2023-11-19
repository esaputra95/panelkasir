import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";

export interface RoomInterface {
    id?: string;
    code?: string;
    name: string;
    description?: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface RoomSearchInterface {
    name?: string;
    code?: string
}

export type RoomFormProps = {
	handleSubmit: UseFormHandleSubmit<RoomInterface>
	onSubmit: (data:RoomInterface) => void;
	register: UseFormRegister<RoomInterface>;
    onCancel: () => void;
    errors: FieldErrors<RoomInterface>;
    isLoading?: boolean;
    idDetail?: string | null
}

interface Info {
    page: number;
    limit: number;
    total: number;
  }
  
export interface ClassDataTypeInterface {
    Room: RoomInterface[];
    info: Info;
}

export interface ApiResponseRoom extends ApiResponse {
    data: {
        info: InfoResponse,
        room: RoomInterface[]
    }
}