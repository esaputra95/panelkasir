import { FC, SelectHTMLAttributes } from "react"
import { OptionSelectInterface } from "../../interfaces/globalInterface";

interface  SelectOptionProps extends SelectHTMLAttributes<HTMLSelectElement>{
    register: any;
    label?: string;
    errors?: any;
    option: OptionSelectInterface[]
}

const SelectOption: FC<SelectOptionProps> = (props) => {
    const { name, register, label, errors, option, ...rest } = props
    return (
        <div className="w-full">
            <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {label}
            </label>
            <div className="mt-2">
                <select
                    {...register('gender')}
                    {...rest}
                    id="gender"
                    autoComplete="gender"
                    className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                    <option></option>
                    {
                        option.length > 0 ? option.map((value)=>(
                            <option key={value.value} value={value.value}>{value.label}</option>
                        )) : null
                    }
                </select>
            </div>
        </div>
    )
}

export default SelectOption