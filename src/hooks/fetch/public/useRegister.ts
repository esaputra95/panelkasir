import { SubmitHandler, useForm } from "react-hook-form"
import { ApiResponseRegister, QueryStudentInterface, RegisterInterface } from "../../../interfaces/public/registerInterface"
import RegisterSchema from "../../../schema/publics/registerSchema"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getData, postData } from "../../models/public/registerModel"
import url from "../../../services/url"
import { modalFormState } from "../../../utils/modalFormState"
import { AxiosError } from "axios"
import { useState } from "react"
import usePage from "../../../utils/pageState"
import { toast } from "react-toastify"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { t } from "i18next"
import { useNavigate, useSearchParams } from "react-router-dom"

const useRegister = () => {
    const [ query, setQuery ] = useState<QueryStudentInterface>()
    const { Register } = url;
    const { modalForm, setModalForm } = modalFormState()
    const page = usePage();
    const navigate = useNavigate()
    const {
        reset,
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<RegisterInterface>({
        resolver: yupResolver(RegisterSchema().schema)
    });
    
    const {data:dataClassMaster, isFetching, refetch} = useQuery<ApiResponseRegister, AxiosError>({ 
        queryKey: ['class-master'], 
        networkMode: 'always',
        queryFn: async () => await getData(Register.get, 
            {
                ...query, 
                page:page.page,
                limit: page.limit
            }
        ),
        onSuccess(data) {
            page.setTotal(Math.ceil((data?.data?.info?.total  ?? 1)/(data?.data?.info?.limit ?? page.limit)));
        },
        onError: (errors) => {
            toast.error(errors.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:RegisterInterface)=> postData(Register.post, data),
        onSuccess: () => {
            setModalForm((state)=>({
                ...state,
                visible: false
            }))
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
        console.log({data});
        
        mutate({
            ...data
        })
        
    }

    return {
        register,
        errors,
        handleSubmit,
        control,
        onSubmit,
        isLoadingMutate,
        isFetching,
        dataClassMaster
    }
}

export default useRegister