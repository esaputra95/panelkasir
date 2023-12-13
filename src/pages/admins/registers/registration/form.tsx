import { FC } from 'react'
import { InputText, Button, SelectAutoComplete, SelectInput } from '../../../../components/input';
import { RegistrationFormProps } from '../../../../interfaces/registers/registratioInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';

const FormRegistration: FC<RegistrationFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        isLoading,
        idDetail,
        control,
        classTypeOption
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
                <SelectAutoComplete 
                    control={control}
                    errors={errors}
                    loadOption={classTypeOption}
                    name='classType'
                    label={t("class-types")}
                />
                <SelectInput 
                    name='method'
                    control={control}
                    errors={errors}
                    label={t("method")} 
                    options={[{label:'Online', value:'online'}, {label:'Offline', value: 'offline'}]}
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

export default FormRegistration