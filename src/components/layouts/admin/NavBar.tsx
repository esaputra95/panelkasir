import { useTranslation } from "react-i18next";
import { Language } from "../../../utils/Language"
import { useLocation } from "react-router-dom";

const NavBar = () => {
	const location = useLocation()
	const { t, i18n } = useTranslation();

	const onChangeLang = (e:string) => {
		const lang_code = e;
		i18n.changeLanguage(lang_code);
		window.sessionStorage.setItem('language', e)
	};
	

	return (
		<div className="w-full bg-white sticky top-0 ">
			<div className="w-full flex justify-between h-16 items-center px-8">
				<div className="font-semibold ">{t(location.pathname.replace('/', '').split('/').slice(-1)[0])}</div>
				<div className="flex">
					{
						Language.map((value)=>(
							<div 
								key={Math.random().toString(5)} 
								onClick={()=>onChangeLang(value.code)} 
								className={`p-2 space-x-1 rounded-md hover:cursor-pointer ${i18n.language===value.code ? 'bg-gray-200' : 'bg-gray-50'}`}>
								{value.label}
							</div>
						))
					}
				</div>
			</div>
		</div>
	)
}

export default NavBar