import {  useMutation } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { LoginInterface } from "../../../interfaces/loginInterface"
import { loginModel } from "../../models/auth/loginModel"
import { useNavigate } from "react-router-dom"

export const useLogin = () => {
    const navigate = useNavigate()
    const { auth } = url
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<LoginInterface>({
        resolver: yupResolver(
            yup.object({
                username: yup.string().required(),
                password: yup.string().required()
            })
        )
    })

    const { mutate } = useMutation({
        mutationFn: async ( data:LoginInterface ) => await loginModel(auth.login, data),
        onSuccess: (data)=> {
            if(data.status){
                window.localStorage.setItem('token', data.data.token)
                navigate('/dashboard')
            }
            setError('password', {
                type: 'validate',
                message: 'Password tidak valid'
            })
            setError('username', {
                message: 'Username tidak valid'
            })
        }
    })

    const onSubmit: SubmitHandler<LoginInterface> = (data) => {
        mutate(data)
    }


    return {
        onSubmit,
        errors,
        register,
        handleSubmit
    }
}