import { FC } from 'react'
import { InputText, Button, LabelInput } from '../../../../components/input';
import { RecordMateriFormProps } from '../../../../interfaces/recordMateri/RecordMateriInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async'
import useAccess from '../../../../utils/useAccess';

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
        getListStudents,
        fieldDetails,
        optionStudent,
        dataOptionStudent,
        optionCourse,
        dataOptionCourse,
        optionTutor
    } = props;

    const {t} = useTranslation()

    const {
        token
    } = useAccess()

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='w-full grid grid-cols-2 gap-2 '>
                <InputText
                    {...register("date")}
                    errors={errors.date?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("start-date")} 
                    type='date'
                    max={new Date().toISOString().split('T')[0]}
                />
                <InputText
                    {...register("date2")}
                    errors={errors.date?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("until-date")} 
                    type='date'
                    max={new Date().toISOString().split('T')[0]}
                />
                {
                    token?.userType === "admin" ? (
                        <div className='w-full'>
                            <LabelInput>{t("tutors")}</LabelInput>
                            <Controller
                                name="tentor"
                                control={control}
                                    render={({ field }) => 
                                    <AsyncSelect 
                                        className='w-full'
                                        {...field}
                                        defaultOptions
                                        loadOptions={optionTutor}
                                        placeholder='Pilih...'
                                        ref={(ref)=>ref}
                                    />
                                }
                            />
                            <span className='text-red-300'>
                            {
                                errors.tentorId?.message ?? null
                            }
                            </span>
                        </div>
                    ) : null
                }
            </div>
            <div className='w-full flex justify-between py-2 items-end'>
                <label className='text-sm font-normal text-gray-600'>Catatan : Kolom deskripsi dikosongkan jika siswa tidak hadir</label>
                <Button
                    type='button'
                    variant='success'
                    onClick={()=> getListStudents(
                        getValues('date')??'', 
                        getValues('tentor.value')??'', 
                        getValues('date2')??'')}
                >
                    Lihat Siswa
                </Button>
            </div>
            <div className="w-full overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className='p-2'>
                                {t('students')}
                            </th>
                            <th className='p-2'>
                                {t('materials')}
                            </th>
                            <th className='p-2'>
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
                                                isDisabled={true}
                                                defaultOptions
                                                placeholder='Select...'
                                                defaultValue={ dataOptionStudent.length > 0 ? dataOptionStudent.filter(value=> 
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
                                                isDisabled={true}
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
                                <Controller
                                    name={`detail.${index}.description`}
                                    control={control}
                                    render={({ field }) => 
                                        <textarea rows={3} 
                                            className='resize-none block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                                            {...field} 
                                    />}
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