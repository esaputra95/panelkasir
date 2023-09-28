import { FC } from 'react'
import { UserFormProps } from '../../../interfaces/userInterface';
import { InputText, Button } from '../../../components/input';

const FormUser: FC<UserFormProps> = (props) => {
    const { handleSubmit, onSubmit, register } = props;
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col space-y-4'>
                <InputText register={register} label='Name' name='name' />
                <InputText register={register} label='Email' name='email' />
                <InputText register={register} label='Username' name='username' />
                <InputText register={register} label='Password' name='password' type='password' />
            </div>
            <div className='w-full flex justify-end space-x-2'>
                <Button variant="error" type='submit' size="medium" className='my-4' >Batal</Button>
                <Button variant="primary" type='submit' size="medium" className='my-4' >Simpan</Button>
            </div>
        </form>
    )
}

export default FormUser