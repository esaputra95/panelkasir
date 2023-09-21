import { FC, ReactNode } from "react"

interface ButtonProps {
    children: ReactNode,
    onClick: ()=>void
}

const Button:FC<ButtonProps> = (props) => {
    const { children, onClick } = props
    return (
        <button onClick={onClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            {children}
        </button>
    )
}

export default Button