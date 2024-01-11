import { OptionSelectInterface } from "../globalInterface"
import { StudyGroupInterface } from "./studyGroupInterface"

export interface StudyGroupDetailInterface {
    id?: string
    studyGroupId?: string | null
    studentId?: string
    student: OptionSelectInterface
    userCreate?: string | null
    studyGroups?: StudyGroupInterface;
    createdAt?: Date | null
    updatedAt?: Date | null
    deletedAt?: Date | null
}