import { useQuery } from "@tanstack/react-query"
import { getData } from "../../models/auth/profileModel"
import url from "../../../services/url"

const useProfile = () => {
    const {User} = url;
    const { data, isLoading } = useQuery({
        queryKey: ['get-profile'],
        queryFn: async ()=> {
            const response = await getData(User.get)
            return response?.data?.user[0]
        }
    })

    return {
        data,
        isLoading
    }
}

export default useProfile