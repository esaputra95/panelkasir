import { FC } from 'react'
import { DataDonationInterface } from '../../../../interfaces/reports/DonationReport'
import { t } from 'i18next';
import helperReport from '../../../../utils/headerReport';

const Data: FC<DataDonationInterface> = (props) => {
    const { dataDonationReport } = props;
    return (
        <div className='w-full'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        {
                            helperReport.headerDonation.map(value=>(
                                <th className='p-2'>
                                    {t(value)}
                                </th>
                            ))
                        }
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        dataDonationReport?.map((value)=>(
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