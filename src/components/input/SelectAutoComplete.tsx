import React, { FC } from 'react'
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { OptionSelectInterface } from '../../interfaces/globalInterface';

interface SelectAutocompleteProps {
    control: any;
    loadOption : (value: any) => Promise<any>;
    errors: any;
    label?: string;
    name: string;
    // setValue?: OptionSelectInterface
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
                // defaultValue={{value:'77654c2d-f2ac-4e01-9692-60fabbb1bd68', label:'Kelas A'}}
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