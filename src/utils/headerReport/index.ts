import moment from "moment"

const helperReport = {
    headerDonation: [
        'no',
        'name',
        'target',
        'category',
        'status',
        'start-date',
        'until-date'
    ],
    signature: [
        ['Manajer', '', '', `Yogyakarta, ${moment().format('DD MMMM YYYY')}`],
        ['', '', '', 'Esp'],
        ['', '', '',  ''],
        ['', '', '', ''],
        ['Ary Diah Puspita Sari', '', '', 'Admin'],
    ],
    headerReportPayroll: [
        'no',
        'name',
        'month',
        'study-total',
        'basic-salary',
        'session-salary',
        'total'
    ],
    headerRecordMateriReport: [
        'no',
        'tutors',
        'students',
        'materials',
        'time',
        'description'
    ],
    headerReportStudent: [
        'no',
        'name',
        'gender',
        'phone',
        'address',
        'city',
        'country'
    ],
    headerReportSchedule: [
        'no',
        'tutors',
        'group-name',
        'time',
        'materials',
        'rooms',
        'type',
        'method',
        'schedule-type'
    ],
    headerReportRegister: [
        'no',
        'name',
        'class',
        'university',
        'major',
        'school',
        'place-birth',
        'date-birth',
        // 'amount',
        'session',
        'package',
        'location',
        'school-year',
    ]
}

export default helperReport