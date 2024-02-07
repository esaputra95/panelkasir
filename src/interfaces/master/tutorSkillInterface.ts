import { OptionSelectInterface } from "../globalInterface";
import { CourseInterface } from "./courseInterface";

export interface TutorSkillInterface {
    id?: string;
    tentorId: string;
    tentor?: OptionSelectInterface
    courseId: string;
    course?: OptionSelectInterface;
    courses?: CourseInterface;
    description?: string;
    userCreate?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}