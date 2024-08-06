import React, { FC, ReactNode } from 'react'

const backgroundColors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-500',
    lime: 'bg-lime-500'
}

const textColors = {
    white: 'text-white'
}
type CardComponent = {
    label: string;
    value: string;
    bgColor: 'blue' | 'green' | 'purple' | 'lime';
    textColor: 'white';
    description?: string;
    children?: ReactNode;
}
const CardDashboard:FC<CardComponent> = (props) => {
    const {
        bgColor='blue',
        label,
        textColor='white',
        children,
        value,
        description
    } = props;
    return (
        <div className={`${backgroundColors[bgColor]} h-32 rounded-lg bg-`}>
            <div className="w-full h-24 flex items-center justify-between px-4">
                <div className='flex flex-col'>
                    <label className={`text-2xl font-semibold text-white ${textColors[textColor]}`}>{value}</label>
                    <label className={`text-xs ${textColors[textColor]}`}>{description}</label>
                </div>
                {children}
            </div>
            <div className="bottom-0 w-full py-2 border-t border-white flex items-center justify-center">
                <label className={`text-white text-sm ${textColors[textColor]}`}>{label}</label>
            </div>
            </div>
    )
}

export default CardDashboard