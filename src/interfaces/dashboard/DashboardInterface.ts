import { SessionInterface } from "../schedule/sessionInterface";

export interface RecordMateriDashboardInterface extends SessionInterface {
    students: {
        id:string;
        name:string;
        phone:string;
    }
}