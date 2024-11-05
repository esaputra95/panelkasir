import {  useMutation } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { LoginInterface } from "../../../interfaces/loginInterface"
import { loginModel } from "../../models/auth/loginModel"
import { useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie';
import { jwtDecode } from "jwt-decode"
import { Token } from "../../../utils/useAccess"
import { useDispatch } from "react-redux"
import { setUserSlice } from "../../../redux/userSlice"

export const useLogin = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_cookies, setCookie] = useCookies(['token']);
    const dispatch = useDispatch()
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
                email: yup.string().required(),
                password: yup.string().required()
            })
        )
    })

    const { mutate } = useMutation({
        mutationFn: async ( data:LoginInterface ) => await loginModel(auth.login, data),
        onSuccess: (data)=> {
            if(data){
                const token = jwtDecode<Token>(data.token);
                dispatch(setUserSlice({
                    ...token
                }))
                setCookie('token',data.token, {
                    path: '/'
                })
                navigate('/')
            }
        },
        onError:()=> {
            setError('password', {
                type: 'validate',
                message: 'Password tidak valid'
            })
            setError('email', {
                message: 'email tidak valid'
            })
        }
    })

    const onSubmit: SubmitHandler<LoginInterface> = (data) => {
        mutate(data)
    }

    const onForgotPassword = () => {
        console.log('ayam');
        
    }

    return {
        onSubmit,
        errors,
        register,
        handleSubmit,
        onForgotPassword
    }
}