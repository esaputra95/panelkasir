import { StudentInterface } from "../master/studentInterface";
import { StudentRegisterInterface } from "../registers/studentInterface";
import { scheduleDetailInterface } from "../schedule/sessionDetailInterface";
import { SessionInterface } from "../schedule/sessionInterface";

export interface RecordMateriDashboardInterface extends SessionInterface {
    students: {
        id:string;
        name:string;
        phone:string;
    };
    studyGroupName: string
}

export interface StudentWillFinishInterface extends scheduleDetailInterface {
    students: StudentRegisterInterface
}

export interface StudyGroupDashboardInterface extends StudentInterface {}