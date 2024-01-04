import { Control, FieldArrayWithId, FieldErrors, UseFormGetValues, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";
import { OptionSelectInterface } from "../globalInterface";
import { SingleValue } from "react-select";
import { PayrollDetailInterface } from "./payrollDetailInterface";
import { UserInterface } from "../userInterface";
import { NumberFormatValues } from "react-number-format";

export interface PayrollInterface {
    id?: string;
    userId:string;
    user?: OptionSelectInterface;
    month?: string;
    basicSalary: string,
    sessionSalary: string;
    total: string;
    payrollDetails: PayrollDetailInterface[]
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface PayrollSearchInterface {
    name?: string;
    code?: string
}

export type PayrollFormProps = {
	handleSubmit: UseFormHandleSubmit<PayrollInterface>
	onSubmit: (data:PayrollInterface) => void;
	register: UseFormRegister<PayrollInterface>;
    getValues: UseFormGetValues<PayrollInterface>
    onCancel: () => void;
    errors: FieldErrors<PayrollInterface>;
    isLoading?: boolean;
    idDetail?: string | null;
    control: Control<PayrollInterface>;
    optionTutor: (data: string) => Promise<{label:string, value:string}[]>
    dataOptionTutor: OptionSelectInterface[];
    getPayrollSession: (id: string, month:string) => Promise<void>;
    handleOnChange: (data: SingleValue<OptionSelectInterface>) => void;
    fields: FieldArrayWithId<PayrollInterface, "payrollDetails", "id">[];
    handleOnChangeText:(key: keyof PayrollInterface, data: NumberFormatValues) => void
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface PayrollTableInterface extends Omit<PayrollInterface, 'classType' | 'classTypeId'> {
    userTentor: UserInterface
}

export interface ApiResponsePayroll extends ApiResponse {
    data: {
        info: InfoResponse,
        payroll: PayrollTableInterface[]
    }
}

export interface ApiResponseUpdatePayroll extends ApiResponse {
    data: {
        info: InfoResponse,
        payroll: PayrollInterface
    }
}

export interface SalaryDetailInterface {
    scheduleId:string;
    time: string;
    type: string;
    price: string;
}

export interface PayrollResponse {
    data: {
        salary: number;
        payrollData: SalaryDetailInterface[];
    };
}