import moment from "moment"

const helperReport = {
    headerReport: [
        "BIMBINGAN BELAJAR E S P Head Office: Jl. Sindunegaran No.5, Bumijo, Kec. Jetis, Daerah Istimewa Yogyakarta 55231",
        "Hotline: 085271726006 / 087739342149 Website: www.espbimbel.com Email: e.smartprivate.com"
    ],
    headerPayroll: [
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
        'name',
        'month',
        'basic-salary',
        'session-salary',
        'total'
    ],
    headerRecordMateriReport: [
        'tutors',
        'students',
        'materials',
        'advice',
        'description'
    ],
    headerReportStudent: [
        'name',
        'gender',
        'phone',
        'address',
        'city',
        'country'
    ]
}

export default helperReport