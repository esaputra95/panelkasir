import { FC } from 'react'
import { DataPayrollInterface } from '../../../../interfaces/reports/UserPointsReportInterface'
import { t } from 'i18next';

const Data: FC<DataPayrollInterface> = (props) => {
    const { dataUserPointsReport } = props;
    return (
        <div className='w-full'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        <th className='p-2'>
                            {t('no')}
                        </th>
                        <th className='p-2'>
                            {t('users')}
                        </th>
                        <th className='p-2 text-right'>
                            {t('points')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataUserPointsReport?.map((value)=>(
                            <tr 
                                key={Math.random().toString(4)}
                                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                            >
                                {
                                    value.map((val, i)=> (
                                        <td key={Math.random().toString(4)} className={`p-2 ${i===2 ? 'text-right':''}`}>
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