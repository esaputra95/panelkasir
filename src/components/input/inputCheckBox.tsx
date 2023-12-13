import { InputHTMLAttributes, forwardRef } from 'react'

interface  InputCheckboxProps extends InputHTMLAttributes<HTMLInputElement>{
    label?: string;
    errors?: string
}

const InputCheckBox =  forwardRef<HTMLInputElement, InputCheckboxProps>((props, ref) => {
    const {  label, ...rest } = props
    return (
        <div className="flex items-center mb-4">
            <input
                ref={ref} 
                {...rest} 
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
                htmlFor="default-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
                {label??''}
            </label>
        </div>
    )
})

export default InputCheckBox