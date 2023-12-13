import { OptionSelectInterface } from "../globalInterface"

export interface StudyGroupDetailInterface {
    id?: string
    studyGroupId?: string | null
    studentId?: string
    student: OptionSelectInterface
    userCreate?: string | null
    createdAt?: Date | null
    updatedAt?: Date | null
    deletedAt?: Date | null
}