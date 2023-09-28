import { useNavigate } from 'react-router-dom'
import { ChangeEvent, useState } from 'react'
import { LoginInterface } from '../../interfaces/loginInterface'
import Alert from '../../components/ui/Alert'
import { alertState } from '../../utils/alertState'

const LoginPage = () => {
    const [form, setForm] = useState<LoginInterface>()
    const { alert, onAlert } = alertState()
    const navigate = useNavigate()
    const handleLogin = () => {
        console.log({form});
        
        if(form?.username === "admin" && form.password ==="admin"){
            localStorage.setItem("token", '123')
            navigate('/dashboard')
            onAlert('', false)
        }else{
            onAlert('Username or passwrod incorrect', true)
        }
    }

    const handleOnchange = (e:ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    return (
        <div className='w-full h-screen flex bg-gray-100 justify-center items-center'>
            <div className='w-5/12 bg-white shadow-md p-8 rounded-lg space-y-4'>
                {
                    alert?.visible ? <Alert message={alert?.message} /> : null
                }
                
                <label className='flex justify-center font-bold text-3xl'>
                    Login
                </label>
                {/* <InputText onChange={(e)=>handleOnchange(e)} label='Username' name='username' value={form?.username} type='text' />
                <InputText onChange={(e)=>handleOnchange(e)} label='Password' name='password' value={form?.password} type='password' /> */}
                {/* <Button onClick={handleLogin}>Login</Button> */}
            </div>
        </div>
    )
}

export default LoginPage