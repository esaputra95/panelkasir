
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux'
import { setMenu } from '../../../redux/menuSlice'
import {
	Card,
	Typography,
	List,
	ListItem,
	ListItemPrefix,
	AccordionBody,
	AccordionHeader,
	Accordion
} from "@material-tailwind/react";
import {
    InboxIcon,
	HomeIcon,
	DocumentChartBarIcon,
	BuildingLibraryIcon,
	Cog6ToothIcon
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTranslation } from 'react-i18next';
import {
	DonationMenu,
	MasterMenu,
	ArticleMenu,
	SettingMenu
} from './MenuItems';
import { RootState } from '../../../redux/store';
import useAccess from '../../../utils/useAccess';

const SideBarLayout = () => {

    const navigate = useNavigate();
    const location = useLocation()
    const selector = useSelector((state: RootState) => state.menu)
    const dispatch = useDispatch()
	const { token } = useAccess()

    const handleOnClickMenu = (path:string) => {
        dispatch(setMenu(path))
        navigate(path)
    }

    useEffect(()=> {
        const path = location.pathname === "/" ? 'dashboard' : location.pathname.replace('/', '');
        dispatch(setMenu(path));
    },[])

    const [open, setOpen] = useState('dashboard');

	const handleOpen = (value:string) => {
		setOpen(open === value ? 'dashboard' : value);
	};

	const { t } = useTranslation();

    return (
        <Card className="w-full sticky top-0 overflow-auto h-screen 
			max-w-[20rem] p-4 rounded-none shadow-xl shadow-blue-gray-900/5"
		>
			<div className="mb-2 p-4 bg-white">
				<Typography variant="h5" color="blue-gray">
					BERBAGI MASJID
				</Typography>
			</div>
			<List>
				<ListItem 
					className={`${token?.userType==="admin" 
						|| token?.userType === "tentor"? `flex`: 'hidden'}`
					} 
					onClick={()=>handleOnClickMenu('dashboard')}>
					<ListItemPrefix>
						<HomeIcon className="h-5 w-5" />
					</ListItemPrefix>
					{t('homes')}
				</ListItem>
				<Accordion
					open={open === 'master-data'}
					icon={
						<ChevronDownIcon
						strokeWidth={2.5}
						className={`mx-auto h-4 w-4 transition-transform 
							${token?.userType==="admin" ? 'flex':'hidden'}
							${open === 'master-data' ? "rotate-180" : ""}`
						}
						/>
					}
				>
					<ListItem className={`p-0 ${token?.userType==="admin" ? 'flex':'hidden'}`} selected={open === 'master-data'}>
						<AccordionHeader onClick={() => handleOpen('master-data')} className="border-b-0 p-3">
							<ListItemPrefix>
								<InboxIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Typography color="blue-gray" className="mr-auto font-normal">
								{t('data-masters')}
							</Typography>
						</AccordionHeader>
					</ListItem>
					<AccordionBody className="py-1">
						<List className="p-0">
							{
								MasterMenu.map((value)=> (
									<ListItem
										selected={
											selector.menu === value.path ? true : false
										} 
										key={Math.random()} 
										onClick={()=>handleOnClickMenu(value.path)}
									>
										<ListItemPrefix>
											<ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
										</ListItemPrefix>
										{t(value.label)}
									</ListItem>
								))
							}
						</List>
					</AccordionBody>
				</Accordion>
				<Accordion
					open={open === 'donations'}
					icon={
						<ChevronDownIcon
						strokeWidth={2.5}
						className={`mx-auto h-4 w-4 transition-transform 
							${token?.userType==="admin" ? 'flex':'hidden'}
							${open === 'donations' ? "rotate-180" : ""}`
						}
						/>
					}
				>
					<ListItem className={`p-0 ${token?.userType==="admin" ? 'flex':'hidden'}`} selected={open === 'donations'}>
						<AccordionHeader onClick={() => handleOpen('donations')} className="border-b-0 p-3">
							<ListItemPrefix>
								<BuildingLibraryIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Typography color="blue-gray" className="mr-auto font-normal">
								{t('donations')}
							</Typography>
						</AccordionHeader>
					</ListItem>
					<AccordionBody className="py-1">
						<List className="p-0">
							{
								DonationMenu.map((value)=> (
									<ListItem
										selected={
											selector.menu === value.path ? true : false
										} 
										key={Math.random()} 
										onClick={()=>handleOnClickMenu(value.path)}
									>
										<ListItemPrefix>
											<ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
										</ListItemPrefix>
										{t(value.label)}
									</ListItem>
								))
							}
						</List>
					</AccordionBody>
				</Accordion>
				<Accordion
					open={open === 'articles'}
					icon={
						<ChevronDownIcon
						strokeWidth={2.5}
						className={`mx-auto h-4 w-4 transition-transform 
							${token?.userType==="admin" ? 'flex':'hidden'}
							${open === 'articles' ? "rotate-180" : ""}`
						}
						/>
					}
				>
					<ListItem className={`p-0 ${token?.userType==="admin" ? 'flex':'hidden'}`} selected={open === 'articles'}>
						<AccordionHeader onClick={() => handleOpen('articles')} className="border-b-0 p-3">
							<ListItemPrefix>
								<DocumentChartBarIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Typography color="blue-gray" className="mr-auto font-normal">
								{t('articles')}
							</Typography>
						</AccordionHeader>
					</ListItem>
					<AccordionBody className="py-1">
						<List className="p-0">
							{
								ArticleMenu.map((value)=> (
									<ListItem
										selected={
											selector.menu === value.path ? true : false
										} 
										key={Math.random()} 
										onClick={()=>handleOnClickMenu(value.path)}
									>
										<ListItemPrefix>
											<ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
										</ListItemPrefix>
										{t(value.label)}
									</ListItem>
								))
							}
						</List>
					</AccordionBody>
				</Accordion>
				<Accordion
					open={open === 'settings'}
					icon={
						<ChevronDownIcon
						strokeWidth={2.5}
						className={`mx-auto h-4 w-4 transition-transform 
							${token?.userType==="admin" ? 'flex':'hidden'}
							${open === 'settings' ? "rotate-180" : ""}`
						}
						/>
					}
				>
					<ListItem className={`p-0 ${token?.userType==="admin" ? 'flex':'hidden'}`} selected={open === 'settings'}>
						<AccordionHeader onClick={() => handleOpen('settings')} className="border-b-0 p-3">
							<ListItemPrefix>
								<Cog6ToothIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Typography color="blue-gray" className="mr-auto font-normal">
								{t('settings')}
							</Typography>
						</AccordionHeader>
					</ListItem>
					<AccordionBody className="py-1">
						<List className="p-0">
							{
								SettingMenu.map((value)=> (
									<ListItem
										selected={
											selector.menu === value.path ? true : false
										} 
										key={Math.random()} 
										onClick={()=>handleOnClickMenu(value.path)}
									>
										<ListItemPrefix>
											<ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
										</ListItemPrefix>
										{t(value.label)}
									</ListItem>
								))
							}
						</List>
					</AccordionBody>
				</Accordion>
			</List>
		</Card>
    )
}

export default SideBarLayout