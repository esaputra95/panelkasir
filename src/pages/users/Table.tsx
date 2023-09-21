import { BsEyeFill, BsFillTrashFill } from "react-icons/bs";
import { UserInterface } from "../../interfaces/userInterface";
import { FC } from "react";
type tableProps = {
    data: UserInterface[]
}
const Table: FC<tableProps> = (props) => {
    const { data } = props
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            No
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Username
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length>0 && data.map((value, index)=>(
                            <tr key={value.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index+1}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {value.name.firstname}
                                </th>
                                <td className="px-6 py-4">
                                    {value.username}
                                </td>
                                <td className="px-6 py-4 flex">
                                    <BsEyeFill className='text-green-600' />
                                    <BsFillTrashFill className="text-red-600" />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table