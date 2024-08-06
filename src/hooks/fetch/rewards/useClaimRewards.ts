import {  useMutation, useQuery } from "@tanstack/react-query";
import {
    deleteData,
    getData,
    getDataById,
    getDataSelect,
    checkPoint,
    postData,
    getClaimReward,
} from "../../models/rewards/ClaimRewardsModel";
import { useEffect, useState } from "react";
import {
    ApiResponseClaimRewards,
    ApiResponseUpdateClaimRewards,
    ClaimRewardDetailsInterface,
    ClaimRewardsInterface
} from "../../../interfaces/rewards/ClaimRewardsInterface";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import url from "../../../services/url";
import { AxiosError } from "axios";
import { ModalFormState } from "../../../utils/modalFormState";
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";
import { modalConfirmState } from "../../../utils/modalConfirmState";
import usePage from "../../../utils/pageState";
import { DataMessageError } from "../../../interfaces/apiInfoInterface";
import { handleMessageErrors } from "../../../services/handleErrorMessage";
import { OptionSelectInterface } from "../../../interfaces/globalInterface";
import { yupResolver } from "@hookform/resolvers/yup";
import ClaimRewardsSchema from "../../../schema/rewards/claimRewardsSchema";
import exportToPdf from "../../../utils/toPdf";

