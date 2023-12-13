import { FC } from 'react'
import { InputText, Button } from '../../../../components/input';
import { RecordMateriFormProps } from '../../../../interfaces/recordMateri/RecordMateriInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';

const FormRecordMateri: FC<RecordMateriFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        isLoading,
        idDetail,
        handelOnChangeForm
    } = props;
    const {t} = useTranslation()
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col space-y-4'>
            <InputText
                    {...register("date")}
                    errors={errors.date?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("code")} 
                    type='date'
                    name='date'
                    onChange={(event)=> 
                        handelOnChangeForm(event)
                    }
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

export default FormRecordMateri