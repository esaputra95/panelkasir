import { SelectHTMLAttributes, forwardRef } from "react"
import { OptionSelectInterface } from "../../interfaces/globalInterface";

interface  SelectOptionProps extends SelectHTMLAttributes<HTMLSelectElement>{
    label?: string;
    errors?: string;
    option: OptionSelectInterface[];
    allowNull?: boolean
}

const SelectOption= forwardRef<HTMLSelectElement, SelectOptionProps>((props, ref) => {
    const { label, errors, option, allowNull=true, ...rest } = props
    return (
        <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <div className="mt-2">
                <select
                    ref={ref} 
                    {...rest} 
                    id="gender"
                    autoComplete="gender"
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                >
                    {
                        allowNull ? <option></option> : null 
                    }
                    
                    {
                        option.length > 0 ? option.map((value)=>(
                            <option key={value.value} value={value.value}>{value.label}</option>
                        )) : null
                    }
                </select>
            </div>
            <label className='text-red-500 text-sm font-light'>
                {
                    errors? errors : null
                }
            </label>
        </div>
    )
})

export default SelectOption