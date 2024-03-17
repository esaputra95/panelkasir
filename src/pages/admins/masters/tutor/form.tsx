import { FC } from 'react'
import { InputText, Button, SelectOption } from '../../../../components/input';
import { TutorFormProps } from '../../../../interfaces/master/tutorInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';
import { BsFillTrashFill } from 'react-icons/bs';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';

const FormTutor: FC<TutorFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        isLoading,
        idDetail,
        fields,
        append,
        remove,
        control,
        dataOptionCourse,
        optionCourse,
        getValues
    } = props;

    console.log({dataOptionCourse});
    

    const {t} = useTranslation()
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 gap-2'>
                <InputText
                    {...register("name")}
                    errors={errors.name?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("name")} 
                />
                <InputText
                    {...register("username")}
                    errors={errors.username?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("username")} 
                />
                <InputText
                    {...register("email")}
                    errors={errors.email?.message} 
                    type='email'
                    readOnly={idDetail?true:false} 
                    label={t("email")} 
                />
                <InputText
                    {...register("password")}
                    errors={errors.password?.message} 
                    readOnly={idDetail?true:false} 
                    type='password'
                    label={t("password")} 
                />
                <InputText
                    {...register("nickname")}
                    errors={errors.nickname?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("nickname")} 
                />
                <InputText
                    {...register("phone")}
                    errors={errors.phone?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("phone")} 
                />
                <InputText
                    {...register("address")}
                    errors={errors.address?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("address")} 
                />
                <SelectOption 
                    {...register('userType')}
                    label={t('access-level')}
                    option={[
                        {label:'Admin', value: 'admin'},
                        {label:t('tutor'), value: 'tentor'}
                    ]}
                    disabled={idDetail?true:false}
                    errors={errors.userType?.message}
                />
            </div>
            <div className='border-t border-gray-400 mt-4' />
            
            <div className='mt-4 w-full'>
                <div className="w-full flex justify-between">
                    <label className='font-semibold'>Skill Tentor</label>
                    <Button
                        type='button'
                        variant='success'
                        onClick={()=>append({courseId:'', tentorId:'', description:''})}
                    >
                        +
                    </Button>
                </div>
                
                <div className='w-full'>
                    <table className='w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400'>
                        <thead>
                            <tr>
                                <th>
                                    {t('courses')}
                                </th>
                                <th>
                                    {t('description')}
                                </th>
                                <th>
                                    {t('delete')}
                                </th>
                            </tr>
                        </thead>
                        
                        <tbody>
                        
                            {
                                fields.map((fields, index)=> (
                                    <tr key={fields.id}>
                                        <td>
                                            <Controller
                                                name={`tentorSkills.${index}.course`}
                                                control={control}
                                                    render={({ field }) => 
                                                    <AsyncSelect 
                                                        className='w-full'
                                                        {...field}
                                                        cacheOptions
                                                        defaultOptions={true}
                                                        loadOptions={optionCourse}
                                                        ref={(ref)=>ref}
                                                        defaultValue={ 
                                                            dataOptionCourse.filter(value=> 
                                                                value.value === getValues(`tentorSkills.${index}.courseId`)
                                                            )
                                                        }
                                                    />
                                                }
                                            />
                                        </td>
                                        <td>
                                            <InputText
                                                {...register(`tentorSkills.${index}.description`)}
                                            />
                                        </td>
                                        <td>
                                            <span
                                                title={t("delete")}
                                                className="p-1.5 hover:cursor-pointer rounded-full"
                                                onClick={()=>remove(index)}
                                            >
                                                <BsFillTrashFill className="text-red-600 h-6 w-6" />
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody> 
                    </table>
                </div>
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

export default FormTutor