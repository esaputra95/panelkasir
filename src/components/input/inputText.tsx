import { InputHTMLAttributes, forwardRef } from "react"

interface  InputTextProps extends InputHTMLAttributes<HTMLInputElement>{
    label?: string;
    errors?: string
}

const InputText= forwardRef<HTMLInputElement, InputTextProps>((props, ref) => {
    const {  label, errors, className, ...rest } = props
    return (
        <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <input 
                ref={ref} 
                {...rest} 
                className={`appearance-none border rounded
                w-full py-2 px-3 text-gray-700 leading-tight 
                focus:outline-none focus:shadow-outline ${className}`}
            />
            <label className='text-red-500 text-sm font-light'>
               {errors ? errors :""}
            </label>
        </div>
    )
})

export default InputText