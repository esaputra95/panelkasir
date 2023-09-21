import InputText from '../../components/input/inputText'
import Button from '../../components/input/button'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const navigate = useNavigate()
    const handleLogin = () => {
        console.log('okw');
        
        localStorage.setItem("token", '123')
        navigate('/dashboard')
    }
    return (
        <div className='w-full h-screen flex bg-gray-100 justify-center items-center'>
            <div className='w-5/12 bg-white shadow-md p-8 rounded-lg space-y-4'>
                <label className='flex justify-center font-bold text-3xl'>
                    Login
                </label>
                <InputText label='Username' type='text' />
                <InputText label='Password' type='password' />
                <Button onClick={handleLogin}>Login</Button>
            </div>
        </div>
    )
}

export default LoginPage