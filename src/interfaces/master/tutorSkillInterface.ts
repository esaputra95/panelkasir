import { OptionSelectInterface } from "../globalInterface";

export interface TutorSkillInterface {
    id?: string;
    tentorId: string;
    tentor?: OptionSelectInterface
    courseId: string;
    description?: string;
    userCreate?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}