import moment from "moment"
import { methodEnum, typeEnum } from "../../interfaces/schedule/sessionInterface"
import { OptionDummy } from "./setting"

export const TentorNotAvailableDummy = {
    id: '',
    startDate: '',
    untilDate: '',
    tentor: {label:'', value:''},
    description: ''
}

export const StudyGroupDummy = {
    studyGroup: {
        name:'',
        total: 1,
        class: {
            label:'',
            value:''
        },
        guidanceType: OptionDummy
    },
    studyGroupDetails: [
        {
            studentId:'',
            student: OptionDummy
        }
    ]
}

export const SessionDummy = {
    schedule: {
        method: methodEnum.offline,
        scheduleType: OptionDummy
    }, 
    time: [
        {
            date: '',
            material : OptionDummy,
            tentor: OptionDummy,
            room: OptionDummy,
            type: typeEnum.study
        }
    ]
}

export const ScheduleTypeDummy = [
    {
        value: 'private',
        label: 'Private'
    },
    {
        value: 'regular',
        label: 'Regular'
    }
]

export const ClassInformationDummy = {
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
}