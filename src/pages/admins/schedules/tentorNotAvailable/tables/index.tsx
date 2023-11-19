import React from 'react'
import Header from './Filter'
import Body from '../Table'

const Table = () => {
    return (
        <div className="relative overflow-x-auto max-h-96">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <Header />
            </table>
        </div>
    )
}

export default Table