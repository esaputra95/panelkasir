import { useEffect, useState } from "react"
import { api } from "../services"
import { AxiosError } from "axios"

const useFetch = (url:string) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('');

    useEffect(()=> {
        getData(url)
    },[])

    const refectch = () => {
        getData(url)
    }
    
    const getData = async (url:string) => {
        try {
            setLoading(true)
            const data = await api.get(url)
            setData(data.data)
            setLoading(false)
        } catch (error) {
            setError(`${error as AxiosError}`)
        }
    }

    return {
        data,
        loading,
        error,
        refectch
    }
}

export default useFetch