import { ApiResponse, InfoResponse } from "./apiInfoInterface"
import { TutorSkillInterface } from "./master/tutorSkillInterface"
import { UserInterface } from "./master/userInterface"

interface userInter extends UserInterface {
    tentorSkills: TutorSkillInterface[]
}
export interface ApiResponseProfile extends ApiResponse {
    data: {
        info: InfoResponse,
        profile: userInter
    }
}