export const useClaimRewards = () => {
    const [loading, setLoading] = useState(false)
    const [ query, setQuery ] = useState({name: ''})
    const [ idDetail, setIdDetail ] = useState<number|null>()
    const [ dataOptionClaimRewards, setDataOptionClaimRewards] = useState<OptionSelectInterface[]>([{value:'', label:''}])
    const { ClaimRewards } = url
    const { modalForm, setModalForm } = ModalFormState()
    const { t } = useTranslation();
    const modalConfirm = modalConfirmState()
    const page = usePage();
    
    useEffect(()=> {
        setModalForm((state)=>({
            ...state,
            label: 'Form '
        }))
    }, [])

    const {
        reset,
        register,
        handleSubmit,
        control,
        setValue,
        getValues,
        watch,
        formState: { errors },
    } = useForm<ClaimRewardsInterface>({
        resolver: yupResolver(ClaimRewardsSchema().schema)
    });

    const {
        fields
    } = useFieldArray({
        name: 'claimRewardDetails',
        control
    })

    const {
        register:registerFilter,
        handleSubmit:handleSubmitFilter,
    } = useForm<ClaimRewardsInterface>()

    useEffect(()=> {
        refetch()
    }, [page.page])
    
    const {data:dataClaimRewards, isFetching, refetch} = useQuery<ApiResponseClaimRewards, AxiosError>({ 
        queryKey: ['get-ClaimRewards', query], 
        networkMode: 'always',
        queryFn: async () => await getData(ClaimRewards.get, 
            {
                ...query, 
                page:page.page,
                limit: page.limit
            }
        ),
        onSuccess(data) {
            page.setTotal(Math.ceil((data?.data?.info?.total  ?? 1)/
            (data?.data?.info?.limit ?? page.limit)));
        },
        onError: (errors) => {
            toast.error(errors.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const optionClaimRewards = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(ClaimRewards.getSelect, {name: data});
        if(response.status){
            setDataOptionClaimRewards(response.data.agentType);
            return response.data.agentType
        }
        return [{value:'', label:''}]
    }

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:number) => getDataById(ClaimRewards.getById, id),
        onSuccess:(data:ApiResponseUpdateClaimRewards)=>{
            if(data.status){
                const value = data.data.ClaimRewards
                reset({
                    id: value.id,
                    date: value.date,
                });
                setModalForm((state)=>({
                    ...state,
                    visible: true
                }))
            }
        },
        onError:(error:AxiosError)=> {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const { mutate } = useMutation({
        mutationFn: async (data:ClaimRewardsInterface)=> {
            return await postData(ClaimRewards.post, data)
        },
        onSuccess: () => {
            setModalForm((state)=>({
                ...state,
                visible: false
            }))
            setLoading(false);
            refetch()
            reset()
            toast.success(t("success-save"), {
                position: toast.POSITION.TOP_CENTER
            });
            
        },
        onError: async (errors) => {
            const err = errors as AxiosError<DataMessageError>
            let message = `${errors}`
            if(err.response?.status === 400){
                message = await handleMessageErrors(err.response?.data?.errors)
            }
            modalConfirm.setModalConfirm({
                ...modalConfirm.modalConfirm,
                loading: false,
                visible: false
            })
            setLoading(false)
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const {mutate:mutateDelete} = useMutation({
        mutationFn: (id:number) => deleteData(ClaimRewards.delete, id),
        onSuccess: () => {
            modalConfirm.setModalConfirm({
                ...modalConfirm.modalConfirm,
                loading: false,
                visible: false
            })
            refetch()
            toast.success(t("success-delete"), {
                position: toast.POSITION.TOP_CENTER
            });
        },
        onError: async (errors) => {
            const err = errors as AxiosError<DataMessageError>
            let message = `${errors}`
            if(err.response?.status === 400){
                message = await handleMessageErrors(err.response?.data?.errors)
            }
            modalConfirm.setModalConfirm({
                ...modalConfirm.modalConfirm,
                loading: false,
                visible: false
            })
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const onSubmit: SubmitHandler<ClaimRewardsInterface> = async (data) => {
        console.log({data});
        
        mutate({
            ...data,
        })
    }

    const onDelete = (id: number) => {
        modalConfirm.setModalConfirm((state)=>({
            ...state,
            title: state.title,
            message: state.message,
            confirmLabel: state.confirmLabel,
            cancelLabel: state.cancelLabel,
            type:'danger',
            visible: true,
            onConfirm:()=>{
                modalConfirm.setModalConfirm((state)=>({
                    ...state,
                    loading: true
                }))
                mutateDelete(id)
            },
            onCancel:()=>{
                modalConfirm.setModalConfirm((state)=>({
                    ...state,
                    visible: false,
                }))
            }
        }))
    }

    const onUpdate = (id:number) => {
        mutateById(id)
    }

    const onCancel = () => {
        setModalForm((state)=>({
            ...state,
            visible: false
        }))
        reset()
        setIdDetail(null)
    }

    const onDetail = async (id:number) => {
        setIdDetail(id)
        mutateById(id)
    }

    const onFilter: SubmitHandler<ClaimRewardsInterface> = (data) => {
        setQuery((state)=>({
            ...state,
            name: data.date
        }));
    }

    const checkTotalPoint = async () => {
        try {
            const data = await checkPoint(ClaimRewards.checkPoint);
            console.log({data});
            
            let newValue:ClaimRewardDetailsInterface[]=[]
            for (const value of data) {
                newValue=[
                    ...newValue,
                    {
                        name: value?.users?.name ?? '',
                        userId: value?.users?.id,
                        point: Number(value.quantity),
                        rewardId: value?.rewardId,
                        rewardName: value.reward
                    }
                ]
            }
            setValue('claimRewardDetails', newValue);
        } catch (error) {
            // setValue('startDate', undefined)   
        }
    }

    const downloadClaimReward = async (id:number) => {
        const data = await getClaimReward(ClaimRewards.download, id);
        exportToPdf(data.rewards, 'headerClaimReward', data.header);
    }

    return {
        dataClaimRewards,
        isFetching,
        setQuery,
        onSubmit,
        loading,
        errors,
        reset,
        register,
        handleSubmit,
        modalForm, 
        setModalForm,
        onDelete,
        modalConfirm,
        onUpdate,
        onCancel,
        onDetail,
        idDetail,
        page: page,
        control,
        optionClaimRewards,
        dataOptionClaimRewards,
        onFilter,
        registerFilter,
        handleSubmitFilter,
        setValue,
        getValues,
        watch,
        checkTotalPoint,
        fields,
        downloadClaimReward
    }
}