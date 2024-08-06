import { FC } from 'react'
import { InputText, Button, LabelInput, SelectOption} from '../../../../components/input';
import { UserFormProps } from '../../../../interfaces/settings/UserInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { useAgenType } from '../../../../hooks/fetch/masters/useAgenType';
import { useUser } from '../../../../hooks/fetch/settings/useUser';

const FormUser: FC<UserFormProps> = (props) => {
    const {t} = useTranslation()
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        isLoading,
        idDetail,
        control,
        setValue,
        watch
    } = props;

    const {
        dataOptionAgenType,
        optionAgenType
    } = useAgenType();

    const {
        dataOptionUser,
        optionUser
    } = useUser();
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col '>
                <div className='grid grid-cols-2 gap-2'>
                    <InputText
                        {...register("name")}
                        errors={errors.name?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("name")} 
                    />
                    <div className='w-full'>
                        <LabelInput>{t("user-types")}</LabelInput>
                        <Controller
                            name="agentTypeOption"
                            control={control}
                                render={({ field }) => 
                                <AsyncSelect 
                                    {...field}
                                    isDisabled={idDetail?true:false}
                                    placeholder=''
                                    defaultOptions
                                    onChange={(e)=> (
                                        setValue('agentTypeId', e?.value as number)
                                    )}
                                    value={
                                        dataOptionAgenType.find(
                                            e=> e.value === watch(`agentTypeId`)
                                        )
                                    }
                                    loadOptions={optionAgenType}
                                    ref={(ref)=>ref}
                                />
                            }
                        />
                        <span className='text-red-300'>
                        {
                            errors.agentTypeId?.message
                        }
                        </span>
                    </div>
                    <InputText
                        {...register("phone")}
                        errors={errors.phone?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("phone")} 
                    />
                    <SelectOption
                        {...register('stockist')}
                        label={t('stockist')}
                        option={[
                            {label: 'Tidak', value: 0},
                            {label: 'Ya', value: 1}
                        ]}
                        errors={errors.stockist?.message}
                    />
                    <SelectOption
                        {...register('role')}
                        label={t('role')}
                        option={[
                            {label: 'Admin', value: 'admin'},
                            {label: 'Agen', value: 'agent'},
                            {label: 'Afiliator', value: 'afiliator'},
                            {label: 'Kasir', value: 'cashier'},
                            {label: 'Leader', value: 'leader'},
                        ]}
                        errors={errors.role?.message}
                    />
                    <div className='w-full'>
                        <LabelInput>{t("leader")}</LabelInput>
                        <Controller
                            name="leaderOption"
                            control={control}
                                render={({ field }) => 
                                <AsyncSelect 
                                    {...field}
                                    isDisabled={idDetail?true:false}
                                    placeholder=''
                                    defaultOptions
                                    onChange={(e)=> (
                                        setValue('leaderId', e?.value as number)
                                    )}
                                    value={
                                        dataOptionUser.find(
                                            e=> e.value === watch(`leaderId`)
                                        )
                                    }
                                    loadOptions={optionUser}
                                    ref={(ref)=>ref}
                                />
                            }
                        />
                        <span className='text-red-300'>
                        {
                            errors.leaderId?.message
                        }
                        </span>
                    </div>
                    <InputText
                        {...register("email")}
                        errors={errors.email?.message} 
                        readOnly={idDetail?true:false} 
                        autoComplete='new-email'
                        type='email'
                        label={t("email")} 
                    />
                    <InputText
                        {...register("password")}
                        errors={errors.password?.message} 
                        autoComplete='new-password'
                        readOnly={idDetail?true:false} 
                        type='password'
                        label={t("password")} 
                    />
                    <div className='flex flex-col w-full'>
                        <label htmlFor="address">{t('address')} </label>
                        <textarea
                            className='border border-gray-500 w-full rounded-lg p-2'
                            {...register('address', { required: true })}
                        />
                        <span className='text-red-300'>{errors.address?.message}</span>
                    </div>
                </div>
                
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

export default FormUser