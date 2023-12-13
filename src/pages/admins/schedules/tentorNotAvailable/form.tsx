import { FC } from 'react'
import { InputText, Button, SelectAutoComplete } from '../../../../components/input';
import { TentorNotAvailableFormProps } from '../../../../interfaces/schedule/tentorNotAvailableInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';
import useAccess from '../../../../utils/useAccess';

const FormTentorNotAvailable: FC<TentorNotAvailableFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        optionTutor,
        errors,
        isLoading,
        idDetail,
        control
    } = props;
    const {t} = useTranslation()
    const {token} = useAccess()
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col space-y-4'>
                <div className={`${token?.userType==="tentor" ? 'hidden': 'flex'}`}>
                    <SelectAutoComplete 
                        control={control}
                        errors={errors}
                        loadOption={optionTutor}
                        name='tentor'
                        label={t("tutor")}
                    />
                </div>
                <InputText
                    {...register("startDate")}
                    errors={errors.startDate?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("start-date")}
                    type='datetime-local' 
                />
                
                <InputText
                    {...register("untilDate")}
                    errors={errors.untilDate?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("until-date")} 
                    type='datetime-local'
                />
                <InputText
                    {...register("description")}
                    errors={errors.description?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("description")} 
                />
            </div>
            <div className='w-full flex justify-end space-x-2'>
                <Button 
                    type='button' 
                    variant="error" 
                    onClick={onCancel} 
                    size="medium" 
                    className='my-4' 
                >
                    {t('cancel')}
                </Button>
                {!idDetail ?
                    <Button
                        disabled={isLoading?true:false}
                        variant="primary"
                        type='submit'
                        size="medium"
                        className='my-4' 
                    >
                        {t('save')} {isLoading?<Spinner />:null}
                    </Button>
                : null}
            </div>
        </form>
    )
}

export default FormTentorNotAvailable