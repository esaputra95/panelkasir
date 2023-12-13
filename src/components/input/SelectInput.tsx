import Select from 'react-select'
import { OptionSelectInterface } from '../../interfaces/globalInterface'
import { FC, SelectHTMLAttributes } from 'react'
import { Controller } from 'react-hook-form';

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: OptionSelectInterface[];
    label: string;
    control: any;
    name: string;
    errors: any;
    setValue?: OptionSelectInterface
}
const SelectInput: FC<SelectInputProps> = (props) => {
    const { options, label, control, name, errors } = props
    return (
        <div className='w-full'>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <Controller
                control={control}
                name={name}
                render={({field}) => (
                    <Select {...field} options={options} />
                )}
            />
            <span className='text-red-300'>
            {
                errors[name]?.message ?? null
            }
            </span>
        </div>
    )
}

export default SelectInput