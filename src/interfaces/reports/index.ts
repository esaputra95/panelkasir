export interface ApiResponseSetting extends ApiResponse {
    data: {
        info: InfoResponse,
        setting: SettingInterface[]
        label: string[]
    }
}

export interface ApiResponse {
    status: boolean;
    message: string;
}

export interface InfoResponse {
    page: number;
    limit: number;
    total: number;
}

export interface SettingInterface {
    [key:string]: string
}