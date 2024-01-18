import { Outlet } from "react-router-dom"
import SidebarLayout from "./SideBar"
import NavBar from "./NavBar"
import useAccess from "../../../utils/useAccess"
import Spinner from "../../ui/Spinner"
import HaveAccess from "../DontHaveAccess"

const AdminLayout = () => {
    const { accessUser } = useAccess();
    return (
        <>
            {
                accessUser.loading ? <Spinner /> : accessUser.status ? (
                    <div className="w-full flex bg-gray-100">
                <SidebarLayout />
                <div className="w-full">
                        <NavBar />
                        <div className="bg-white m-4 rounded-xl p-4">
                            <Outlet />
                        </div>
                        
                    </div>
                </div>
                ) : <HaveAccess />
            }
            
        </>
    )
}

export default AdminLayout