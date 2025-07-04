import { FC } from 'react'
import { InputText, Button } from '../../../../components/input';
import { PaymentMethodFormProps } from '../../../../interfaces/settings/PaymentMethodInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';
import ImageInput from '../../../../components/input/ImageInput';

const FormPaymentMethod: FC<PaymentMethodFormProps> = (props) => {
    const {t} = useTranslation()
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        isLoading,
        idDetail,
        control
    } = props;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col '>
                <div className='grid grid-cols-2 gap-2'>
                    <InputText
                        {...register("name")}
                        errors={errors.name?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("name")} 
                    />
                    <InputText
                        {...register("balance")}
                        errors={errors.name?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("balance")} 
                    />
                    <ImageInput
                        name="image"
                        control={control}
                        label="Upload Gambar"
                        maxSizeMB={0.8}
                        maxFileSizeMB={10}
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
                        disabled={isLoading?true:false} 
                        variant="primary" 
                        type='submit' 
                        size="medium" 
                        className='my-4' >
                            {t('save')} {isLoading?<Spinner />:null}
                    </Button>
                : null}
            </div>
        </form>
    )
}

export default FormPaymentMethod