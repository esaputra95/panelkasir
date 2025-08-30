import { BsEyeFill, BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "../../../components/ui/Skeleton";
import { SubscriptionInterface } from "../../../interfaces/masters/SubscriptionInterface";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import moment from "moment";

type TableProps = {
    data?: SubscriptionInterface[],
    isFetching?: boolean,
    page: number,
    limit: number,
    onDelete:(id:string)=>void,
    onUpdate:(id:string)=>void,
    onDetail:(id:string)=>void
}

const header = [
    { 
        label: 'No',
        align: 'left',
        width: 'w-4'
    },
    { label: 'name' },
    { label: 'hp' },
    { label: 'address' },
    { 
        label: 'Action',
        width: 'w-16'
    },
] 

const Table: FC<TableProps> = (props) => {
    const { data, isFetching, page, limit, onDelete, onUpdate, onDetail } = props;
    const user = useSelector((state:RootState)=> state.userReducer);
    const { t } = useTranslation()
    const number:number = ((page-1)*limit)
    
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {
                            header.map((value)=>{ 
                                return(
                                    <>
                                        {
                                            value.label === "Action" ?
                                                user.level === "superadmin" || user.level == "admin" ? (
                                                    <th key={Math.random()} scope="col" className={`px-6 py-3 ${value.width ?? ''}`}>
                                                        {t(value.label)}
                                                    </th>
                                                ) : '':
                                                (
                                                <th key={Math.random()} scope="col" className={`px-6 py-3 ${value.width ?? ''}`}>
                                                    {t(value.label)}
                                                </th>
                                            )
                                        }
                                    </>
                                )
                            })
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
                                    {value?.storeId}
                                </td>
                                <td className="px-6 py-4">
                                    {moment(value?.startDate).format("YYYY-MM-DD")}
                                </td>
                                <td className="px-6 py-4">
                                    {moment(value?.endDate).format("YYYY-MM-DD")}
                                </td>
                                {
                                    user.level === "superadmin" || user.level == "admin" && (
                                        <td className="px-6 py-4 flex">
                                            <span title="Update" className="p-1.5 bg-green-50 hover:bg-green-100 hover:cursor-pointer rounded-full" onClick={()=>onUpdate(value?.id as string)}>
                                                <BsPencilFill className='text-green-600' />
                                            </span>
                                            <span title="Detail" className="p-1.5 bg-cyan-50 hover:bg-cyan-100 hover:cursor-pointer rounded-full" onClick={()=>onDetail(value.id as string)}>
                                                <BsEyeFill className='text-cyan-600' />
                                            </span>
                                            <span title={t("delete")} className="p-1.5 bg-red-50 hover:bg-red-100 hover:cursor-pointer rounded-full" onClick={()=>onDelete(value.id as string)}>
                                                <BsFillTrashFill className="text-red-600" />
                                            </span>
                                        </td>
                                    )
                                }
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