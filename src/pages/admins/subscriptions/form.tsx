import { FC } from 'react'
import { InputText, Button } from '../../../components/input';
import { SubscriptionFormProps } from '../../../interfaces/masters/SubscriptionInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../components/ui/Spinner';

const FormSubscription: FC<SubscriptionFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        idDetail,
        isLoading
    } = props;
    const {t} = useTranslation();

    console.log({isLoading});
    
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col '>
                <div className='grid grid-cols-1 gap-4'>
                    <InputText
                        {...register("startDate")}
                        errors={errors.startDate?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("startDate")} 
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
                        disabled={isLoading} 
                        variant="primary" 
                        type='submit' 
                        size="medium" 
                        className='my-4' >
                            {t('save')} {isLoading?<Spinner />:null} {isLoading}
                    </Button>
                : null}
            </div>
        </form>
    )
}

export default FormSubscription