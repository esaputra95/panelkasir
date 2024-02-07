import { useQuery } from "@tanstack/react-query"
import { getData } from "../../models/auth/profileModel"
import url from "../../../services/url"
import { ApiResponseProfile } from "../../../interfaces/profileInterface";

const useProfile = () => {
    const {profiles} = url;
    const { data, isLoading } = useQuery<ApiResponseProfile>({
        queryKey: ['get-profile'],
        queryFn: ()=> getData(profiles)
    })

    return {
        data,
        isLoading
    }
}

export default useProfile