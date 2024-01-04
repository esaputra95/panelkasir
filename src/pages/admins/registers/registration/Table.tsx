import { 
    BsEyeFill,
    BsFillTrashFill,
    BsFillSendFill,
    BsArrowRightCircleFill,
} from "react-icons/bs";
import { FC } from "react";
import { RegistrationTableInterface } from "../../../../interfaces/registers/registrationInterface";
import { useTranslation } from "react-i18next";
import Skeleton from "../../../../components/ui/Skeleton";
import { useNavigate } from "react-router-dom";

type TableProps = {
    data?: RegistrationTableInterface[],
    isFetching?: boolean,
    page: number,
    limit: number,
    onDelete:(id:string)=>void,
    onUpdate:(id:string)=>void,
    onDetail:(id:string)=>void,
    sendMessage: (phone: string)=> void,
    changeStatusInvoice: (id:string, status:number) => void
}

const header = [
    { 
        label: 'No',
        align: 'left',
        width: 'w-4'
    },
    { label: 'name' },
    { label: 'packages' },
    { label: 'sessions'},
    { label: 'status'},
    { 
        label: 'Action',
        width: 'w-16'
    },
] 

const Table: FC<TableProps> = (props) => {
    const { 
        data,
        isFetching,
        page,
        limit,
        onDelete,
        // sendMessage,
        changeStatusInvoice
    } = props;
    const { t } = useTranslation()
    const navigate = useNavigate()
    const number:number = ((page-1)*limit)
    return (
        <div className="relative overflow-x-auto max-h-96">
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
                            <tr key={value.id} 
                                className="overflow-auto bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <td scope="row" 
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {(number+index+1)}
                                </td>
                                <td className="px-6 py-4">
                                    {/* {  } */}
                                </td>
                                <td className="px-6 py-4">
                                    {/* { value.packages.name } */}
                                </td>
                                <td className="px-6 py-4">
                                    {/* { value.sessions.name } */}
                                </td>
                                <td className="px-6 py-4">
                                    { value.status === 0 ? 
                                    (<span className="bg-red-200 p-1 rounded-md text-white">non-active</span>) : 
                                    (<span className="bg-green-200 p-1 rounded-md text-white">active</span>) }
                                </td>
                                <td className="px-6 py-4 flex">
                                    <span title="Change Status" 
                                        className="p-1.5 bg-blue-50 hover:bg-blue-100 hover:cursor-pointer rounded-full" 
                                        onClick={()=> changeStatusInvoice(value.id ?? '', value.status ?? 0)}
                                    >
                                            <BsArrowRightCircleFill className='text-blue-600' />
                                    </span>
                                    <span title="Send Chat"
                                        className="p-1.5 bg-blue-50 hover:bg-blue-100 hover:cursor-pointer rounded-full"
                                        // onClick={()=>sendMessage(value. ?? '')}
                                    >
                                        <BsFillSendFill className='text-blue-600' />
                                    </span>
                                    {/* <span title="Update"
                                        className="p-1.5 bg-green-50 hover:bg-green-100 hover:cursor-pointer rounded-full"
                                        onClick={()=>onUpdate(value.id ?? '')}
                                    >
                                        <BsPencilFill className='text-green-600' />
                                    </span> */}
                                    <span title="Detail"
                                        className="p-1.5 bg-cyan-50 hover:bg-cyan-100 hover:cursor-pointer rounded-full"
                                        onClick={()=>navigate(`/register?id=${value.id}`)}
                                    >
                                        <BsEyeFill className='text-cyan-600' />
                                    </span>
                                    <span title={t("delete")}
                                        className="p-1.5 bg-red-50 hover:bg-red-100 hover:cursor-pointer rounded-full" 
                                        onClick={()=>onDelete(value.id ?? '')}
                                    >
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