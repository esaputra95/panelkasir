import { Outlet } from "react-router-dom"
import SidebarLayout from "./SideBar"
import NavBar from "./NavBar"
import useAccess from "../../../utils/useAccess"
import Spinner from "../../ui/Spinner"
import HaveAccess from "../../../pages/DontHaveAccess"
import { useState } from "react"

const AdminLayout = () => {
    const [ menu, setMenu ] =useState(false);
    const { accessUser } = useAccess();

    const handleOpenMenu = ()=> {
        setMenu(state=>!state)
    }
    return (
        <>
            {
                accessUser.loading ? <Spinner /> : accessUser.status === 1 ? (
                <div className="w-full flex bg-gray-100">
                    <div className={`absolute flex lg:hidden z-[10] ${menu?'':'hidden'} h-screen `}>
                        <SidebarLayout/>
                    </div>
                    <div className={`hidden lg:flex ${menu?'lg:hidden':'lg:flex'}`}>
                        <SidebarLayout/>
                    </div>
                    <div className="w-full">
                        <NavBar
                            menu={menu}
                            handleOpenMenu={handleOpenMenu}
                        />
                        <div className="bg-white m-4 rounded-xl p-4">
                            <Outlet />
                        </div>
                    </div>
                </div>
            ) : accessUser.status === 0 ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="relative">
                        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200" />
                        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
                    </div>
                </div>
            ) : <HaveAccess />
        }
        </>
    )
}

export default AdminLayout