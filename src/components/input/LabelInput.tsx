import { FC, ReactNode } from 'react'

type LabelProps = {
    children: ReactNode
}
const LabelInput:FC<LabelProps> = (props) => {
    return (
        <label className="block text-gray-700 text-sm font-bold mb-2">
            {props.children}
        </label>
    )
}

export default LabelInput