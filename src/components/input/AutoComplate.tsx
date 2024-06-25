import { InputHTMLAttributes, forwardRef, useState } from "react"
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import { OptionSelectInterface } from "../../interfaces/globalInterface";

interface  AutoCompleteProps extends InputHTMLAttributes<HTMLInputElement>{
    label?: string;
    errors?: string;
    dataOption: OptionSelectInterface[];
    onSelectData: (value: string | number) => void
}

const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>((props, ref) => {
    const [show, setShow] = useState(false)
    const {
        label, 
        errors, 
        className,
        dataOption, 
        onSelectData,
        ...rest 
    } = props;

    return (
        <div className='w-full relative'>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 end-5 flex items-center ps-3 pointer-events-none">
                    {
                        show ?
                        <AiFillCaretRight />:
                        <AiFillCaretDown />
                    }
                </div>
                <input
                    ref={ref} 
                    {...rest} 
                    type="text"
                    id="simple-search"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                        ${className}`}
                    onFocus={()=> setShow(true) }
                    onBlur={()=> setShow(false)}
                />
            </div>
            {
                show ? 
                <div className='w-full mt-1 border bg-gray-50 rounded-md absolute'>
                    {
                        dataOption.length > 0 ? dataOption.map((value)=> (
                            <div 
                                onClick={()=>onSelectData(value.value)}
                                className={
                                    `w-full h-10 px-1 flex rounded-md
                                    items-center hover:cursor-pointer 
                                    hover:bg-blue-50
                                    ${value.value==='1' ? 'bg-blue-200' : ''}`}>
                                {value.label}
                            </div>
                        )) : <div 
                            className={
                                `w-full h-10 px-1 flex rounded-md
                                items-center hover:cursor-pointer 
                                hover:bg-blue-50`}>
                            No Result
                        </div>
                    }
                </div>
                : null
            }
            <label className="text-red-300">
                {errors ? errors :""}
            </label>
        </div>
    )
})

export default AutoComplete