import { FC } from "react"
import { StudentWillFinishInterface } from "../../../interfaces/dashboard/DashboardInterface"
import { t } from "i18next"
import { BsWhatsapp } from "react-icons/bs";

type StudyWillFinishProps = {
    studentWillFinish: StudentWillFinishInterface[] | undefined
}
const StudyWillFInish:FC<StudyWillFinishProps> = (props) => {
    const {
        studentWillFinish
    } = props
    
    return (
        <div className='w-full shadow-sm'>
            <div className='w-full flex items-center justify-center'>
                <label className='font-semibold w-full text-center'>Siswa yang akan selesai bimbingan</label>
            </div>
            
            <table className='w-full text-sm rounded-md text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        <th className='px-3 py-3'>{t('No')}</th>
                        <th className='px-3 py-3'>{t('name')}</th>
                        <th className='px-3 py-3'>{t('class-types')}</th>
                        <th className='px-3 py-3'>{t('total-sessions')}</th>
                        <th className='px-3 py-3'>{t('study-programs')}</th>
                        <th className='px-3 py-3'>{t('university')}</th>
                        <th className='px-3 py-3'>{t('phone')}</th>
                    </tr>
                </thead>
                <tbody>
            {
                studentWillFinish && studentWillFinish.length> 0 ? studentWillFinish?.map((value, index)=> (
                    <tr key={Math.random().toString(4)} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                        <td className='p-3'>
                            {
                                (index+1)
                            }
                        </td>
                        <td className='p-3'>
                            {
                                value.students?.name ?? ''
                            }
                        </td>
                        <td className='p-3'>
                            {
                                value.students?.registers?.map(val=>val.packages?.name) ?? ''
                            }
                        </td>
                        <td className='p-3'>
                            {
                                value.students?.registers?.map(val=>val.sessions?.name) ?? ''
                            }
                        </td>
                        <td className='p-3'>
                            {
                                value.students?.studyProgram ?? ''
                            }
                        </td>
                        <td className='p-3'>
                            {
                                value.students?.university ?? ''
                            }
                        </td>
                        <td className='p-3'>
                            <a href={`https://wa.me/${value.students.phone}`} target="_blank">
                                <BsWhatsapp 
                                    className='text-green-500 h-6 w-6'
                                />
                            </a>
                        </td>
                    </tr>
                )) : null
            }
            </tbody>
            </table>
        </div>
    )
}

export default StudyWillFInish