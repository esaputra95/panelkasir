
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setMenu } from './../../redux/menuSlice'
import { RootState } from './../../redux/store'
import Header from './Header'
import MenuItems from './MenuItems'


const SideBarLayout = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const selector = useSelector((state: RootState) => state.menu)
    const dispatch = useDispatch()

    const handleOnClickMenu = (path:string) => {
        dispatch(setMenu(path))
        navigate(path)
    }

    useEffect(()=> {
        const path = location.pathname === "/" ? 'dashboard' : location.pathname.replace('/', '');
        dispatch(setMenu(path));
    },[])
    return (
        <aside
            id="default-sidebar"
            className="w-64 hidden lg:grid md:grid xl:grid h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
        >
            <div className="h-full bg-gray-50 overflow-y-auto  dark:bg-gray-800">
                <Header />
                <ul className="space-y-2  font-medium">
                    {
                        MenuItems.map((value)=> (
                            <li onClick={()=>handleOnClickMenu(value.path)} key={value.label}>
                                <span
                                    className={`flex mx-2 ${selector.menu === value.path ? 'bg-gray-400 ': 'bg-gray-300'}items-center p-2 text-gray-900 rounded-lg hover:cursor-pointer group`}
                                >
                                    {value.icon}
                                    <span className="flex-1 ml-3 whitespace-nowrap">{value.label}</span>
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </aside>
    )
}

export default SideBarLayout