import { BsEyeFill, BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "../../../../components/ui/Skeleton";
import { SaleStockistTableInterface } from "../../../../interfaces/sales/SaleStockistInterface";
import moment from "moment";
import { Link } from "react-router-dom";

type TableProps = {
    data?: SaleStockistTableInterface[],
    isFetching?: boolean,
    page: number,
    limit: number,
    onDelete:(id:number)=>void,
}

const header = [
    { 
        label: 'No',
        align: 'left',
        width: 'w-4'
    },
    { label: 'date' },
    { label: 'invoice' },
    { label: 'seller' },
    { label: 'total', align: 'right' },
    { label: 'status' },
    { 
        label: 'Action',
        width: 'w-16'
    },
] 

const status = {
    'create': 'bg-gray-200',
    'sent': 'bg-blue-200 text-white',
    'return': 'bg-red-300 text-white',
    'finish': 'bg-green-500 text-white'
}

const Table: FC<TableProps> = (props) => {
    const { data, isFetching, page, limit, onDelete } = props;
    const { t } = useTranslation()
    const number:number = ((page-1)*limit)
    
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {
                            header.map((value)=>(
                                <th key={Math.random()} scope="col" className={`px-6 py-3 ${value.width ?? ''} text-${value.align}`}>
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
                                    {moment(value?.date).format('DD-MM-YYYY HH:mm:ss')}
                                </td>
                                <td className="px-6 py-4">
                                    {value?.invoice}
                                </td>
                                <td className="px-6 py-4">
                                    {value?.users?.name}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {value?.total}
                                </td>
                                <td className={`px-6 py-4`}>
                                    <span className={`${status[value.status]} py-1 px-2 rounded-xl`}>
                                        {value.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex">
                                    <Link to={`create/${value.id}`} title="Update" className="p-1.5 bg-green-50 hover:bg-green-100 hover:cursor-pointer rounded-full">
                                        <BsPencilFill className='text-green-600' />
                                    </Link>
                                    <Link to={`invoice/${value.id}`} className="p-1.5 bg-cyan-50 hover:bg-cyan-100 hover:cursor-pointer rounded-full">
                                        <BsEyeFill className='text-cyan-600' />
                                    </Link>
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