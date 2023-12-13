import { FC } from "react";

type TablePagingProps = {
    total: number;
    page: number;
    handlePage: (page: number) => void
};

const TablePaging:FC<TablePagingProps> = (props) => {
    const {total, page, handlePage} = props
    let listPage = [];
    for (let index = 1; index <= total; index++) {
        listPage.push(
        <li key={Math.random().toString(5)} onClick={()=> handlePage(index)}>
            <span className={`${page===index ? 'bg-gray-300' : 'bg-white'} hover:cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`} >
            {index}
            </span>
        </li>)
    }
    return (
        <div className="w-full flex items-center justify-start py-4">
            
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-sm">
                    <li onClick={()=> handlePage(-1)}>
                        <span
                            className="flex hover:cursor-pointer items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                            Previous
                        </span>
                    </li>
                    {
                        listPage
                    }
                    <li onClick={()=> handlePage(-2)}>
                        <span
                        className="flex hover:cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Next
                        </span>
                    </li>
                </ul>
            </nav>
            
        </div>

    )
}

export default TablePaging