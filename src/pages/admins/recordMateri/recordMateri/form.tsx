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
        getValues,
        errors,
        isLoading,
        idDetail,
        control,
        handelOnChangeForm,
        optionStudyGroup,
        getListStudents,
        fieldDetails,
        optionStudent,
        dataOptionStudent,
        optionCourse,
        dataOptionCourse,
        dataOptionStudyGroup,
        updateStatus
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
                    onChange={(event)=> 
                        handelOnChangeForm(event)
                    }
                />
                
                <div className='w-full pl-2'>
                    <LabelInput>{t("study-groups")}</LabelInput>
                    <Controller
                        name="studyGroupId"
                        control={control}
                            render={({ field }) => 
                            <AsyncSelect 
                                className='w-full'
                                {...field}
                                cacheOptions
                                defaultOptions
                                loadOptions={optionStudyGroup}
                                placeholder='Select...'
                                value={ updateStatus ? dataOptionStudyGroup.filter(value=> 
                                    value.value === getValues(`studyGroupId`) 
                                ) : undefined
                            }
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
                <Button
                    type='button'
                    variant='success'
                    onClick={()=> getListStudents(
                        getValues('date')??'', 
                        getValues('tentorId')??'', 
                        getValues('studyGroupId')??'')}
                >
                    Lihat Siswa
                </Button>
            </div>
            <div className="w-full overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th>
                                {t('students')}
                            </th>
                            <th>
                                {t('materials')}
                            </th>
                            <th>
                                {t('advice')}
                            </th>
                            <th>
                                {t('description')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        fieldDetails.length > 0 ?fieldDetails.map((field, index)=>
                            <tr key={field.id}>
                                <td >
                                    <Controller
                                        name={`detail.${index}.student`}
                                        control={control}
                                            render={({ field }) => 
                                            <AsyncSelect
                                                className='w-full'
                                                {...field}
                                                name={`scheduleDetails.${index}.student`}
                                                cacheOptions
                                                loadOptions={optionStudent}
                                                isSearchable={false}
                                                defaultOptions
                                                placeholder='Select...'
                                                value={ dataOptionStudent ? dataOptionStudent.filter(value=> 
                                                        value.value === getValues(`detail.${index}.studentId`)
                                                    ) : null
                                                }
                                                ref={(ref)=> ref}
                                            />
                                        }
                                    />
                                    <span className='text-red-300'>
                                    {
                                        errors.detail?.[index]?.student?.message ?? null
                                    }
                                    </span>
                                </td>
                                <td >
                                    <Controller
                                        name={`detail.${index}.material`}
                                        control={control}
                                            render={({ field }) => 
                                            <AsyncSelect
                                                className='w-full'
                                                {...field}
                                                name={`scheduleDetails.${index}.material`}
                                                cacheOptions
                                                loadOptions={optionCourse}
                                                isDisabled={idDetail? true : false}
                                                defaultOptions
                                                value={ 
                                                    dataOptionCourse ? dataOptionCourse.filter(value=> 
                                                    value.value === getValues(`detail.${index}.materiId`)
                                                ) : null
                                            }
                                                placeholder='Select...'
                                                ref={(ref)=> ref}
                                            />
                                        }
                                    />
                                    <span className='text-red-300'>
                                    {
                                        errors.detail?.[index]?.student?.message ?? null
                                    }
                                    </span>
                                </td>
                                <td>
                                <InputText
                                    {
                                        ...register(`detail.${index}.advice`)
                                    }
                                    errors={errors.detail?.[index]?.advice?.message ?? ''}
                                /></td>
                                <td>
                                    
                                <InputText
                                    {
                                        ...register(`detail.${index}.description`)
                                    }
                                    errors={errors.detail?.[index]?.description?.message ?? ''}
                                />
                                </td>
                            </tr>
                        ) : null
                    }
                    </tbody>
                </table>
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