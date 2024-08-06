import { forwardRef } from 'react';
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';

interface  InputTextProps extends CurrencyInputProps {
    label?: string;
    errors?: string;
    groupSeparator?: '.' | ',';
    decimalSeparator?: ',' | '.';
    value: number;
    error?: string
}

const InputNumeric = forwardRef<HTMLInputElement, InputTextProps>((props, ref) => {
    const { groupSeparator, className, decimalSeparator, label, value, error, ...rest } = props
    return (
        <div className='w-full'>
            {
                label? (
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        {label}
                    </label>
                ) : null
            }
            <CurrencyInput 
                ref={ref}
                groupSeparator={groupSeparator}
                className={`appearance-none border rounded
                w-full py-2 px-3 text-gray-700 leading-tight 
                focus:outline-none focus:shadow-outline ${className}`}  
                decimalSeparator={decimalSeparator} 
                value={value}
                {...rest}
            />
            <span className='text-red-300'>
            {
                error
            }
            </span>
        </div>
    )
})

export default InputNumeric