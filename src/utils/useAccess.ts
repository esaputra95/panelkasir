import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";
import useLocatioanName from "./location";
type Token = {
    id: string;
    username: string;
    name: string;
    userType: 'admin' | 'agent' | "superadmin"
}

type AccessUserTpe = {
    loading: boolean,
    status: number
}

const access = {
    admin: [
        '',
        'rewards',
        'agen-types',
        'users',
        'product-categories',
        'products',
        'warehouses',
        'sales',
        'sales-report',
        'settings',
        'points-report',
        'user-points-report',
        'claim-points',
        'claim-points-report',
        'claim-rewards',
        'claim-rewards-report',
        'bank-accounts',
        'bank-accounts-report',
        'dashboard',
        'sale-stockists',
        'members'
    ],
    agent: [
        '',
        'sales',
        'sales-report'
    ],
    superadmin:[
        '',
        'rewards',
        'agen-types',
        'users',
        'product-categories',
        'products',
        'warehouses',
        'sales',
        'sales-report',
        'settings',
        'points-report',
        'user-points-report',
        'claim-points',
        'claim-points-report',
        'claim-rewards',
        'claim-rewards-report',
        'bank-accounts',
        'bank-accounts-report',
        'dashboard',
        'sale-stockists',
        'members'
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
            if(access[newToken.userType]?.includes(pathNameOriginal.split('/')[0]) || newToken.userType === "superadmin"){
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