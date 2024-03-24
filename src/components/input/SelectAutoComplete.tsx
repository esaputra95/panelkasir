/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react'
import { Controller } from 'react-hook-form';
import { GroupBase, OptionsOrGroups } from 'react-select';
import AsyncSelect from 'react-select/async';

interface SelectAutocompleteProps {
    control: any;
    loadOption : ((inputValue: string, callback: (options: OptionsOrGroups<any, GroupBase<any>>) => void) => void) | undefined
    errors: any;
    label?: string;
    name: string;
}
const SelectAutoComplete: FC<SelectAutocompleteProps> = (props) => {
    const { control, loadOption, errors, name, label, ...rest } = props
    return (
        <div className='w-full'>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <Controller
                {...rest}
                name={name}
                control={control}
                render={({field}) => (
                    <AsyncSelect
                        {...field}
                        cacheOptions
                        loadOptions={loadOption}
                        defaultOptions
                    />
                )}
                rules={{ required: true }}
            />
            <span className='text-red-300'>
            {
                errors[name]?.message ?? null
            }
            </span>
        </div>
    )
}

export default SelectAutoComplete