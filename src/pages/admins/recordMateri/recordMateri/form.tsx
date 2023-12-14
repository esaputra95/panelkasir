import { FC } from 'react'
import { InputText, Button, LabelInput } from '../../../../components/input';
import { RecordMateriFormProps } from '../../../../interfaces/recordMateri/RecordMateriInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async'

const FormRecordMateri: FC<RecordMateriFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        isLoading,
        idDetail,
        control,
        handelOnChangeForm,
        optionStudyGroup
    } = props;
    const {t} = useTranslation()
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='w-full grid grid-cols-2 '>
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
                <div className='w-full pl-2'>
                    <LabelInput>{t("class-types")}</LabelInput>
                    <Controller
                        name="studyGroupId"
                        control={control}
                            render={({ field }) => 
                            <AsyncSelect 
                                className='w-full'
                                {...field}
                                cacheOptions
                                loadOptions={optionStudyGroup}
                                defaultOptions={true}
                                placeholder='Select...'
                                ref={(ref)=>ref}
                            />
                        }
                    />
                    <span className='text-red-300'>
                    {
                       errors.studyGroupId?.message
                    }
                    </span>
                </div>
            </div>
            <div className='w-full flex justify-end'>
                <Button variant='success'>Lihat Siswa</Button>
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