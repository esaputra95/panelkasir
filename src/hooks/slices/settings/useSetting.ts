import {
    useMutation,
    useQuery
} from "@tanstack/react-query"
import {
    getData,
    updateData,
    upload
} from "../../models/settings/settingModel"
import {
    ChangeEvent,
    useEffect,
    useState
} from "react"
import {
    ApiResponseSetting,
    FormSetting
} from "../../../interfaces/settings/settingInterface"
// import url from "../../../services/url"
import { AxiosError } from "axios"
import { ModalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import usePage from "../../../utils/pageState"
import {
    SubmitHandler,
    useFieldArray,
    useForm
} from "react-hook-form"
import { t } from "i18next"

export const useSetting = () => {
    const [ label, setLabel ] = useState<string[]>([])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [ imageIcon, setImageIcon ] = useState<any>()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [ imageUpload, setImageUpload ] = useState<any>()
    // const { Setting } = url
    const { modalForm, setModalForm } = ModalFormState()
    const page = usePage();
    
    const { 
        control,
        register,
        handleSubmit,
        reset,
    } = useForm<FormSetting>();

    const { fields} = useFieldArray({
        control,
        name: "form",
    });


    useEffect(()=> {
        refetch()
    }, [page.page])

    const { mutate } = useMutation({
        mutationKey:['update-setting'],
        mutationFn: (data: FormSetting) => updateData('Setting.post', data),
        onSuccess: () => {
            toast.success(t("success-save"), {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const {refetch} = useQuery<ApiResponseSetting, AxiosError>({ 
        queryKey: ['class-types'], 
        networkMode: 'always',
        queryFn: async () => await getData('Setting.get'),
        onSuccess(data) {
            reset({
                form: data.data.setting
            });
            setImageIcon(data.data.setting.find(data=> data.label==="icon")?.value ?? '')
            setLabel(data.data.label)
            
        },
        onError: (errors) => {
            toast.error(errors.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const onSubmit: SubmitHandler<FormSetting> = (data) => {
        mutate(data)
    }

    const handleOnChange = (event:ChangeEvent<HTMLInputElement>) => {
        setImageIcon(URL.createObjectURL(event.target.files?.[0] as Blob));
        setImageUpload(event.target.files?.[0])
    }

    const handleOnUpload = async () => {
        await upload('Setting.post', imageUpload)
        toast.success(t("success-save"), {
            position: toast.POSITION.TOP_CENTER
        });
    }

    return {
        onSubmit,
        modalForm, 
        setModalForm,
        page: page,
        register,
        fields,
        handleSubmit,
        label,
        handleOnChange,
        imageIcon,
        handleOnUpload
    }
}