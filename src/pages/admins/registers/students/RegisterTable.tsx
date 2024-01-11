import { FC } from 'react'
import { RegisterTableInterface } from '../../../../interfaces/registers/studentInterface'
import { t } from 'i18next'

const RegisterTable:FC<RegisterTableInterface> = (props) => {
    const {
        dataRegister
    } = props
    return (
        <div className='w-full flex flex-col'>
            {
                dataRegister.map((value)=> (
                    <div className='grid grid-cols-2'>
                        <label className='w-full bg-gray-300 rounded-l-md p-2 text-sm text-left text-gray-500'>Label</label>
                        <label className='w-full bg-gray-300 p-2 rounded-r-md text-sm text-left text-gray-500'>Value</label>
                        <label className='w-full p-2 text-sm text-left text-gray-500'>{t('packages')}</label>
                        <label className='w-full p-2 text-sm text-left text-gray-500'>{value.packages?.name}</label>
                        <label className='w-full p-2 text-sm text-left text-gray-500'>{t('universities')}</label>
                        <label className='w-full p-2 text-sm text-left text-gray-500'>{value.university}</label>
                        <label className='w-full p-2 text-sm text-left text-gray-500'>{t('locations')}</label>
                        <label className='w-full p-2 text-sm text-left text-gray-500'>{value.location}</label>
                        <label className='w-full p-2 text-sm text-left text-gray-500'>{t('guidance-types')}</label>
                        <label className='w-full p-2 text-sm text-left text-gray-500'>{value.guidanceTypes?.name}</label>
                        <label className='w-full p-2 text-sm text-left text-gray-500'>{t('sessions')}</label>
                        <label className='w-full p-2 text-sm text-left text-gray-500'>{value.sessions?.name}</label>
                        <label className='w-full p-2 text-sm text-left text-gray-500'>{t('school-years')}</label>
                        <label className='w-full p-2 text-sm text-left text-gray-500'>{value.schoolYears?.name}</label>
                    </div>
                ))
            }
        </div>
    )
}

export default RegisterTable