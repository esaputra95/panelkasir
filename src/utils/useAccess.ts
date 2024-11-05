import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";
import useLocatioanName from "./location";
import { useCookies } from "react-cookie";
export type Token = {
    id: string;
    username: string;
    name: string;
    level: 'admin' | 'agent' | "superadmin" | "owner"
}

type AccessUserTpe = {
    loading: boolean,
    status: number
}

const access = {
    owner: [
        '',
        '/',
        'rewards',
        'agen-types',
        'masters/users',
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
        '/masters/members',
        '/masters/product-categories',
        '/masters/products',
        "/settings/users",
        '/settings/stores',
        '/reports/sales-report',
        '/reports/purchases-report',
        '/reports/margins-report',
        '/dashboard',
        '/profile'
    ],
    admin: [
        '',
        '/',
        'rewards',
        'agen-types',
        'masters/users',
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
        '/masters/members'
    ],
    agent: [
        '',
        'sales',
        'sales-report'
    ],
    superadmin:[
        '/',
        '',
        '/masters/members',
        'users',
        '/masters/product-categories',
        '/masters/products',
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
    ]
}

const useAccess = () => {
    const [tokenCookie] = useCookies(['token']);
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
        const token_ = tokenCookie.token;
        if(token_){
            const newToken = jwtDecode<Token>(token_);
            
            if(access[newToken.level]?.includes(pathNameOriginal)){
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