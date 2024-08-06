import { FC } from 'react'
import { InputText, Button } from '../../../../components/input';
import { MemberFormProps } from '../../../../interfaces/masters/MemberInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';

const FormMember: FC<MemberFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        idDetail,
        isLoadingMutate
    } = props;
    const {t} = useTranslation();

    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col '>
                <div className='grid grid-cols-1 gap-4'>
                    <InputText
                        {...register("name")}
                        errors={errors.name?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("name")} 
                    />
                    <InputText
                        {...register("hp")}
                        errors={errors.hp?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("hp")} 
                    />
                    <InputText
                        {...register("country")}
                        errors={errors.country?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("country")} 
                    />
                    <InputText
                        {...register("province")}
                        errors={errors.province?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("province")} 
                    />
                    <InputText
                        {...register("city")}
                        errors={errors.city?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("city")} 
                    />
                    <InputText
                        {...register("subdistrict")}
                        errors={errors.subdistrict?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("subdistrict")} 
                    />
                    <InputText
                        {...register("address")}
                        errors={errors.address?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("address")} 
                    />
                </div>
            </div>
            <div className='w-full flex justify-end space-x-2'>
                <Button
                    type='button'
                    variant="error"
                    onClick={onCancel}
                    size="medium"
                    className='my-4' >
                        {t("cancel")}
                    </Button>
                {!idDetail ? 
                    <Button 
                        disabled={isLoadingMutate?true:false} 
                        variant="primary" 
                        type='submit' 
                        size="medium" 
                        className='my-4' >
                            {t('save')} {isLoadingMutate?<Spinner />:null} {isLoadingMutate}
                    </Button>
                : null}
            </div>
        </form>
    )
}

export default FormMember