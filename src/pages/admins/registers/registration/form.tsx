import { FC } from 'react'
import { 
    Button,
    InputText,
    LabelInput,
    SelectOption
} from '../../../../components/input';
import { RegistrationFormProps } from '../../../../interfaces/registers/registrationInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';

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
        optionClassMaster,
        optionStudent,
        optionSession,
        optionPackage,
        optionGuidanceType,
        optionSchoolYear,
        handleOnChangeSelect
    } = props;
    const {t} = useTranslation()
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col space-y-4'>
                <div className='w-full'>
                    <LabelInput>
                        {t('student')}
                    </LabelInput>
                    <Controller
                        name={`student`}
                        control={control}
                            render={({ field }) => 
                            <AsyncSelect
                                className='w-full'
                                {...field}
                                cacheOptions
                                loadOptions={optionStudent}
                                isDisabled={idDetail? true : false}
                                defaultOptions
                                placeholder='Select...'
                                onChange={(e)=> handleOnChangeSelect('studentId', e?.value ?? '')}
                                ref={(ref)=> ref}
                            />
                        }
                    />
                    <span className='text-red-500 text-sm font-light'>
                    {
                        errors.studentId?.message
                    }
                    </span>
                </div>
                <div className='w-full'>
                    <LabelInput>
                        {t('sessions')}
                    </LabelInput>
                    <Controller
                        name={`class`}
                        control={control}
                            render={({ field }) => 
                            <AsyncSelect
                                className='w-full'
                                {...field}
                                cacheOptions
                                loadOptions={optionClassMaster}
                                isDisabled={idDetail? true : false}
                                defaultOptions
                                placeholder='Select...'
                                onChange={(e)=> handleOnChangeSelect('classId', e?.value ?? '')}
                                ref={(ref)=> ref}
                            />
                        }
                    />
                    <span className='text-red-500 text-sm font-light'>
                    {
                        errors.classId?.message
                    }
                    </span>
                </div>
                {/* <InputText 
                    {...register('amount')}
                    label={t('amount')}
                    errors={errors.amount?.message}
                /> */}
                <div className='w-full'>
                    <LabelInput>
                        {t('sessions')}
                    </LabelInput>
                    <Controller
                        name={`session`}
                        control={control}
                            render={({ field }) => 
                            <AsyncSelect
                                className='w-full'
                                {...field}
                                cacheOptions
                                loadOptions={optionSession}
                                isDisabled={idDetail? true : false}
                                defaultOptions
                                placeholder='Select...'
                                onChange={(e)=> handleOnChangeSelect('sessionId', e?.value ?? '')}
                                ref={(ref)=> ref}
                            />
                        }
                    />
                    <span className='text-red-500 text-sm font-light'>
                    {
                        errors.sessionId?.message
                    }
                    </span>
                </div>
                <div className='w-full'>
                    <LabelInput>
                        {t('packages')}
                    </LabelInput>
                    <Controller
                        name={`package`}
                        control={control}
                            render={({ field }) => 
                            <AsyncSelect
                                className='w-full'
                                {...field}
                                cacheOptions
                                loadOptions={optionPackage}
                                isDisabled={idDetail? true : false}
                                defaultOptions
                                placeholder='Select...'
                                onChange={(e)=> handleOnChangeSelect('packageId', e?.value ?? '')}
                                ref={(ref)=> ref}
                            />
                        }
                    />
                    <span className='text-red-500 text-sm font-light'>
                    {
                        errors.packageId?.message
                    }
                    </span>
                </div>
                <div className='w-full'>
                    <LabelInput>
                        {t('guidance-types')}
                    </LabelInput>
                    <Controller
                        name={`guidanceType`}
                        control={control}
                            render={({ field }) => 
                            <AsyncSelect
                                className='w-full'
                                {...field}
                                cacheOptions
                                loadOptions={optionGuidanceType}
                                isDisabled={idDetail? true : false}
                                defaultOptions
                                onChange={(e)=> handleOnChangeSelect('guidanceTypeId', e?.value ?? '')}
                                placeholder='Select...'
                                ref={(ref)=> ref}
                            />
                        }
                    />
                    <span className='text-red-500 text-sm font-light'>
                    {
                        errors.guidanceTypeId?.message
                    }
                    </span>
                </div>
                <SelectOption 
                    {...register('location')}
                    label={t('study-location')}
                    option={[
                        {label:'Online', value:'online'},
                        {label:'Dikantor ESP Bimbel', value:'offline'}
                    ]}
                    errors={errors.location?.message}
                />
                <div className='w-full'>
                    <LabelInput>
                        {t('school-years')}
                    </LabelInput>
                    <Controller
                        name={`schoolYear`}
                        control={control}
                            render={({ field }) => 
                            <AsyncSelect
                                className='w-full'
                                {...field}
                                cacheOptions
                                loadOptions={optionSchoolYear}
                                isDisabled={idDetail? true : false}
                                defaultOptions
                                placeholder='Select...'
                                onChange={(e)=> handleOnChangeSelect('schoolYearId', e?.value ?? '')}
                                ref={(ref)=> ref}
                            />
                        }
                    />
                    <span className='text-red-500 text-sm font-light'>
                    {
                        errors.schoolYearId?.message
                    }
                    </span>
                </div>
                <InputText
                    {...register('university')}
                    label={t('universities')}
                    errors={errors.university?.message}
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