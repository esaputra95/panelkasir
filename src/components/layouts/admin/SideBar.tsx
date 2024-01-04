
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
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
	HomeIcon,
	CalendarDaysIcon,
	DocumentTextIcon,
	ListBulletIcon
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTranslation } from 'react-i18next';
import {
	MasterMenu,
	Payroll,
	RecordMateri,
	Register,
	ReportPayroll,
	ScheduleMenu,
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
					ESP BIMBEL
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
					open={open === 'registration'}
					icon={
						<ChevronDownIcon
							strokeWidth={2.5}
							className={`mx-auto h-4 w-4 transition-transform 
								${open === 'registration' ? "rotate-180" : ""}`
							}
						/>
					}
				>
					<ListItem className="p-0" selected={open === 'registration'}>
						<AccordionHeader onClick={() => handleOpen('registration')} className="border-b-0 p-3">
							<ListItemPrefix>
								<ListBulletIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Typography color="blue-gray" className="mr-auto font-normal">
								{t("registrations")}
							</Typography>
						</AccordionHeader>
					</ListItem>
					<AccordionBody className="py-1">
						<List className="p-0">
						{
								Register.map((value)=> (
									<ListItem 
										selected={
											selector.menu === value.path ? true : false
										}
										className={`${value.access.includes(token?.userType??'') ? 'flex': 'hidden'}`}
										key={Math.random()}
										onClick={()=>handleOnClickMenu(value.path)}>
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
					open={open === 'schedule'}
					icon={
						<ChevronDownIcon
							strokeWidth={2.5}
							className={`mx-auto h-4 w-4 transition-transform 
								${open === 'schedule' ? "rotate-180" : ""}`
							}
						/>
					}
				>
					<ListItem className="p-0" selected={open === 'schedule'}>
						<AccordionHeader onClick={() => handleOpen('schedule')} className="border-b-0 p-3">
							<ListItemPrefix>
								<CalendarDaysIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Typography color="blue-gray" className="mr-auto font-normal">
								{t("schedules")}
							</Typography>
						</AccordionHeader>
					</ListItem>
					<AccordionBody className="py-1">
						<List className="p-0">
						{
								ScheduleMenu.map((value)=> (
									<ListItem 
										selected={
											selector.menu === value.path ? true : false
										}
										className={`${value.access.includes(token?.userType??'') ? 'flex': 'hidden'}`}
										key={Math.random()}
										onClick={()=>handleOnClickMenu(value.path)}>
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
					open={open === 'record-materi'}
					icon={
						<ChevronDownIcon
							strokeWidth={2.5}
							className={`mx-auto h-4 w-4 transition-transform 
								${open === 'record-materi' ? "rotate-180" : ""}`
							}
						/>
					}
				>
					<ListItem className="p-0" selected={open === 'record-materi'}>
						<AccordionHeader onClick={() => handleOpen('record-materi')} className="border-b-0 p-3">
							<ListItemPrefix>
								<CalendarDaysIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Typography color="blue-gray" className="mr-auto font-normal">
								{t("record-materi")}
							</Typography>
						</AccordionHeader>
					</ListItem>
					<AccordionBody className="py-1">
						<List className="p-0">
						{
								RecordMateri.map((value)=> (
									<ListItem 
										selected={
											selector.menu === value.path ? true : false
										}
										className={`${value.access.includes(token?.userType??'') ? 'flex': 'hidden'}`}
										key={Math.random()}
										onClick={()=>handleOnClickMenu(value.path)}>
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
				<hr className="my-2 border-blue-gray-50" />
				<Accordion
					open={open === 'payroll'}
					icon={
						<ChevronDownIcon
							strokeWidth={2.5}
							className={`mx-auto h-4 w-4 transition-transform 
								${open === 'payroll' ? "rotate-180" : ""}`
							}
						/>
					}
				>
					<ListItem className="p-0" selected={open === 'payroll'}>
						<AccordionHeader onClick={() => handleOpen('payroll')} className="border-b-0 p-3">
							<ListItemPrefix>
								<CalendarDaysIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Typography color="blue-gray" className="mr-auto font-normal">
								{t("payroll")}
							</Typography>
						</AccordionHeader>
					</ListItem>
					<AccordionBody className="py-1">
						<List className="p-0">
						{
								Payroll.map((value)=> (
									<ListItem 
										selected={
											selector.menu === value.path ? true : false
										}
										className={`${value.access.includes(token?.userType??'') ? 'flex': 'hidden'}`}
										key={Math.random()}
										onClick={()=>handleOnClickMenu(value.path)}>
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
				<hr className="my-2 border-blue-gray-50" />
				<Accordion
					open={open === 'master-reports'}
					icon={
						<ChevronDownIcon
						strokeWidth={2.5}
						className={`mx-auto h-4 w-4 transition-transform ${open === 'master-reports'? "rotate-180" : ""}`}
						/>
					}
				>
					<ListItem className="p-0" selected={open === 'master-reports'}>
						<AccordionHeader onClick={() => handleOpen('master-reports')} className="border-b-0 p-3">
							<ListItemPrefix>
								<DocumentTextIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Typography color="blue-gray" className="mr-auto font-normal">
								{t('report')}
							</Typography>
						</AccordionHeader>
					</ListItem>
					<AccordionBody className="py-1">
						<List className="p-0">
							{
								ReportPayroll.map((value)=> (
									<ListItem 
										selected={selector.menu === value.path ? true : false} 
										key={Math.random()} onClick={()=>handleOnClickMenu(value.path)}
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
				<ListItem>
					<ListItemPrefix>
						<UserCircleIcon className="h-5 w-5" />
					</ListItemPrefix>
					Profile
				</ListItem>
				<hr className="my-2 border-blue-gray-50" />
				<Accordion
					open={open === 'settings'}
					icon={
						<ChevronDownIcon
						strokeWidth={2.5}
						className={`mx-auto h-4 w-4 transition-transform 
							${open === 'settings' ? "rotate-180" : ""}`
						}
						/>
					}
				>
					<ListItem className="p-0" selected={open === 'settings'}>
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
										selected={selector.menu === value.path ? true : false}
										key={Math.random()} 
										onClick={()=>handleOnClickMenu(value.path)}
									>
										<ListItemPrefix>
											<ChevronRightIcon strokeWidth={4} className="h-3 w-5" />
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