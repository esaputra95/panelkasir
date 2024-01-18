import { FC } from "react"
import { RecordMateriDashboardInterface } from "../../../interfaces/dashboard/DashboardInterface"
import { t } from "i18next"
import moment from "moment"
type RecordMateri = {
    recordMateri: RecordMateriDashboardInterface[] | undefined
}
const RecordMateri:FC<RecordMateri> = (props) => {
    const {
        recordMateri
    } = props
    return (
        <div className='w-full shadow-sm rounded-md '>
            <div className='w-full flex items-center justify-center'>
                <label className='font-semibold w-full text-center'>Siswa belum mendapat Record Materi</label>
            </div>
            
            <table className='w-full text-sm rounded-md text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        <th className='px-3 py-3'>{t('No')}</th>
                        <th className='px-3 py-3'>{t('time')}</th>
                        <th className='px-3 py-3'>{t('group-name')}</th>
                        <th className='px-3 py-3'>{t('name')}</th>
                        <th className='px-3 py-3'>{t('phone')}</th>
                    </tr>
                </thead>
                <tbody>
            {
                recordMateri && recordMateri.length> 0 ? recordMateri?.map((value, index)=> (
                    <tr key={Math.random().toString(4)} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                        <td className='p-3'>
                            {
                                (index+1)
                            }
                        </td>
                        <td className='p-3'>
                            {
                                moment(value.date).format('DD-MM-YYYY hh:mm:ss') ?? ''
                            }
                        </td>
                        <td className='p-3'>
                            {
                                value.studyGroupName ?? ''
                            }
                        </td>
                        <td className='p-3'>
                            {
                                value.students?.name ?? ''
                            }
                        </td>
                        <td className='p-3'>
                            {
                                value.students?.phone ?? ''
                            }
                        </td>
                    </tr>
                )) : null
            }
            </tbody>
            </table>
        </div>
    )
}

export default RecordMateri