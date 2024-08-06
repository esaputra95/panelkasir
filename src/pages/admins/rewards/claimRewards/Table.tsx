import { BsFillTrashFill, BsDownload } from "react-icons/bs";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "../../../../components/ui/Skeleton";
import { ClaimRewardsInterface } from "../../../../interfaces/rewards/ClaimRewardsInterface";
import moment from "moment";

type TableProps = {
    data?: ClaimRewardsInterface[],
    isFetching?: boolean,
    page: number,
    limit: number,
    onDelete:(id:number)=>void,
    onUpdate:(id:number)=>void,
    onDetail:(id:number)=>void,
    downloadClaimReward: (id: number) => Promise<void>
}

const header = [
    { 
        label: 'No',
        align: 'left',
        width: 'w-4'
    },
    { label: 'invoice' },
    { label: 'date' },
    { 
        label: 'Action',
        width: 'w-16'
    },
] 

const Table: FC<TableProps> = (props) => {
    const { data, isFetching, page, limit, onDelete, downloadClaimReward } = props;
    const { t } = useTranslation()
    const number:number = ((page-1)*limit)
    
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {
                            header.map((value)=>(
                                <th key={Math.random()} scope="col" className={`px-6 py-3 ${value.width ?? ''}`}>
                                    {t(value.label)}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        !isFetching && data && data.length > 0 ? data.map((value, index)=>(
                            <tr key={value.id} className="overflow-auto bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {(number+index+1)}
                                </td>
                                <td className="px-6 py-4">
                                    {value.invoice}
                                </td>
                                <td className="px-6 py-4">
                                    {moment(value?.date+'').format('DD-MM-YYYY HH:mm:ss')}
                                </td>
                                <td className="px-6 py-4 flex">
                                <span
                                        title={t("download")} 
                                        className="p-1.5 bg-blue-50 hover:bg-blue-100 hover:cursor-pointer rounded-full"
                                        onClick={()=>downloadClaimReward(value.id ?? 0)}
                                    >
                                        <BsDownload className="text-blue-600" />
                                    </span>
                                    <span title={t("delete")} className="p-1.5 bg-red-50 hover:bg-red-100 hover:cursor-pointer rounded-full" onClick={()=>onDelete(value.id ?? 0)}>
                                        <BsFillTrashFill className="text-red-600" />
                                    </span>
                                </td>
                            </tr>
                        )) : <tr>
                                <td className="text-center" colSpan={7}>
                                    <span>{t("data-empty")}</span>
                                </td>
                            </tr>
                    }
                </tbody>
            </table>
            {
                isFetching ? 
                <Skeleton cols={4} rows={4} /> : null
            }
            
        </div>
    )
}

export default Table