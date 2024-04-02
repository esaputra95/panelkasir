import { BsEyeFill, BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import { FC } from "react";
import { TentorNotAvailableInterface } from "../../../../interfaces/schedule/tentorNotAvailableInterface";
import { useTranslation } from "react-i18next";
import Skeleton from "../../../../components/ui/Skeleton";
import { UserInterface } from "../../../../interfaces/userInterface";
import moment from "moment-timezone";

const header = [
    { 
        label: 'No',
        align: 'left',
        width: 'w-4'
    },
    { label: 'tutor' },
    { label: 'start-date' },
    { label: 'until-date' },
    { label: 'description' },
    { 
        label: 'Action',
        width: 'w-16'
    },
]

interface DataTableTentorNotAvailableType extends TentorNotAvailableInterface {
    userTentor?: UserInterface
}

type tableProps = {
    data?: DataTableTentorNotAvailableType[],
    isFetching?: boolean,
    page: number,
    limit: number,
    onDelete:(id:string)=>void,
    onUpdate:(id:string)=>void,
    onDetail:(id:string)=>void,
}

const Table: FC<tableProps> = (props) => {
    const {
        data,
        isFetching,
        page,
        limit,
        onDelete,
        onUpdate,
        onDetail
    } = props;
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
                                <span className="w-full">{t(value.label)}</span>
                            </th>
                        ))
                    }
                </tr>
            </thead>
                <tbody>
                    {
                        !isFetching && data && data.length > 0 ? data.map((value, index)=>(
                            <tr key={value.id} className="overflow-auto bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {(number+index+1)}
                                </th>
                                <td className="px-6 py-4">
                                    {value.userTentor?.name ?? ''}
                                </td>
                                <td className="px-6 py-4">
                                    {moment(value.startDate).tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss')}
                                </td>
                                <td className="px-6 py-4">
                                    {moment(value.untilDate).tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss')}
                                </td>
                                <td className="px-6 py-4">
                                    {value.description}
                                </td>
                                <td className="px-6 py-4 flex">
                                    <span title="Update" className="p-1.5 bg-green-50 hover:bg-green-100 hover:cursor-pointer rounded-full" onClick={()=>onUpdate(value.id ?? '')}>
                                        <BsPencilFill className='text-green-600' />
                                    </span>
                                    <span title="Detail" className="p-1.5 bg-cyan-50 hover:bg-cyan-100 hover:cursor-pointer rounded-full" onClick={()=>onDetail(value.id ?? '')}>
                                        <BsEyeFill className='text-cyan-600' />
                                    </span>
                                    <span title={t("delete")} className="p-1.5 bg-red-50 hover:bg-red-100 hover:cursor-pointer rounded-full" onClick={()=>onDelete(value.id ?? '')}>
                                        <BsFillTrashFill className="text-red-600" />
                                    </span>
                                </td>
                            </tr>
                        )) : null
                    }
                </tbody>
            </table>
            {
                isFetching ? 
                <Skeleton cols={4} rows={2} /> : null
            }
            
        </div>
    )
}

export default Table