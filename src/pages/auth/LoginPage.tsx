import { Button, InputText } from '../../components/input'
import { useLogin } from '../../hooks/slices/auth/useLogin'

const LoginPage = () => {
    const {
        handleSubmit,
        onSubmit,
        register,
        errors,
    } = useLogin()
    return (
        <div className='w-full  lg:flex xl:flex'>
            <div className='w-full lg:w-6/12 xl:w-8/12'>
                <img src='./bg.jpg' className='w-full lg:h-screen xl:h-screen'/>
            </div>
            <div className='w-full lg:w-4/12 xl:4/12 flex items-center justify-center border-l'>
                <div className='w-full bg-white p-8 space-y-4'>
                    <div className='flex w-full items-center justify-center'>
                        <img className='w-48' src='./newlogo.png' />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col gap-y-4'>
                            <InputText 
                                {...register('email')}
                                label='Email'
                                type='text'
                                errors={errors.email?.message}
                            />
                            <InputText
                                {...register('password')}
                                label='Password'
                                type='password'
                                errors={errors.password?.message}
                            />
                            <Button 
                                type='submit'
                                variant='primary'
                            >
                                Login
                            </Button>
                            <label
                                onClick={()=>{}}
                                className='font-light text-sm text-gray-700'>
                                Lupa password?
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        // <div className='w-full h-screen flex bg-gray-100 justify-center items-center'>
        //     <div className='w-full lg:w-6/12 rounded-lg bg-blue-200 lg:flex lg:justify-between'>
        //         <div className='w-full lg:w-6/12 flex flex-col p-8 gap-y-4 justify-center items-center'>
        //             <label className='font-semibold text-lg text-gray-700'>
        //                 Selamat Datang
        //             </label>
        //             <label className='text-center  text-gray-700'>
        //                 Selamat datang kembali, Silahkan masukkan Username dan Password untuk mengakses Aplikasi 
        //             </label>
        //         </div>
        //         <div className='w-full lg:w-6/12 bg-white shadow-md rounded-r-lg p-8 space-y-4'>
        //             <label className='flex justify-center font-bold text-3xl  text-gray-700'>
        //                 MASUK
        //             </label>
        //             <form onSubmit={handleSubmit(onSubmit)}>
        //                 <div className='flex flex-col gap-y-4'>
        //                     <InputText 
        //                         {...register('username')}
        //                         label='Username'
        //                         type='text'
        //                         errors={errors.username?.message}
        //                     />
        //                     <InputText
        //                         {...register('password')}
        //                         label='Password'
        //                         type='password'
        //                         errors={errors.password?.message}
        //                     />
        //                     <Button 
        //                         type='submit'
        //                         variant='primary'
        //                     >
        //                         Login
        //                     </Button>
        //                     <label
        //                         onClick={()=>{}}
        //                         className='font-light text-sm text-gray-700'>
        //                         Lupa password?
        //                     </label>
        //                 </div>
        //             </form>
        //         </div>
        //     </div>
        // </div>
    )
}

export default LoginPage