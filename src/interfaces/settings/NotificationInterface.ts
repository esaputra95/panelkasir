import { 
    Control,
    FieldErrors,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch
} from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";

export interface NotificationInterface {
    id?: string;
    title?: string;
    body: string;
    type?: string;
    screen?: string;
    referenceId?: string;
    metadata?: Record<string, unknown>;
    createdAt?: string;
    recipients?: NotificationRecipientInterface[];
}

export interface NotificationRecipientInterface {
    id?: string;
    notificationId?: string;
    userId: string;
    isRead?: boolean;
    readAt?: Date;
    createdAt?: string;
    user?: {
        id: string;
        name: string;
        email: string;
    };
}

export interface NotificationFormInterface {
    id?: string;
    title?: string;
    body: string;
    type?: string;
    screen?: string;
    referenceId?: string;
    metadata?: string; // JSON string in form
    userIds: string[];
}

export interface UserSelectionInterface {
    id: string;
    name: string;
    email: string;
    phone?: string;
}

export type NotificationFormProps = {
    handleSubmit: UseFormHandleSubmit<NotificationFormInterface>
    onSubmit: (data: NotificationFormInterface) => void;
    register: UseFormRegister<NotificationFormInterface>;
    onCancel: () => void;
    errors: FieldErrors<NotificationFormInterface>;
    isLoading?: boolean;
    idDetail?: string | null;
    setValue: UseFormSetValue<NotificationFormInterface>;
    getValues: UseFormGetValues<NotificationFormInterface>;
    control: Control<NotificationFormInterface>;
    watch: UseFormWatch<NotificationFormInterface>;
    users: UserSelectionInterface[];
    selectedUserIds: string[];
    onUserSelect: (userId: string) => void;
    onSelectAll: () => void;
    searchUsers: string;
    setSearchUsers: (value: string) => void;
}

export interface NotificationTableInterface extends NotificationInterface {
    recipientCount?: number;
}

export interface ApiResponseNotification extends ApiResponse {
    data: {
        info: InfoResponse;
        notifications: NotificationTableInterface[];
    }
}

export interface ApiResponseUpdateNotification extends ApiResponse {
    data: {
        info: InfoResponse;
        notification: NotificationInterface;
    }
}

export interface ApiResponseUsers extends ApiResponse {
    data: {
        users: UserSelectionInterface[];
    }
}
