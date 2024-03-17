import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";
import useLocatioanName from "./location";
type Token = {
    id: string;
    username: string;
    name: string;
    userType: 'admin' | 'tentor'
}

type AccessUserTpe = {
    loading: boolean,
    status: number
}

const access = {
    admin: [
        '',
        'dashboard',
        'tutors',
        'class-types',
        'class',
        'rooms',
        'universities',
        'majors',
        'courses',
        'students',
        'registrations',
        'tentor-not-available',
        'study-groups',
        'class-information',
        'record-materi',
        'payroll',
        'payroll-reports', 
        'record-materi-reports',
        'student-reports',
        'schedule-reports',
        'register-reports',
        'guidance-types',
        'guidance-packages',
        'school-years',
        'sessions',
        'companies',
        'profile'
    ],
    tentor: [
        '',
        'class-information',
        'record-materi',
        'payroll',
        'tentor-not-available',
        'dashboard',
        'profile'
    ]
}
const useAccess = () => {
    const [token, setToken] = useState<Token>()
    const [accessUser, setAccessUser] = useState<AccessUserTpe>({
        loading: false, 
        status: 0
    })
    const { pathNameOriginal } = useLocatioanName()
    
    useEffect(()=>{
        parseToken()
    },[])

    const parseToken = () => {
        const token_ = window.localStorage.getItem('token')??'';
        const newToken = jwtDecode<Token>(token_);
        if(access[newToken.userType]?.includes(pathNameOriginal)){
            setAccessUser({loading: false, status: 1})
        } else{
            setAccessUser({loading: false, status: -1})
        }
        setToken(newToken);
        
    }

    return {
        token,
        accessUser
    }
}

export default useAccess