import {  useQuery } from "@tanstack/react-query"
import { getUser } from "../models/userModel"
import { useState } from "react"
import { UserInterfaceForm, UserSearchType } from "../../interfaces/userInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { userSchema } from "../../schema/masters"

export const useUser = () => {
    const [ page, setPage ] = useState(1)
    const [ query, setQuery ] = useState<UserSearchType>()
    const { users } = url
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserInterfaceForm>({
        resolver: yupResolver(userSchema)
    })
    
    const {data, isLoading} = useQuery({ 
        queryKey: ['users'], 
        queryFn: async () => await getUser(users, 
            {
                ...query, page:page
            }
        )
    })
    const onSubmit: SubmitHandler<UserInterfaceForm> = (data) => {
        console.log({data});
    }


    return {
        data,
        isLoading,
        setQuery,
        setPage,
        onSubmit,
        errors,
        register,
        handleSubmit
    }
}