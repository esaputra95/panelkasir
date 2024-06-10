import { useQuery } from "@tanstack/react-query"
import { getData } from "../../models/auth/profileModel"
import url from "../../../services/url"

const useProfile = () => {
    const {User} = url;
    const { data, isLoading } = useQuery({
        queryKey: ['get-profile'],
        queryFn: ()=> getData(User.get)
    })

    return {
        data,
        isLoading
    }
}

export default useProfile