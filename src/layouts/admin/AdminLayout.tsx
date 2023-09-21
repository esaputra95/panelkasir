import { Outlet } from "react-router-dom"
import SidebarLayout from "./SideBar"

const AdminLayout = () => {
    return (
        <div className="w-full flex bg-gray-100">
            <SidebarLayout />
            <div className="w-full">
                <div className="w-full bg-gray-400 h-16 flex items-center justify-center">
                    Header 
                </div>
                <div className="bg-white m-4 rounded-xl p-4">
                    <Outlet />
                </div>
                
            </div>
        </div>
    )
}

export default AdminLayout