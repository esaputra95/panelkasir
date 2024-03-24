import { FC } from 'react'
import { 
    InputText,
    Button,
    LabelInput
} from '../../../../components/input';
import { StudyGroupFormProps } from '../../../../interfaces/schedule/studyGroupInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';
import AsyncSelect from 'react-select/async';
import { Controller } from 'react-hook-form';
import { OptionDummy } from '../../../../utils/dummy/setting';
import { BsTrash } from "react-icons/bs";

const FormStudyGroup: FC<StudyGroupFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        isLoading,
        idDetail,
        control,
        fields,
        optionGuidanceType,
        optionStudent,
        append,
        remove,
        optionClassMaster,
        dataOptionClassMaster,
        getValues,
        dataOptionGuidanceType,
        dataOptionStudent,
        updateStatus,
        onChangeStudyGroup,
        onChangeStudyGroupDetail,
    } = props;
    const {t} = useTranslation()

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 gap-2'>
                <InputText
                    {...register("studyGroup.name")}
                    errors={errors.studyGroup?.name?.message} 
                    readOnly={idDetail?true:false} 
                    type='text'
                    label={t("name")} 
                />
                <InputText
                    {...register("studyGroup.total")}
                    errors={errors.studyGroup?.total?.message} 
                    readOnly={idDetail?true:false} 
                    type='number'
                    label={t("session-quantities")} 
                />
                <div className='w-full'>
                    <LabelInput>{t("class-types")}</LabelInput>
                    <Controller
                        name="studyGroup.guidanceType"
                        control={control}
                            render={({ field }) => 
                            <AsyncSelect  className='w-full'
                                {...field}
                                cacheOptions
                                loadOptions={optionGuidanceType}
                                onChange={(e)=>onChangeStudyGroup('guidanceTypeId', e)}
                                defaultOptions
                                value={ updateStatus ?
                                    dataOptionGuidanceType.filter(
                                        value=> value.value === getValues('studyGroup.guidanceTypeId')) 
                                    : undefined
                                }
                                placeholder='Select...'
                                ref={(ref)=>ref}
                            />
                        }
                    />
                    <span className='text-red-300'>
                    {
                        errors.studyGroup?.guidanceTypeId?.message ?? null
                    }
                    </span>
                </div>
                <div className='w-full'>
                    <LabelInput>{t("class")}</LabelInput>
                    <Controller
                        name="studyGroup.class"
                        control={control}
                        render={({ field }) => 
                            <AsyncSelect
                                className='w-full'
                                {...field}
                                cacheOptions
                                defaultOptions={true}
                                loadOptions={optionClassMaster}
                                onChange={(e)=>onChangeStudyGroup('classId', e)}
                                placeholder='Select...'
                                value={dataOptionClassMaster.filter(value=> 
                                        value.value === getValues(`studyGroup.classId`)
                                    )
                                }
                                ref={(ref)=> ref}
                            />
                        }
                    />
                    
                    <span className='text-red-300'>
                    {
                        errors.studyGroup?.classId?.message ?? null
                    }
                    </span>
                </div>
            </div>
            <div className='border-t border-gray-400 mt-4' />
            <div className='w-full pt-4 flex justify-between items-center'>
                <label className='font-semibold'>
                    {t("select-student-list")}
                </label>
                <Button 
                    type='button'
                    variant="success"
                    onClick={()=>append({
                        student: OptionDummy,
                        studentId: ''
                    })}
                >
                    + {`${t("student")}`}
                </Button>
            </div>
            <div className='w-full grid grid-cols-2'>
                {
                    fields.length > 0 ? fields.map((field, index)=> (
                        <div key={field.id} className='w-full flex my-2 px-2 space-x-1'>
                            <div className='w-full'>
                                <Controller
                                    name={`studyGroupDetails.${index}.student`}
                                    control={control}
                                        render={({ field }) => 
                                        <AsyncSelect
                                            className='w-full'
                                            {...field}
                                            cacheOptions
                                            loadOptions={optionStudent}
                                            onChange={(e)=> onChangeStudyGroupDetail('studentId', index, e)}
                                            defaultOptions
                                            placeholder='Select...'
                                            defaultValue={ updateStatus ? dataOptionStudent.filter(value=> 
                                                    value.value === getValues(`studyGroupDetails.${index}.studentId`)
                                                ) : undefined
                                            }
                                            ref={(ref)=> ref}
                                        />
                                    }
                                />
                                <span className='text-red-300'>
                                {
                                    errors.studyGroupDetails?.[index]?.studentId?.message ?? null
                                }
                                </span>
                            </div>
                            <Button
                                type='button'
                                size="small"
                                variant="warning"
                                onClick={()=> remove(index)}
                            >
                                <BsTrash />
                            </Button>
                        </div>
                    )) : null
                }
                
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

export default FormStudyGroup