import { 
    Control,
    FieldArrayWithId,
    FieldErrors,
    UseFieldArrayAppend,
    UseFieldArrayRemove,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue
} from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";
import { OptionSelectInterface } from "../globalInterface";
import {
    SessionDetailTableInterface,
    scheduleDetailInterface
} from "./sessionDetailInterface";
import { CourseInterface } from "../master/courseInterface";
import { RoomInterface } from "../master/roomInterface";
import { TutorInterface } from "../master/tutorInterface";

export interface SessionInterface {
    id?: string;
    scheduleType: OptionSelectInterface
    studyGroupId?: string;
    date: string;
    tentorId?: string;
    tentor: OptionSelectInterface;
    roomId?: string;
    room: OptionSelectInterface;
    type: typeEnum;
    courseId?: string;
    course: OptionSelectInterface
    method: methodEnum;
    status: string;
    userCreate?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface SessionForm {
    id?:string;
    studyGroupId?: string;
    method: methodEnum;
    scheduleType?: OptionSelectInterface
}

export interface TimeForm {
    date: string;
    courseId: string;
    course?: OptionSelectInterface;
    tentorId: string;
    tentor?: OptionSelectInterface;
    roomId?: string;
    room?: OptionSelectInterface;
    type: typeEnum;
}

export interface SessionInputForm {
    schedule : SessionForm,
    time: TimeForm[];
    scheduleDetails?: scheduleDetailInterface[];
    idDeleteSessionDetails?: IdDeleteSessionDetailInterface[]
}

interface IdDeleteSessionDetailInterface {
    id: string
}

export enum scheduleTypeEnum {
    regular='regular',
    private='private'
}
export enum typeEnum {
    study='study', 
    try_out='try_out'
}

export enum methodEnum {
    online='online', offline='offline'
}

export interface StudentGroupQueryInterface {
    name?: string;
    studyGroupId?: string
}

export type SessionFormProps = {
	handleSubmit: UseFormHandleSubmit<SessionInputForm>
	onSubmit: (data:SessionInputForm) => void;
	register: UseFormRegister<SessionInputForm>;
    onCancel: () => void;
    errors: FieldErrors<SessionInputForm>;
    isLoading?: boolean;
    idDetail?: string | null;
    control: Control<SessionInputForm>;
    fields: FieldArrayWithId<SessionInputForm, "scheduleDetails", "id">[]
    fieldDate: FieldArrayWithId<SessionInputForm, "time", "id">[]
    optionStudent:  (data: string) => Promise<OptionSelectInterface[]>
    dataOptionStudent: OptionSelectInterface[];
    append: UseFieldArrayAppend<SessionInputForm, "scheduleDetails">
    appendDate: UseFieldArrayAppend<SessionInputForm, "time">
    remove: UseFieldArrayRemove,
    removeDate: UseFieldArrayRemove,
    setValue: UseFormSetValue<SessionInputForm>;
    getValues: UseFormGetValues<SessionInputForm>;
    updateStatus: boolean;
    optionCourse:  (data: string) => Promise<OptionSelectInterface[]>;
    dataOptionCourse: OptionSelectInterface[];
    optionTutorSchedule:  (e: string, index: number) => Promise<OptionSelectInterface[]>;
    dataOptionTutor: OptionSelectInterface[];
    optionRoom:  (data: string) => Promise<OptionSelectInterface[]>;
    dataOptionRoom: OptionSelectInterface[];
    handleOnChangeTime: (index: number, key: keyof TimeForm, value: string) => Promise<void>
    handleOnChangeSession: (
        key: 'schedule.scheduleType' 
            | 'schedule.studyGroupId' 
            | 'schedule.method', 
        value: string
    ) => void;
    handleOnChangeSessionDetail : (value: string, index: number) => void;
    appendIdDeleteSessionDetail: UseFieldArrayAppend<SessionInputForm, "idDeleteSessionDetails">;
    dataOptionClassType: OptionSelectInterface[];
    optionClassType: (data: string) => Promise<OptionSelectInterface[]>

}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface SessionTableInterface extends Omit<SessionInterface, 'tentor' | 'room' | 'course'> {
    courses: CourseInterface;
    rooms: RoomInterface;
    tentor: TutorInterface;
    scheduleDetails: SessionDetailTableInterface
}

export interface ApiResponseSession extends ApiResponse {
    data: {
        info: InfoResponse,
        schedule: SessionTableInterface[]
    }
}

export interface ApiResponseUpdateSession extends ApiResponse {
    status: boolean,
    message: string;
    data: {
        schedule: SessionInterface;
        scheduleDetails: scheduleDetailInterface[];
        time: TimeForm[]
    }
}