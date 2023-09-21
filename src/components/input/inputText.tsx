import { FC, InputHTMLAttributes } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement>

interface  InputTextProps extends InputProps{
    label: string
}

const InputText: FC<InputTextProps> = (props) => {
    const { label, ...rest } = props
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...rest} />
      </div>
    )
}

export default InputText