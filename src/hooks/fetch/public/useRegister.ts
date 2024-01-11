import { SubmitHandler, useForm } from "react-hook-form"
import { ApiResponseRegister, RegisterInterface } from "../../../interfaces/public/registerInterface"
import RegisterSchema from "../../../schema/publics/registerSchema"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getData, postData } from "../../models/public/registerModel"
import url from "../../../services/url"
import { AxiosError } from "axios"
import usePage from "../../../utils/pageState"
import { toast } from "react-toastify"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { t } from "i18next"
import { useNavigate } from "react-router-dom"
import { ChangeEvent } from "react"

const useRegister = () => {
    const { Register } = url;
    const page = usePage();
    const navigate = useNavigate()
    const {
        reset,
        register,
        handleSubmit,
        control,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<RegisterInterface>({
        resolver: yupResolver(RegisterSchema().schema)
    });
    
    const {data:dataClassMaster, isFetching, refetch} = useQuery<ApiResponseRegister, AxiosError>({ 
        queryKey: ['register'], 
        networkMode: 'always',
        queryFn: async () => await getData(Register.get, 
            {
                page:page.page,
                limit: page.limit
            }
        ),
        onSuccess(data) {
            page.setTotal(Math.ceil((data?.data?.info?.total  ?? 1)/(data?.data?.info?.limit ?? page.limit)));
        },
        onError: (errors) => {
            toast.error(errors.message, {
                position: toast.POSITION .TOP_CENTER
            });
        }
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:RegisterInterface)=> postData(Register.post, data),
        onSuccess: () => {
            refetch()
            reset()
            toast.success(t("success-save"), {
                position: toast.POSITION.TOP_CENTER
            });
            navigate('/message')
            
        },
        onError: async (errors) => {
            const err = errors as AxiosError<DataMessageError>
            let message = `${errors}`
            if(err.response?.status === 400){
                message = await handleMessageErrors(err.response?.data?.errors)
            }
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const onSubmit: SubmitHandler<RegisterInterface> = (data) => {
        mutate({
            ...data
        })
    }

    const handleOnChange = (event:ChangeEvent<HTMLInputElement>) => {
        const image = event.target.files?.[0] ?? ''
        setValue('imageUpload', event.target.files)
        setValue('image', URL.createObjectURL(image as Blob))
    }

    return {
        register,
        errors,
        handleSubmit,
        control,
        onSubmit,
        isLoadingMutate,
        isFetching,
        dataClassMaster,
        handleOnChange,
        getValues,
    }
}

export default useRegister