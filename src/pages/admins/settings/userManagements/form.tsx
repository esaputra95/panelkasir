import { FC } from 'react'
import { InputText, Button, SelectOption} from '../../../../components/input';
import { UserManagementFormProps } from '../../../../interfaces/settings/UserManagementInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';

const FormUserManagement: FC<UserManagementFormProps> = (props) => {
    const {t} = useTranslation()
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        isLoading,
        idDetail,
    } = props;

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
                    
                    <InputText
                        {...register("phone")}
                        errors={errors.phone?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("phone")} 
                    />
                    <SelectOption
                        {...register('level')}
                        label={t('level')}
                        option={[
                            {label: 'Owner', value: 'owner'},
                            {label: 'Kasir', value: 'cashier'},
                        ]}
                        errors={errors.verified?.message}
                    />
                    <SelectOption
                        {...register('verified')}
                        label={t('status')}
                        option={[
                            {label: 'Aktif', value: 'active'},
                            {label: 'Verifikasi Email', value: 'email_verification'},
                            {label: 'TIdak Aktif', value: 'non_active'},
                        ]}
                        errors={errors.verified?.message}
                    />
                    
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

export default FormUserManagement