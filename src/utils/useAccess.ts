import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";
type Token = {
    id: string;
    username: string;
    name: string;
    userType: string
}
const useAccess = () => {
    const [token, setToken] = useState<Token>()
    
    useEffect(()=>{
        parseToken()
    },[])

    const parseToken = () => {
        const token_ = window.localStorage.getItem('token')??'';
        const newToken = jwtDecode<Token>(token_);
        setToken(newToken);
        
    }

    return {
        token
    }
}

export default useAccess