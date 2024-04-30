import { ApiResponse, InfoResponse } from "./apiInfoInterface"
import { TutorSkillInterface } from "./masters/tutorSkillInterface"
import { UserInterface } from "./masters/userInterface"

interface userInter extends UserInterface {
    tentorSkills: TutorSkillInterface[]
}
export interface ApiResponseProfile extends ApiResponse {
    data: {
        info: InfoResponse,
        profile: userInter
    }
}