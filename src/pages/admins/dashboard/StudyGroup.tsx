import { FC } from "react"
import { StudyGroupDashboardInterface } from "../../../interfaces/dashboard/DashboardInterface"
import { t } from "i18next"
type StudyGroup = {
    studyGroup: StudyGroupDashboardInterface[] | undefined
}
const StudyGroup:FC<StudyGroup> = (props) => {
    const {
        studyGroup
    } = props
    return (
        <div className='w-full shadow-sm bg-gray-100 rounded-md p-4'>
            <div className='w-full flex items-center justify-center'>
                <label className='font-semibold w-full text-center'>Siswa belum mendapat Group Belajar</label>
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
                studyGroup && studyGroup.length> 0 ? studyGroup?.map((value, index)=> (
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

export default StudyGroup