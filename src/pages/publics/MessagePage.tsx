import React from 'react'

const MessagePage = () => {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            <div className='w-6/12 m-auto bg-white shadow-md rounded-lg'>
                <div className='w-full p-4 bg-green-200 rounded-t-lg'>
                    <h1 className='font-bold text-2xl'>Selamat, Pendaftaran berhasil...</h1>
                    <h1 className='font-medium text-lg'>Kami akan mengirimkan invoice dan informasi lebih lanjut ke no whatsApp Kamu</h1>
                </div>
                <div className='p-4 bg-orange-100 rounded-b-lg'>
                    <h1 className='font-medium'>Hati-hati penipuan! jangan menerima tagihan selain dari no berikut</h1>
                    <h1 className='font-medium'>WhatsApp : 0812 1232 1231</h1>
                    <h1 className='font-medium'>Kami tidak bertanggung jawab atas tagihan yang dikirimkan selain no diatas</h1>
                    <h1 className='font-medium'>Terima Kasih</h1>
                </div>
                
            </div>
        </div>
    )
}

export default MessagePage