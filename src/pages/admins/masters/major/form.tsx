import { FC } from 'react'
import { InputText, Button, SelectAutoComplete } from '../../../../components/input';
import { MajorFormProps } from '../../../../interfaces/master/majorInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';

const FormMajor: FC<MajorFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        isLoading,
        idDetail,
        optionUniversity,
        control
    } = props;
    const {t} = useTranslation()
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col space-y-4'>
                <SelectAutoComplete 
                    control={control}
                    errors={errors}
                    loadOption={optionUniversity}
                    name='university'
                    label={t("universities")}
                />
                <InputText
                    {...register("code")}
                    errors={errors.code?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("code")} 
                />
                <InputText
                    {...register("name")}
                    errors={errors.code?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("name")} 
                />
                <InputText
                    {...register("description")}
                    errors={errors.code?.message} 
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
                    className='my-4' >
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
                </Button>: null}
            </div>
        </form>
    )
}

export default FormMajor