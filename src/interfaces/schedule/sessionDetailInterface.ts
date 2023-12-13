import { OptionSelectInterface } from "../globalInterface";
import { StudentInterface } from "../master/studentInterface";

export interface scheduleDetailInterface {
    id?: string;
    scheduleId?: string;
    studentId?: string;
    student?: OptionSelectInterface
    userCreate?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface SessionDetailTableInterface extends scheduleDetailInterface {
    students: StudentInterface
}