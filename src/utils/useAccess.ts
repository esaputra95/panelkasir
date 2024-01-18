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
    status: boolean
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
        'companies'
    ],
    tentor: [
        '',
        'class-information',
        'record-materi',
        'payroll',
        'tentor-not-available',
        'dashboard',
    ]
}
const useAccess = () => {
    const [token, setToken] = useState<Token>()
    const [accessUser, setAccessUser] = useState<AccessUserTpe>({
        loading: false, 
        status: false
    })
    const { pathNameOriginal } = useLocatioanName()
    
    useEffect(()=>{
        parseToken()
    },[])

    const parseToken = () => {
        const token_ = window.localStorage.getItem('token')??'';
        const newToken = jwtDecode<Token>(token_);
        console.log('user', newToken.userType);
        console.log('path', pathNameOriginal);
        
        if(access[newToken.userType].includes(pathNameOriginal)){
            console.log('ya');
            
            setAccessUser({loading: false, status: true})
        } else{
            setAccessUser({loading: false, status: false})
        }
        setToken(newToken);
        
    }

    return {
        token,
        accessUser
    }
}

export default useAccess