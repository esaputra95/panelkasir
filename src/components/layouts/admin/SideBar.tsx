
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
    PowerIcon,
	HomeIcon,
	CalendarDaysIcon,
	DocumentTextIcon,
	ListBulletIcon
  } from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTranslation } from 'react-i18next';
import {
	MasterMenu,
	RecordMateri,
	ReportMaster,
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

    const [open, setOpen] = useState(0);
 
	const handleOpen = (value:number) => {
		setOpen(open === value ? 0 : value);
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
					open={open === 1}
					icon={
						<ChevronDownIcon
						strokeWidth={2.5}
						className={`mx-auto h-4 w-4 transition-transform 
							${token?.userType==="admin" ? 'flex':'hidden'}
							${open === 1 ? "rotate-180" : ""}`
						}
						/>
					}
				>
					<ListItem className={`p-0 ${token?.userType==="admin" ? 'flex':'hidden'}`} selected={open === 1}>
						<AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
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
				<ListItem 
					selected={ selector.menu==="registrations" ?  true : false } 
					onClick={()=> handleOnClickMenu('registrations') }
					className={`${token?.userType==="admin" ? 'flex':'hidden'}`}
				>
					<ListItemPrefix>
						<ListBulletIcon className="h-5 w-5" />
					</ListItemPrefix>
					{t("registration")}
				</ListItem>
				<Accordion
					open={open === 2}
					icon={
						<ChevronDownIcon
							strokeWidth={2.5}
							className={`mx-auto h-4 w-4 transition-transform 
								${open === 2 ? "rotate-180" : ""}`
							}
						/>
					}
				>
					<ListItem className="p-0" selected={open === 2}>
						<AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
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
					open={open === 3}
					icon={
						<ChevronDownIcon
							strokeWidth={2.5}
							className={`mx-auto h-4 w-4 transition-transform 
								${open === 3 ? "rotate-180" : ""}`
							}
						/>
					}
				>
					<ListItem className="p-0" selected={open === 3}>
						<AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
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
					open={open === 3}
					icon={
						<ChevronDownIcon
						strokeWidth={2.5}
						className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
						/>
					}
				>
					<ListItem className="p-0" selected={open === 3}>
						<AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
							<ListItemPrefix>
								<DocumentTextIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Typography color="blue-gray" className="mr-auto font-normal">
								{t('master-reports')}
							</Typography>
						</AccordionHeader>
					</ListItem>
					<AccordionBody className="py-1">
						<List className="p-0">
							{
								ReportMaster.map((value)=> (
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
					open={open === 4}
					icon={
						<ChevronDownIcon
						strokeWidth={2.5}
						className={`mx-auto h-4 w-4 transition-transform 
							${open === 1 ? "rotate-180" : ""}`
						}
						/>
					}
				>
					<ListItem className="p-0" selected={open === 4}>
						<AccordionHeader onClick={() => handleOpen(4)} className="border-b-0 p-3">
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
				<ListItem>
					<ListItemPrefix>
						<PowerIcon className="h-5 w-5" />
					</ListItemPrefix>
					Log Out
				</ListItem>
			</List>
		</Card>
    )
}

export default SideBarLayout