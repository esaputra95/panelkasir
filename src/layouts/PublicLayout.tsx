import React from 'react'
import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
    return (
        <div>
            <div>PUBLIC LAYOUT</div>
            <Outlet />
        </div>
    )
}

export default PublicLayout