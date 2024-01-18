import { FC } from "react"
import { t } from "i18next"
import { StudentInterface } from "../../../interfaces/master/studentInterface"
type StudySchedule = {
    studySchedule: StudentInterface[] | undefined
}
const StudySchedule:FC<StudySchedule> = (props) => {
    const {
        studySchedule
    } = props
    return (
        <div className='w-full shadow-sm'>
            <div className='w-full flex items-center justify-center'>
                <label className='font-semibold w-full text-center'>Siswa belum mendapat jadwal belajar</label>
            </div>
            
            <table className='w-full text-sm rounded-md text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        <th className='px-3 py-3'>{t('No')}</th>
                        <th className='px-3 py-3'>{t('name')}</th>
                        <th className='px-3 py-3'>{t('phone')}</th>
                        <th className='px-3 py-3'>{t('image')}</th>
                    </tr>
                </thead>
                <tbody>
            {
                studySchedule && studySchedule.length> 0 ? studySchedule?.map((value, index)=> (
                    <tr key={Math.random().toString(4)} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                        <td className='p-3'>
                            {
                                (index+1)
                            }
                        </td>
                        <td className='p-3'>
                            {
                                value.name ?? ''
                            }
                        </td>
                        <td className='p-3'>
                            {
                                value.phone ?? ''
                            }
                        </td>
                        <td className='p-3'>
                            <img 
                                className="h-10 w-10 rounded-full"
                                src={`http://localhost:3000/images/${value.image}`}
                            />
                        </td>
                    </tr>
                )) : null
            }
            </tbody>
            </table>
        </div>
    )
}

export default StudySchedule