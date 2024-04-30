import { FC } from 'react'
import { InputText, Button, SelectOption} from '../../../../components/input';
import { DonationCategoryFormProps } from '../../../../interfaces/donations/DonationCategoryInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';

const FormDonationCategory: FC<DonationCategoryFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        isLoading,
        idDetail,
    } = props;
    const {t} = useTranslation()
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col '>
                <div className='flex flex-col space-y-4'>
                    <InputText
                        {...register("name")}
                        errors={errors.name?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("name")} 
                    />
                    <SelectOption
                        {...register('status')}
                        label={t('status')}
                        errors={errors.status?.message}
                        option={[
                            {label:'Publish', value:'publish'},
                            {label:'Draft', value:'draft'}
                        ]}
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

export default FormDonationCategory