import { FC } from "react"
import { t } from "i18next"
import { RegistrationInterface } from "../../../interfaces/registers/registrationInterface"
type StudyModule = {
    studyModule: RegistrationInterface[] | undefined
}
const StudyModule:FC<StudyModule> = (props) => {
    const {
        studyModule
    } = props
    return (
        <div className='w-full shadow-sm'>
            <div className='w-full flex items-center justify-center'>
                <label className='font-semibold w-full text-center'>Siswa belum mendapat Module materi</label>
            </div>
            
            <table className='w-full text-sm rounded-md text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        <th className='px-3 py-3'>{t('No')}</th>
                        <th className='px-3 py-3'>{t('name')}</th>
                        <th className='px-3 py-3'>{t('packages')}</th>
                        <th className='px-3 py-3'>{t('address')}</th>
                    </tr>
                </thead>
                <tbody>
            {
                studyModule && studyModule.length> 0 ? studyModule?.map((value, index)=> (
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
                                value.packages?.name ?? ''
                            }
                        </td>
                        <td className='p-3'>
                            {
                                value.students?.address ?? ''
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

export default StudyModule