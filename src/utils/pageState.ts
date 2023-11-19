import { useState } from "react"
const usePage = () => {
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [limit, setLimit] = useState(20)

    const handlePage = (dataPage: number)=>{
        if(dataPage===-1 && page > 1){
            setPage(state=>state+dataPage)
        }
        if(dataPage===-2 && page<total){
            setPage(state=>state+1)
        }
        if(dataPage>0){
            setPage(dataPage)
        }
    }
    return{
        page,
        total,
        limit,
        setLimit,
        handlePage,
        setTotal
    }
}

export default usePage