import { FC } from 'react'
import { UserFormProps } from '../../../interfaces/userInterface';
import { InputText, Button } from '../../../components/input';
import { t } from 'i18next';

const FormUser: FC<UserFormProps> = (props) => {
    const { handleSubmit, onSubmit, register, errors } = props;
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col space-y-4'>
                <InputText
                    {...register("email")}
                    errors={errors.email?.message} 
                    label={t("code")} 
                />
                <InputText
                    {...register("username")}
                    errors={errors.username?.message} 
                    label={t("username")} 
                />
                <InputText
                    {...register("password")}
                    errors={errors.password?.message} 
                    label={t("password")} 
                />
            </div>
            <div className='w-full flex justify-end space-x-2'>
                <Button variant="error" type='submit' size="medium" className='my-4' >Batal</Button>
                <Button variant="primary" type='submit' size="medium" className='my-4' >Simpan</Button>
            </div>
        </form>
    )
}

export default FormUser