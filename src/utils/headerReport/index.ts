import moment from "moment"

const helperReport = {
    headerReport: [
        "BIMBINGAN BELAJAR E S P Head Office: Jl. Sindunegaran No.5, Bumijo, Kec. Jetis, Daerah Istimewa Yogyakarta 55231",
        "Hotline: 085271726006 / 087739342149 Website: www.espbimbel.com Email: e.smartprivate.com"
    ],
    headerPayroll: [
        'no',
        'Nama',
        'Jenis Kelas',
        'Waktu Terlaksana',
        'Total Sesi',
        'Gaji Persesi',
        'Jumlah Siswa',
        'Sub Total',
        'Keterangan'
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