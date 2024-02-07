import { FaSadTear } from "react-icons/fa";

const NotFoundPage = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-3/12 flex flex-col p-8 items-center text-center justify-center rounded-lg bg-gray-200">
                <div className="py-8">
                    <FaSadTear className='text-gray-600 h-24 w-24' />
                </div>
                <label className="font-bold text-6xl text-gray-600">404</label>
                <label className="font-semibold text-4xl text-gray-600">Page Not Found</label>
            </div>
        </div>
    )
}

export default NotFoundPage