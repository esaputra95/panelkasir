import { FC } from 'react'
import { InputText, Button, SelectOption } from '../../../../components/input';
import { CustomerFormProps } from '../../../../interfaces/masters/CustomerInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';

const FormCustomer: FC<CustomerFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        isLoading,
        idDetail
    } = props;
    const {t} = useTranslation()
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col space-y-4'>
                <InputText
                    {...register("name")}
                    errors={errors.name?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("name")} 
                />
                <InputText
                    {...register("email")}
                    errors={errors.email?.message} 
                    type='email'
                    readOnly={idDetail?true:false} 
                    label={t("email")} 
                />
                <SelectOption 
                    {...register('status')}
                    label={t("type")}
                    option={[
                        {value:'email_verify', label:'Email Verify'},
                        {value:'active', label:'Active'},
                        {value:'block', label:'Block'},
                    ]}
                    errors={errors.status?.message}
                />
                <InputText
                    {...register("address")}
                    errors={errors.address?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("address")} 
                />
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

export default FormCustomer