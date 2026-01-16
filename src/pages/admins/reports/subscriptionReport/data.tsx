import { FC } from 'react'
import { DataSubscriptionReportInterface } from '../../../../interfaces/reports/SubscriptionReportInterface'
import { t } from 'i18next';

const Data: FC<DataSubscriptionReportInterface> = (props) => {
    const { dataSubscriptionReport } = props;
    return (
        <div className='w-full overflow-auto'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        <th className='p-2'>
                            {t('no')}
                        </th>
                        <th className='p-2'>
                            {t('store')}
                        </th>
                        <th className='p-2'>
                            {t('subscription')}
                        </th>
                        <th className='p-2'>
                            {t('start-date')}
                        </th>
                        <th className='p-2'>
                            {t('end-date')}
                        </th>
                        <th className='p-2'>
                            {t('status')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataSubscriptionReport?.map((value)=>(
                            <tr 
                                key={Math.random().toString(4)}
                                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                            >
                                {
                                    value.map((val)=> (
                                        <td key={Math.random().toString(4)} className='p-2'>
                                            {t(val)}
                                        </td> 
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Data
