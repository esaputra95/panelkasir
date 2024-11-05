import { Button, InputText } from '../../components/input'
import useForgotPassword from '../../hooks/slices/auth/useForgotPassword'

const ForgotPassword = () => {
    const {
        handleSubmit,
        register,
        errors,
        onSubmit
    } = useForgotPassword()
    return (
        <div className='w-full h-screen flex bg-gray-100 justify-center items-center'>
            <div className='w-full lg:w-3/12 rounded-lg bg-blue-200'>
                <div className='w-full flex flex-col p-8 gap-y-4 justify-center items-center'>
                    <label className='font-semibold text-lg text-gray-700'>
                        Halaman Lupa Password
                    </label>
                    <label className='text-center  text-gray-700'>
                        Reset Password Anda dengan memasukkan email di kolom yang tersedia. Password baru akan dikirim melalui email tersebut
                    </label>
                </div>
                <div className='w-full bg-white shadow-md rounded-b-lg p-8 space-y-4'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col gap-y-4'>
                            <InputText
                                {...register('email')}
                                label='Email'
                                type='email'
                                errors={errors.email?.message}
                            />
                            <Button 
                                type='submit'
                                variant='primary'
                            >
                                Reset
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword