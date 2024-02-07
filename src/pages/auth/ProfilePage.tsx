import {
    BiSolidMap,
    BiMobileAlt,
    BiSolidLabel,
    BiLogoGmail
} from "react-icons/bi";
import useProfile from "../../hooks/fetch/auth/useProfile";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
    const { t } = useTranslation();
    const {
        data,
        isLoading
    } = useProfile()
    return (
        <div className='w-full lg:grid lg:grid-cols-2'>
            {
                isLoading ? <>Loading</>:null
            }
            <div className='w-full grid grid-cols-1 gap-3 mb-4'>
                <label className='font-bold text-xl'>{data?.data.profile?.name}</label>
                <div className='flex items-center'>
                    <BiSolidMap className='mr-4' />
                    <label className='text-sm'>{data?.data.profile?.address}</label>
                </div>
                <div className='flex items-center'>
                    <BiSolidLabel className='mr-4' />
                    <label className='text-sm'>{data?.data.profile?.username}</label>
                </div>
                <div className='flex items-center'>
                    <BiMobileAlt className='mr-4' />
                    <label className='text-sm'>{data?.data.profile?.phone}</label>
                </div>
                <div className='flex items-center'>
                    <BiLogoGmail className='mr-4' />
                    <label className='text-sm'>{data?.data.profile?.email}</label>
                </div>
            </div>
            <div className="w-full">
                <label className='font-bold text-xl'>{t('skill')}</label>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                    {data?.data.profile?.tentorSkills && data?.data.profile?.tentorSkills?.length > 0 ? data?.data.profile?.tentorSkills.map((value)=> (
                        <span className="p-2 rounded-3xl bg-cyan-400 flex justify-center items-center">
                            <label className="text-white">{value.courses?.name}</label>
                        </span>
                    )) : null}
                    
                </div>
            </div>
        </div>
    )
}

export default ProfilePage