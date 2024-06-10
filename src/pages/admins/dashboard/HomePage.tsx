import useDashboard from '../../../hooks/fetch/useDashboard'
// import useAccess from '../../../utils/useAccess';

const HomePage = () => {
    const {
        isLoadingTotal
    } = useDashboard();

    // const {
    //     token
    // } = useAccess()
    
    return(
        <div className='w-full'>
            {
                isLoadingTotal ? (
                    <div className='w-full grid gird-cols-1 lg:grid-cols-2 gap-2 animate-pulse'>
                        <div className='w-full flex flex-col h-36 rounded-lg shadow-md justify-between bg-gray-300'>
                            <div className='flex items-center '>
                                <div className='w-full flex flex-col m-4'>
                                    <div className='h-4 w-8 rounded-xl bg-gray-200' />
                                    <div className='h-4 w-32 rounded-xl bg-gray-200 mt-2' />
                                </div>
                                <span
                                    className='h-16 w-16 rounded-lg bg-gray-100 mr-4 mt-2'
                                />
                            </div>
                            <div className='w-full border-t h-8 flex justify-center items-center'>
                                <span
                                    className='h-4 w-16 rounded-lg bg-gray-100 mr-4 mt-2'
                                />
                            </div>
                        </div>
                        <div className='w-full flex flex-col h-36 rounded-lg shadow-md justify-between bg-gray-300'>
                            <div className='flex items-center '>
                                <div className='w-full flex flex-col m-4'>
                                    <div className='h-4 w-8 rounded-xl bg-gray-200' />
                                    <div className='h-4 w-32 rounded-xl bg-gray-200 mt-2' />
                                </div>
                                <span
                                    className='h-16 w-16 rounded-lg bg-gray-100 mr-4 mt-2'
                                />
                            </div>
                            <div className='w-full border-t h-8 flex justify-center items-center'>
                                <span
                                    className='h-4 w-16 rounded-lg bg-gray-100 mr-4 mt-2'
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex h-full w-full bg-white items-center justify-center'>
                        <span>SELAMAT DATANG</span>
                    </div>
                )
            }
        </div>
    )
}

export default HomePage