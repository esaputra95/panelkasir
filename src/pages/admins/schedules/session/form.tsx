import { ChangeEvent, FC } from 'react'
import { 
    Button,
    InputText,
    LabelInput,
    SelectOption
} from '../../../../components/input';
import {
    SessionFormProps,
    methodEnum,
    typeEnum
} from '../../../../interfaces/schedule/sessionInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';
import AsyncSelect from 'react-select/async';
import { Controller } from 'react-hook-form';
import { BsTrash } from "react-icons/bs";
import { SingleValue } from 'react-select';
import { OptionSelectInterface } from '../../../../interfaces/globalInterface';

const FormSession: FC<SessionFormProps> = (props) => {
    const {
        handleSubmit,
        onSubmit,
        onCancel,
        register,
        errors,
        isLoading,
        idDetail,
        control,
        fields,
        fieldDate,
        appendDate,
        optionStudent,
        remove,
        removeDate,
        getValues,
        append,
        dataOptionStudent,
        optionCourse,
        dataOptionCourse,
        updateStatus,
        optionTutor,
        dataOptionTutor,
        optionRoom,
        dataOptionRoom,
        handleOnChangeTime,
        handleOnChangeSession,
        handleOnChangeSessionDetail,
        appendIdDeleteSessionDetail,
        // dataOptionClassType,
        optionClassType
    } = props;
    const {t} = useTranslation()
    
    const removeSessionDetail = (id:string, index:number) => {
        if(updateStatus){
            appendIdDeleteSessionDetail({
                id: id
            });
        }
        
        remove(index)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='w-full grid grid-cols-3 gap-2'>
                <div className='w-full'>
                    <LabelInput>
                        {t('schedule-type')}
                    </LabelInput>
                    <Controller
                        name={`schedule.scheduleType`}
                        control={control}
                            render={({ field }) => 
                            <AsyncSelect
                                className='w-full'
                                {...field}
                                cacheOptions
                                loadOptions={optionClassType}
                                isDisabled={idDetail? true : false}
                                defaultOptions
                                placeholder='Select...'
                                ref={(ref)=> ref}
                            />
                        }
                    />
                    <span className='text-red-500 text-sm font-light'>
                    {
                        errors.schedule?.scheduleType?.message
                    }
                    </span>
                </div>
                <SelectOption 
                    {...register('schedule.method')}
                    className='w-full'
                    option={[
                        {label:'Offline', value:'offline'},
                        {label:'Online', value:'online'}
                    ]}
                    disabled={idDetail ? true : false}
                    errors={errors.schedule?.method?.message}
                    onChange={(e:ChangeEvent<HTMLSelectElement>)=>
                        handleOnChangeSession('schedule.method', e.target.value as methodEnum)
                    }
                    label={t('method')}
                />
            </div>
            <div className='border-t border-gray-400 mt-4' />
            <div className='w-full pt-4 flex justify-between items-center'>
                <label className='font-semibold'>
                    Tentukan Jadwal
                </label>
                {
                    !idDetail ? 
                    (
                        <Button 
                            variant='success'
                            type='button'
                            onClick={()=> appendDate(
                                {
                                    date: '',
                                    courseId : 'OptionDummy',
                                    tentorId: '',
                                    roomId: '',
                                    type: typeEnum.study
                                }
                            )}
                        >
                            + {t("session")}
                        </Button>
                    ) : null
                }
            </div>
            <div className='w-full'>
                {
                    fieldDate.length > 0 ? fieldDate.map((field, index)=> (
                        <div key={field.id} className='flex items-end border-b border-gray-400 mt-4'>
                            <div key={field.id} className='w-full flex gap-1'>
                                <div className='w-6/12'>
                                    <SelectOption 
                                        className='w-full'
                                        {...register(`time.${index}.type`)}
                                        disabled={idDetail ? true : false}
                                        option={[
                                            {label:'Belajar', value:'study'},
                                            {label:'Try-Out', value:'try_out'}
                                        ]}
                                        label={t('study-types')}
                                        value={getValues(`time.${index}.type`)}
                                    />
                                </div>
                                <div className='w-full'>
                                    <InputText 
                                        {...register(`time.${index}.date`)}
                                        name='date'
                                        type='datetime-local'
                                        label={t("date")}
                                        disabled={idDetail ? true : false}
                                        onChange={(e:ChangeEvent<HTMLInputElement>) => 
                                            handleOnChangeTime(index, 'date', e.target.value)
                                        }
                                        errors={errors.time?.[index]?.date?.message}
                                    />
                                </div>
                                
                                <div className='w-full'>
                                    <LabelInput>
                                        {t('courses')}
                                    </LabelInput>
                                    <Controller
                                        name={`time.${index}.course`}
                                        control={control}
                                            render={({ field }) => 
                                            <AsyncSelect
                                                className='w-full'
                                                {...field}
                                                cacheOptions
                                                loadOptions={optionCourse}
                                                isDisabled={idDetail? true : false}
                                                defaultOptions
                                                placeholder='Select...'
                                                defaultValue={ updateStatus || idDetail ? 
                                                    dataOptionCourse.filter(value=> 
                                                        value.value === getValues(`time.${index}.courseId`)
                                                    ) : undefined
                                                }
                                                onChange={(e:SingleValue<OptionSelectInterface>)=>
                                                    handleOnChangeTime(index, 'courseId', e?.value ?? '')
                                                }
                                                ref={(ref)=> ref}
                                            />
                                        }
                                    />
                                    <span className='text-red-500 text-sm font-light'>
                                    {
                                        errors.time?.[index]?.courseId?.message
                                    }
                                    </span>
                                </div>
                                <div className='w-full'>
                                    <LabelInput>
                                        {t('tutors')}
                                    </LabelInput>
                                    <Controller
                                        name={`time.${index}.tentor`}
                                        control={control}
                                            render={({ field }) => 
                                            <AsyncSelect
                                                className='w-full'
                                                {...field}
                                                cacheOptions
                                                loadOptions={optionTutor}
                                                defaultOptions
                                                isDisabled={idDetail? true : false}
                                                placeholder='Select...'
                                                value={ updateStatus || idDetail ? dataOptionTutor.filter(value=> 
                                                        value.value === getValues(`time.${index}.tentorId`)
                                                    ) : undefined
                                                }
                                                onChange={(e:SingleValue<OptionSelectInterface>)=>
                                                    handleOnChangeTime(index, 'tentorId', e?.value ?? '')
                                                }
                                                ref={(ref)=> ref}
                                            />
                                        }
                                    />
                                    <span className='text-red-500 text-sm font-light'>
                                    {
                                        errors.time?.[index]?.tentorId?.message
                                    }
                                    </span>
                                </div>
                                <div className='w-full'>
                                    <LabelInput>
                                        {t('rooms')}
                                    </LabelInput>
                                    <Controller
                                        name={`time.${index}.room`}
                                        control={control}
                                            render={({ field }) => 
                                            <AsyncSelect
                                                className='w-full'
                                                {...field}
                                                cacheOptions
                                                loadOptions={optionRoom}
                                                isDisabled={idDetail? true : false}
                                                defaultOptions
                                                placeholder='Select...'
                                                value={ updateStatus || idDetail ? dataOptionRoom.filter(value=> 
                                                        value.value === getValues(`time.${index}.roomId`)
                                                    ) : undefined
                                                }
                                                onChange={(e:SingleValue<OptionSelectInterface>)=>
                                                    handleOnChangeTime(index, 'roomId', e?.value ?? '')
                                                }
                                                ref={(ref)=> ref}
                                            />
                                        }
                                    />
                                    <span className='text-red-500 text-sm font-light'>
                                    {
                                        errors.time?.[index]?.roomId?.message
                                    }
                                    </span>
                                </div>
                                <InputText
                                    label='Deskripsi'
                                    />
                                
                            </div>
                            {
                                !idDetail ? (
                                    <div className='w-12 flex justify-end'>
                                        <Button
                                                type='button'
                                                className='h-10'
                                                size="small"
                                                variant="warning"
                                                onClick={()=> removeDate(index)}
                                            >
                                            <BsTrash />
                                        </Button>
                                    </div>
                                ) : null
                            }
                        </div>
                    )) : null
                }
            </div>
            <div className='border-t border-gray-400 mt-4' />
            <div className='w-full pt-4 flex justify-between items-center'>
                <label className='font-semibold'>
                    {t("select-student-list")}
                </label>
                {
                    !idDetail ?
                    (
                        <Button 
                            variant='success'
                            type='button'
                            onClick={()=> append(
                                {
                                    studentId:''
                                }
                            )}
                        >
                            + {t('student')}
                        </Button>
                    ) : null
                }
            </div>
            <div className='w-full grid grid-cols-4'>
                {
                    fields.length > 0 ? fields.map((field, index)=> (
                        <div key={field.id} className='w-full flex my-2 px-2 space-x-1'>
                            <div className='w-full'>
                                <Controller
                                    name={`scheduleDetails.${index}.student`}
                                    control={control}
                                        render={({ field }) => 
                                        <AsyncSelect
                                            className='w-full'
                                            {...field}
                                            name={`scheduleDetails.${index}.student`}
                                            cacheOptions
                                            loadOptions={optionStudent}
                                            isDisabled={idDetail? true : false}
                                            defaultOptions
                                            onChange={(e:SingleValue<OptionSelectInterface>)=>
                                                handleOnChangeSessionDetail(e?.value ?? '', index)
                                            }
                                            placeholder='Select...'
                                            value={ dataOptionStudent.filter(value=> 
                                                    value.value === getValues(`scheduleDetails.${index}.studentId`)
                                                )
                                            }
                                            ref={(ref)=> ref}
                                        />
                                    }
                                />
                                <span className='text-red-300'>
                                {
                                    errors.scheduleDetails?.[index]?.student?.message ?? null
                                }
                                </span>
                            </div>
                            {
                                !idDetail ?
                                (
                                    <Button
                                        type='button'
                                        size="small"
                                        variant="warning"
                                        onClick={()=> 
                                            removeSessionDetail(
                                                getValues(`scheduleDetails.${index}.id`)??'', 
                                                index
                                            )
                                        }
                                    >
                                        <BsTrash />
                                    </Button>
                                ) : null
                            }
                            
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

export default FormSession