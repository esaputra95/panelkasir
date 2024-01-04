import { forwardRef } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface  InputTextProps extends NumericFormatProps {
    label?: string;
    errors?: string;
    thousandSeparator?: ',' | '.';
    decimalSeparator?: ',' | '.';
}

const InputNumeric = forwardRef<HTMLInputElement, InputTextProps>((props, ref) => {
    const { thousandSeparator, className, decimalSeparator, label, ...rest } = props
    return (
        <div className='w-full'>
            {
                label? (
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        {label}
                    </label>
                ) : null
            }
            <NumericFormat
                thousandSeparator={thousandSeparator}
                decimalSeparator={decimalSeparator}
                decimalScale={2}
                className={`appearance-none border rounded
                w-full py-2 px-3 text-gray-700 leading-tight 
                focus:outline-none focus:shadow-outline ${className}`}
                getInputRef={ref}
                {...rest}
            />
        </div>
    )
})

export default InputNumeric