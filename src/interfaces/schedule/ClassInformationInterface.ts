import { RoomInterface } from "../master/roomInterface";
import { SessionTableInterface } from "./sessionInterface";

export interface ClassInformationInterface {
    startDate?: string;
    endDate?: string;
    tutor?: string;
    type?: 'online' | 'offline'
}

export interface TableClassInformationInterface {
    status: boolean,
    message: string;
    data: StudyGroup[][]
}


export interface StudyGroup {
    status?: boolean;
    start?: string;
    finish?: string;
    tentor?: string;
    type?: string;
    name: string;
    time?: string;
    cols?: number;
}


export interface RoomClassInformation extends RoomInterface {
    schedules: SessionTableInterface[]
}