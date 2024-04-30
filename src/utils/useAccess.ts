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
        'mosques',
        'dashboard',
        'banks',
        'mosques',
        'customers',
        'donation-categories',
        'donations',
        'article-categories',
        'articles',
        'users',
        'donation-reports'
    ]
}

const useAccess = () => {
    const [token, setToken] = useState<Token>()
    const [accessUser, setAccessUser] = useState<AccessUserTpe>({
        loading: false, 
        status: 1
    })
    const { pathNameOriginal } = useLocatioanName()
    
    useEffect(()=>{
        parseToken()
    },[])

    const parseToken = () => {
        const token_ = window.localStorage.getItem('token')??'';
        if(token_){
            const newToken = jwtDecode<Token>(token_);
            if(access['admin']?.includes(pathNameOriginal)){
                setAccessUser({loading: false, status: 1})
            } else{
                setAccessUser({loading: false, status: -1})
            }
            setToken(newToken);
        }else{
            setAccessUser({loading: false, status: -1})
        }
        
        
        // setToken({
        //     id:'1',
        //     name: 'Admin',
        //     username: 'Admin',
        //     userType: 'admin'
        // })
    }

    return {
        token,
        accessUser
    }
}

export default useAccess