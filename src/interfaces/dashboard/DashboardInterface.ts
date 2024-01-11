import { StudentInterface } from "../master/studentInterface";
import { SessionInterface } from "../schedule/sessionInterface";

export interface RecordMateriDashboardInterface extends SessionInterface {
    students: {
        id:string;
        name:string;
        phone:string;
    };
    studyGroupName: string
}

export interface StudyGroupDashboardInterface extends StudentInterface {}