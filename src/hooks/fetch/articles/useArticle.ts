import {
    useMutation,
    useQuery
} from "@tanstack/react-query"
import { 
    deleteData,
    getData,
    getDataById,
    getDataSelect,
    postData,
    uploadImage
} from "../../models/articles/ArticleModel"
import {
    ChangeEvent,
    useEffect,
    useState
} from "react"
import { 
    ApiResponseArticle,
    ArticleInterface
} from "../../../interfaces/articles/ArticleInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { ArticleSchema } from "../../../schema/articles"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import usePage from "../../../utils/pageState"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { OptionSelectInterface } from "../../../interfaces/globalInterface"
import { ArticleDummy } from "../../../utils/dummy/article"

export const useArticle = () => {
    const [ query, setQuery ] = useState({title: ''})
    const [ image, setImage ] = useState<string|undefined>(undefined)
    const [ imageUpload, setImageUpload ] = useState<Blob|undefined>(undefined)
    const [ idDetail, setIdDetail ] = useState<number|null>()
    const [ dataOptionArticle, setDataOptionArticle] = useState<OptionSelectInterface[]>([{value:'', label:''}])
    const { Article } = url
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
        formState: { errors },
    } = useForm<ArticleInterface>({
        resolver: yupResolver(ArticleSchema().schema)
    });

    const {
        register:registerFilter,
        handleSubmit:handleSubmitFilter,
    } = useForm<ArticleInterface>()

    useEffect(()=> {
        refetch()
    }, [page.page])
    
    const {data:dataArticle, isFetching, refetch} = useQuery<ApiResponseArticle, AxiosError>({ 
        queryKey: ['class-master', query], 
        networkMode: 'always',
        queryFn: async () => await getData(Article.get, 
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

    const optionArticle = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(Article.getSelect, {name: data});
        if(response.status){
            setDataOptionArticle(response.data.class);
            return response.data.class
        }
        return [{value:'', label:''}]
    }

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:number) => getDataById(Article.getById, id),
        onSuccess:(data:ArticleInterface)=>{
            const resetData:ArticleInterface = {
                id: data.id,
                category_id: data.category_id,
                type: data.type,
                title: data.title,
                content: data.content,
                status: data.status,
                categorySelect: {
                    value: data.category_id, label: data.category?.name??''
                }
            }
            reset(resetData)
            setModalForm((state)=>({
                ...state,
                visible: true
            }))
        },
        onError:(error:AxiosError)=> {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:ArticleInterface)=> postData(Article.post, data),
        onSuccess: () => {
            setModalForm((state)=>({
                ...state,
                visible: false
            }))
            refetch()
            setImage('')
            reset(ArticleDummy)
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
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const {mutate:mutateDelete} = useMutation({
        mutationFn: (id:number) => deleteData(Article.delete, id),
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

    const onSubmit: SubmitHandler<ArticleInterface> = async (data) => {
        const upload = await uploadImage(Article.image, imageUpload);
        mutate({
            ...data,
            image: upload
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
        reset(ArticleDummy)
        setIdDetail(null)
    }

    const onDetail = async (id:number) => {
        setIdDetail(id)
        mutateById(id)
    }

    const onFilter: SubmitHandler<ArticleInterface> = (data) => {
        setQuery((state)=>({
            ...state,
            title: data.title
        }));
    }

    const handleOnChange = (key: 'category_id', key2: 'categorySelect', value?:OptionSelectInterface ) => {
        setValue(key, parseInt(value?.value+''))
        setValue(key2, value);
    }

    const handleOnChangeImage = (e:ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageUpload(file)
            setImage(URL.createObjectURL(file));
        }
    }

    return {
        dataArticle,
        isFetching,
        setQuery,
        onSubmit,
        isLoadingMutate,
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
        optionArticle,
        dataOptionArticle,
        onFilter,
        registerFilter,
        handleSubmitFilter,
        setValue,
        getValues,
        handleOnChange,
        handleOnChangeImage,
        image,
        setImage
    }
}