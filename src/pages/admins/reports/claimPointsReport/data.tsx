import { FC } from 'react'
import { DataPayrollInterface } from '../../../../interfaces/reports/ClaimPointsReportInterface'
import { t } from 'i18next';

const Data: FC<DataPayrollInterface> = (props) => {
    const { dataClaimPointsReport } = props;
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
                        <th className='p-2'>
                            {t('date')}
                        </th>
                        <th className='p-2'>
                            {t('start-date')}
                        </th>
                        <th className='p-2'>
                            {t('until-date')}
                        </th>
                        <th className='p-2 text-right'>
                            {t('points')}
                        </th>
                        <th className='p-2 text-right'>
                            {t('price')}
                        </th>
                        <th className='p-2 text-right'>
                            {t('total')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataClaimPointsReport?.map((value)=>(
                            <tr 
                                key={Math.random().toString(4)}
                                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                            >
                                {
                                    value.map((val, i)=> (
                                        <td key={Math.random().toString(4)} className={`p-2 ${i===5 || i===6 || i===7 ? 'text-right':''}`}>
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