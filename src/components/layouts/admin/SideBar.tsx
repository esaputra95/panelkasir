
import React, { useEffect, useState } from 'react'
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
	Cog6ToothIcon,
	CurrencyDollarIcon,
	DocumentChartBarIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTranslation } from 'react-i18next';
import {
	MasterMenu,
	SettingMenu,
	SalesMenu,
	ReportMenu,
} from './MenuItems';
import { RootState } from '../../../redux/store';
import useAccess from '../../../utils/useAccess';

const colorTheme = {
	menuHover: `group 
		hover:bg-gradient-to-r 
		hover:from-cyan-700 
		hover:to-blue-700`,
	menuActive: `group 
		bg-gradient-to-r
		from-cyan-700 
		to-blue-700`,
	textHover: 'group-hover:text-white',
	textActive: 'text-white'
}

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
        const path = location.pathname === "/" ? 'dashboard' : location.pathname;
		if(path){
			setOpen(path.split('/')[1])
		}
        dispatch(setMenu(path));
    },[])

    const [open, setOpen] = useState('dashboard');

	const handleOpen = (value:string) => {
		setOpen(open === value ? 'dashboard' : value);
	};

	const { t } = useTranslation();

    return (
        <Card className="w-full sticky top-0 overflow-auto h-screen 
			max-w-[20rem] p-4 rounded-none bg-white shadow-xl shadow-blue-gray-900/5"
		>
			<div className="mb-2 p-4">
				<Typography variant="h5" color="blue-gray">
					Kasir Q
				</Typography>
			</div>
			<List>
				<ListItem 
					className={`${colorTheme.menuHover} ${selector.menu==="dashboard" ? colorTheme.menuActive : ''} ${token?.level==="admin" || token?.level==="owner" 
						|| token?.level === "agent" || token?.level === "superadmin" ? `flex`: 'hidden'}`
					} 
					onClick={()=>handleOnClickMenu('dashboard')}>
					<ListItemPrefix>
						<HomeIcon className={`h-5 w-5 ${colorTheme.textHover} ${selector.menu==="dashboard" ? colorTheme.textActive : ''}`} />
					</ListItemPrefix>
					<label className={`${colorTheme.textHover} ${selector.menu==="dashboard" ? colorTheme.textActive : ''}`}>{t('homes')}</label>
				</ListItem>
				<Accordion
					open={open === 'masters'}
					icon={
						<ChevronDownIcon
						strokeWidth={2.5}
						className={`mx-auto h-4 w-4 transition-transform 
							${token?.level==="admin" || token?.level==="owner" || token?.level === "superadmin" ? 'flex':'hidden'}
							${open === 'masters' ? "rotate-180" : ""}`
						}
						/>
					}
				>
					<ListItem 
						className={`p-0 ${
						token?.level==="admin" || token?.level==="owner" || 
						token?.level === "superadmin" ? 'flex':'hidden'}
						${colorTheme.menuHover} ${selector.menu==="data-masters" ? colorTheme.menuActive : ''}`
						} selected={open === 'masters'}
					>
						<AccordionHeader onClick={() => handleOpen('masters')} className="border-b-0 p-3">
							<ListItemPrefix>
								<InboxIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Typography color="blue-gray" className={`mr-auto font-normal ${colorTheme.textHover} ${selector.menu==="data-masters" ? colorTheme.textActive : ''}`}>
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
										className={`${colorTheme.menuHover} ${selector.menu===value.path ? colorTheme.menuActive : ''}`
										} 
										key={Math.random()} 
										onClick={()=>handleOnClickMenu(value.path)}
									>
										<ListItemPrefix>
											<ChevronRightIcon className={`h-4 w-4 ${colorTheme.textHover} ${selector.menu===value.path ? colorTheme.textActive : ''}`} />
										</ListItemPrefix>
										<label className={`${colorTheme.textHover} ${selector.menu===value.path ? colorTheme.textActive : ''}`}>{t(value.label)}</label>
									</ListItem>
								))
							}
						</List>
					</AccordionBody>
				</Accordion>
				{
					token?.level==="admin" || token?.level === "superadmin" || token?.level === "agent" ? (
						<hr className="my-2 border-blue-gray-50" />
					) : ''
				}
				<Accordion
					open={open === 'sales'}
					icon={
						<ChevronDownIcon
						strokeWidth={2.5}
						className={`mx-auto h-4 w-4 transition-transform 
							${token?.level==="admin" || token?.level === "superadmin" || token?.level === "agent" ? 'flex':'hidden'}
							${open === 'sales' ? "rotate-180" : ""}`
						}
						/>
					}
				>
					<ListItem className={`p-0 ${token?.level==="admin" || token?.level === "superadmin" || token?.level==="agent" ? 'flex':'hidden'}`} selected={open === 'sales'}>
						<AccordionHeader onClick={() => handleOpen('sales')} className="border-b-0 p-3">
							<ListItemPrefix>
								<CurrencyDollarIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Typography color="blue-gray" className="mr-auto font-normal">
								{t('sales')}
							</Typography>
						</AccordionHeader>
					</ListItem>
					<AccordionBody className="py-1">
						<List className="p-0">
							{
								SalesMenu.map((value)=> (
									<React.Fragment key={value.path}>
									{
										value.access.includes(token?.level??'') ? <ListItem
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
									</ListItem> : ''
									}
									</React.Fragment>
								))
							}
						</List>
					</AccordionBody>
				</Accordion>
				{
					token?.level==="admin" || token?.level === "superadmin" || token?.level === "owner" ? (
						<hr className="my-2 border-blue-gray-50" />
					) : ''
				}
				<Accordion
					open={open === 'reports'}
					icon={
						<ChevronDownIcon
						strokeWidth={2.5}
						className={`mx-auto h-4 w-4 transition-transform 
							${token?.level==="admin" || token?.level==="owner" || token?.level === "superadmin" ? 'flex':'hidden'}
							${open === 'reports' ? "rotate-180" : ""}`
						}
						/>
					}
				>
					<ListItem 
						className={`p-0 ${
						token?.level==="admin" || token?.level==="owner" || 
						token?.level === "superadmin" ? 'flex':'hidden'}
						${colorTheme.menuHover} ${selector.menu==="reports" ? colorTheme.menuActive : ''}`
						} selected={open === 'reports'}
					>
						<AccordionHeader onClick={() => handleOpen('reports')} className="border-b-0 p-3">
							<ListItemPrefix>
								<DocumentChartBarIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Typography color="blue-gray" className={`mr-auto font-normal ${colorTheme.textHover} ${selector.menu==="reports" ? colorTheme.textActive : ''}`}>
								{t('reports')}
							</Typography>
						</AccordionHeader>
					</ListItem>
					<AccordionBody className="py-1">
						<List className="p-0">
							{
								ReportMenu.map((value)=> (
									<ListItem
										selected={
											selector.menu === value.path ? true : false
										}
										className={`${colorTheme.menuHover} ${selector.menu===value.path ? colorTheme.menuActive : ''}`
										} 
										key={Math.random()} 
										onClick={()=>handleOnClickMenu(value.path)}
									>
										<ListItemPrefix>
											<ChevronRightIcon className={`h-4 w-4 ${colorTheme.textHover} ${selector.menu===value.path ? colorTheme.textActive : ''}`} />
										</ListItemPrefix>
										<label className={`${colorTheme.textHover} ${selector.menu===value.path ? colorTheme.textActive : ''}`}>{t(value.label)}</label>
									</ListItem>
								))
							}
						</List>
					</AccordionBody>
				</Accordion>
				<hr className="my-2 border-blue-gray-50" />
				<Accordion
					open={open === 'settings'}
					icon={
						<ChevronDownIcon
						strokeWidth={2.5}
						className={`mx-auto h-4 w-4 transition-transform 
							${token?.level==="admin" || token?.level==="owner" || token?.level === "superadmin" ? 'flex':'hidden'}
							${open === 'settings' ? "rotate-180" : ""}`
						}
						/>
					}
				>
					<ListItem className={`p-0 ${token?.level==="admin" || token?.level==="owner" || token?.level === "superadmin" ? 'flex':'hidden'}`} selected={open === 'settings'}>
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
										className={`${colorTheme.menuHover} ${selector.menu===value.path ? colorTheme.menuActive : ''}`
										} 
										key={Math.random()} 
										onClick={()=>handleOnClickMenu(value.path)}
									>
										<ListItemPrefix>
											<ChevronRightIcon className={`h-4 b-0red-400 w-4 ${colorTheme.textHover} ${selector.menu===value.path ? colorTheme.textActive : ''}`} />
										</ListItemPrefix>
										<label className={`${colorTheme.textHover} ${selector.menu===value.path ? colorTheme.textActive : ''}`}>{t(value.label)}</label>
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