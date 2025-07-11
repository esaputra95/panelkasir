import { FC } from 'react'
import { DataPayrollInterface } from '../../../../interfaces/reports/MarginsReportInterface'
import { t } from 'i18next';

const Data: FC<DataPayrollInterface> = (props) => {
    const { dataMarginsReport } = props;
    return (
        <div className='w-full overflow-auto'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        <th className='p-2'>
                            {t('no')}
                        </th>
                        <th className='p-2'>
                            {t('invoice')}
                        </th>
                        <th className='p-2'>
                            {t('date')}
                        </th>
                        <th className='p-2'>
                            {t('sell')}
                        </th>
                        <th className='p-2'>
                            {t('capital')}
                        </th>
                        <th className='p-2'>
                            {t('margin')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataMarginsReport?.map((value)=>(
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