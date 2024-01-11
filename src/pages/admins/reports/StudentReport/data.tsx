import { FC } from 'react'
import { DataStudentInterface } from '../../../../interfaces/reports/StudentReportInterface'
import helperReport from '../../../../utils/headerReport';
import { t } from 'i18next';

const Data: FC<DataStudentInterface> = (props) => {
    const { dataStudentReport } = props;
    return (
        <div className='w-full'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        {
                            helperReport.headerReportStudent.map((value)=> (
                                <th key={Math.random().toString(4)} className='p-2'>
                                    {t(value)}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        dataStudentReport?.map((value)=>(
                            <tr 
                                key={Math.random().toString(4)}
                                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                            >
                                {
                                    value.map((val)=> (
                                        <td key={Math.random().toString(4)} className='p-2'>
                                            {val}
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