import { SessionInterface } from "../schedule/sessionInterface";

export interface PayrollDetailInterface {
    id?: string;
    payrollId?: string;
    scheduleId:string;
    price: string;
    time?: string;
    schedules?: SessionInterface;
    totalStudent?: number;
    userCreate?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
}