import { BsEyeFill, BsFillTrashFill } from "react-icons/bs";
import { UserInterface } from "../../interfaces/userInterface";
import { FC } from "react";

type tableProps = {
    data?: UserInterface[],
    onDelete:(id:number)=>void,
}

const header = [
    { label: 'No' },
    { label: 'Name' },
    { label: 'Username' },
    { label: 'Action' },
] 

const Table: FC<tableProps> = (props) => {
    const { data, onDelete } = props
    return (
        <div className="relative overflow-x-auto max-h-96">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {
                            header.map((value)=>(
                                <th key={Math.random()} scope="col" className="px-6 py-3">
                                    {value.label}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length? data?.map((value, index)=>(
                            <tr key={value.id} className="overflow-auto bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index+1}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {value?.name?.firstname}
                                </th>
                                <td className="px-6 py-4">
                                    {value.username}
                                </td>
                                <td className="px-6 py-4 flex">
                                    <BsEyeFill className='text-green-600' />
                                    <span onClick={()=>onDelete(value.id)}>
                                        <BsFillTrashFill className="text-red-600" />
                                    </span>
                                </td>
                            </tr>
                        )) : null
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table