import { BsFillEmojiAngryFill } from "react-icons/bs";

const HaveAccess = () => {
    return (
        <div className='w-full flex justify-center items-center h-screen'>
            <div className='flex flex-col items-center justify-center'>
                <div className="py-8">
                    <BsFillEmojiAngryFill className='text-gray-600 h-24 w-24' />
                </div>
                <span className='text-6xl text-gray-600 font-bold text-center'>400</span>
                <span className='text-3xl text-gray-600 font-semibold text-center'>Anda tidak memiliki akses pada halaman ini</span>
            </div>
        </div>
    )
}

export default HaveAccess