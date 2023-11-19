import { AxiosError } from "axios";

export interface InfoResponse {
    page: number;
    limit: number;
    total: number;
}

export interface ApiResponse {
    status: boolean;
    message: string;
}

type Message = {
    msg: string;
    path: string;
}

export interface DataMessageError {
    errors: Message[]
}

export interface ApiResponseError extends AxiosError {
    data: Message
}