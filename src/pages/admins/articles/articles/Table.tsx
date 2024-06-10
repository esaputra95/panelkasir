import { BsEyeFill, BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import { FC } from "react";
import { ArticleTableInterface } from "../../../../interfaces/articles/ArticleInterface";
import { useTranslation } from "react-i18next";
import Skeleton from "../../../../components/ui/Skeleton";

type TableProps = {
    data?: ArticleTableInterface[],
    isFetching?: boolean,
    page: number,
    limit: number,
    onDelete:(id:number)=>void,
    onUpdate:(id:number)=>void,
    onDetail:(id:number)=>void
}

const header = [
    { 
        label: 'No',
        align: 'left',
        width: 'w-4'
    },
    { label: 'name' },
    { label: 'category' },
    { label: 'status' },
    { label: 'image' },
    { 
        label: 'Action',
        width: 'w-16'
    },
] 

const Table: FC<TableProps> = (props) => {
    const { data, isFetching, page, limit, onDelete, onUpdate, onDetail } = props;
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
                                    {value?.title}
                                </td>
                                <td className="px-6 py-4">
                                    {value?.category?.name}
                                </td>
                                <td className="px-6 py-4">
                                    {value?.status}
                                </td>
                                <td className="px-6 py-4">
                                    <img className="h-16 w-16" src={`${import.meta.env.VITE_API_URL}/images/articles/${value.image}`} />
                                </td>
                                <td className="px-6 py-4 flex">
                                    <span title="Update" className="p-1.5 bg-green-50 hover:bg-green-100 hover:cursor-pointer rounded-full" onClick={()=>onUpdate(value?.id ?? 0)}>
                                        <BsPencilFill className='text-green-600' />
                                    </span>
                                    <span title="Detail" className="p-1.5 bg-cyan-50 hover:bg-cyan-100 hover:cursor-pointer rounded-full" onClick={()=>onDetail(value.id ?? 0)}>
                                        <BsEyeFill className='text-cyan-600' />
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