import { FC } from 'react'
import { InputText, Button } from '../../../../components/input';
import { WarehouseFormProps } from '../../../../interfaces/settings/WarehouseInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';

const FormWarehouse: FC<WarehouseFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        idDetail,
        isLoadingMutate,
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
                        {...register("phone")}
                        errors={errors.phone?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("phone")} 
                    />
                    <InputText
                        {...register("email")}
                        errors={errors.email?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("email")} 
                    />
                    <InputText
                        {...register("address")}
                        errors={errors.address?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("address")} 
                    />
                    <InputText
                        {...register("description")}
                        errors={errors.description?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("description")} 
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

export default FormWarehouse