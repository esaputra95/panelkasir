import { useTranslation } from "react-i18next";
import { Language } from "../../../utils/Language"
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { BsList, BsPersonCircle, BsXLg } from "react-icons/bs";
import useAccess from "../../../utils/useAccess";
import { FC, useEffect, useMemo } from "react";
import AsyncSelect from 'react-select/async';
import useStore from "../../../hooks/slices/masters/useStore";
import { useDispatch, useSelector } from "react-redux";
import { setUserSlice } from "../../../redux/userSlice";
import { OptionSelectInterface } from "../../../interfaces/globalInterface";
import { SingleValue } from "react-select";
import { RootState } from "../../../redux/store";
import { useCookies } from "react-cookie";

type NavBarType = {
	menu:boolean;
	handleOpenMenu: () => void
}

const NavBar:FC<NavBarType> = (props) => {
	const {
		menu,
		handleOpenMenu
	} = props
	const user = useSelector((state:RootState)=> state.userReducer)
	const dispatch = useDispatch()
	const location = useLocation()
	const { t, i18n } = useTranslation();
	const navigate = useNavigate()
	const { token } = useAccess()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_a, _b, removeCookie] = useCookies(["token"]);

	const {optionStore, dataOptionStore} = useStore()

	const store = useMemo(()=> {
		return user.storeId ? dataOptionStore.filter(val=>val.value === user.storeId)?.[0] ?? dataOptionStore[0] : dataOptionStore[0]
	},[user.storeId, dataOptionStore]);
	
	useEffect(()=>{
		if(store?.value){
			dispatch(setUserSlice({
				storeId: store.value+''
			}))
		}
		
	}, [store])

	const onChangeLang = (e:string) => {
		const lang_code = e;
		i18n.changeLanguage(lang_code);
		window.localStorage.setItem('language', e)
	};
	
	const logOut = () => {
		removeCookie("token", { path: "/" })

  navigate("/login");
	}

	const onChangeStore = (value:SingleValue<OptionSelectInterface>) => {
		dispatch(
			setUserSlice({
				storeId: value?.value as string
			})
		)
	}

	return (
		<div className="w-full bg-white sticky top-0 z-[10] ">
			<div className="w-full flex justify-between h-16 items-center px-4">
				<div className="font-semibold flex items-center gap-2">
					<span onClick={handleOpenMenu}>
						{
							menu ? <BsXLg className='font-semibold h-5 w-5 hover:cursor-pointer' /> :
							<BsList className='font-semibold h-5 w-5 hover:cursor-pointer' />
						}
					</span>
					{t(location.pathname.replace('/', '').split('/').slice(-1)[0])}
				</div>
				<div className="flex space-x-2 w-6/12 items-center justify-end">
					<div className="w-6/12">
						<AsyncSelect
							className='w-full'
							cacheOptions
							value={store}
							loadOptions={optionStore}
							onChange={onChangeStore}
							defaultOptions
							placeholder="Pilih Toko"
							ref={(ref)=> ref}
						/>
					</div>
					<div className="flex gap-x-2 bg-gray-50 rounded-lg px-2 items-center">
						<Menu>
							<MenuHandler>
								<div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
									<BsPersonCircle className='h-8 w-8 hover:cursor-pointer' />
								</div>
							</MenuHandler>
							<MenuList>
								<MenuItem className="flex items-center gap-2"
									onClick={()=> navigate('/profile')}
								>
								<svg
									width="8"
									height="8"
									viewBox="0 0 8 8"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
									d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM10 5C10 5.53043 9.78929 6.03914 9.41421 6.41421C9.03914 6.78929 8.53043 7 8 7C7.46957 7 6.96086 6.78929 6.58579 6.41421C6.21071 6.03914 6 5.53043 6 5C6 4.46957 6.21071 3.96086 6.58579 3.58579C6.96086 3.21071 7.46957 3 8 3C8.53043 3 9.03914 3.21071 9.41421 3.58579C9.78929 3.96086 10 4.46957 10 5ZM8 9C7.0426 8.99981 6.10528 9.27449 5.29942 9.7914C4.49356 10.3083 3.85304 11.0457 3.454 11.916C4.01668 12.5706 4.71427 13.0958 5.49894 13.4555C6.28362 13.8152 7.13681 14.0009 8 14C8.86319 14.0009 9.71638 13.8152 10.5011 13.4555C11.2857 13.0958 11.9833 12.5706 12.546 11.916C12.147 11.0457 11.5064 10.3083 10.7006 9.7914C9.89472 9.27449 8.9574 8.99981 8 9Z"
									fill="#90A4AE"
									/>
								</svg>
						
								<Typography variant="small" className="font-medium">
									My Profile
								</Typography>
								</MenuItem>
								
								
								<hr className="my-2 border-blue-gray-50" />
								<MenuItem onClick={logOut} className="flex items-center gap-2 ">
								<svg
									width="16"
									height="14"
									viewBox="0 0 16 14"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
									d="M1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14C1.26522 14 1.51957 13.8946 1.70711 13.7071C1.89464 13.5196 2 13.2652 2 13V1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0ZM11.293 9.293C11.1108 9.4816 11.01 9.7342 11.0123 9.9964C11.0146 10.2586 11.1198 10.5094 11.3052 10.6948C11.4906 10.8802 11.7414 10.9854 12.0036 10.9877C12.2658 10.99 12.5184 10.8892 12.707 10.707L15.707 7.707C15.8945 7.51947 15.9998 7.26516 15.9998 7C15.9998 6.73484 15.8945 6.48053 15.707 6.293L12.707 3.293C12.6148 3.19749 12.5044 3.12131 12.3824 3.0689C12.2604 3.01649 12.1292 2.9889 11.9964 2.98775C11.8636 2.9866 11.7319 3.0119 11.609 3.06218C11.4861 3.11246 11.3745 3.18671 11.2806 3.2806C11.1867 3.3745 11.1125 3.48615 11.0622 3.60905C11.0119 3.73194 10.9866 3.86362 10.9877 3.9964C10.9889 4.12918 11.0165 4.2604 11.0689 4.3824C11.1213 4.50441 11.1975 4.61475 11.293 4.707L12.586 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H12.586L11.293 9.293Z"
									fill="#90A4AE"
									/>
								</svg>
								<Typography variant="small" className="font-medium">
									Sign Out
								</Typography>
								</MenuItem>
							</MenuList>
						</Menu>
						{token?.name}
					</div>
					<div className="flex items-center">
						{
							Language.map((value)=>(
								<div 
									key={Math.random().toString(5)} 
									className={`space-x-1 rounded-md hover:cursor-pointer`}>
										<div 
											onClick={()=>onChangeLang(value.code)}  
											className={`p-1 rounded-md hover:cursor-pointer ${i18n.language===value.code ? 'bg-gray-200' : 'bg-gray-50'}`}>
											{value.label}
										</div>
									
								</div>
							))
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default NavBar