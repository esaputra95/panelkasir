import { FC } from 'react'

type SkeletonProps = {
    rows: number;
    cols: number;
}
const Skeleton:FC<SkeletonProps> = (props) => {
    const { rows, cols } = props;
    const component = []
    for (let index = 0; index < rows; index++) {
        component.push(<SkeletonComponent key={index} />)
    }
    return<div className={`w-full grid grid-cols-${cols} gap-4 py-2 divide-y divide-gray-200 animate-pulse`}>{component}</div>
}

const SkeletonComponent= () => {
    return(
            <div className="w-full h-6 rounded-full bg-gray-300" />
    )
}

export default Skeleton