import { MyEnum } from "../../schema/publics/registerSchema";

export interface StudentInterface {
    id?: string;
    name: string;
    studyProgram: string;
    phone: string;
    school: string;
    placeBirth: string;
    dateBirth: Date;
    address: string;
    gender: MyEnum,
    classGrade: string;
    university: string;
    statusStudy?: 'pelajar' | 'alumni';
    country: string;
    province: string;
    city: string;
    parentName: string;
    parentPhone: string;
    // image: string;
    agreement: number;
    email: string;
}