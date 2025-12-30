import { FC } from 'react'
import { ReportDataProps } from '../../../../interfaces/reports/ReportInterface'
import { t } from 'i18next';

interface Props extends ReportDataProps {
    headers: string[]
}

const CommonReportData: FC<Props> = (props) => {
    const { data, headers } = props;
    return (
        <div className='w-full overflow-auto'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        {headers.map((header) => (
                            <th key={header} className='p-2'>
                                {t(header)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((value)=>(
                            <tr 
                                key={Math.random().toString(4)}
                                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                            >
                                {
                                    (Array.isArray(value) ? value : Object.values(value ?? {})).map((val: unknown) => (
                                        <td key={Math.random().toString(4)} className='p-2'>
                                            {t(val as string)}
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

export default CommonReportData
