import { Outlet } from "react-router-dom"
import SidebarLayout from "./SideBar"
import NavBar from "./NavBar"

const AdminLayout = () => {
    return (
        <div className="w-full flex bg-gray-100">
            <SidebarLayout />
            <div className="w-full">
                <NavBar />
                <div className="bg-white m-4 rounded-xl p-4">
                    <Outlet />
                </div>
                
            </div>
        </div>
    )
}

export default AdminLayout