import { BiHomeCircle, BiSolidData } from "react-icons/bi";

const MenuItems = [
    {
        label: 'Dashboard',
        icon: <BiHomeCircle className='h-6 w-6' />,
        path: 'dashboard',
        active: false
    },
    {
        label: 'User',
        icon: <BiSolidData className='h-6 w-6'  />,
        path: 'user',
        active: false
    }
]

export default MenuItems