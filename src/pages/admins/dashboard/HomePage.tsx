import useDashboard from '../../../hooks/fetch/useDashboard'
import useAccess from '../../../utils/useAccess';
import {
    BsBank2,
    BsBookHalf,
    BsBoomboxFill,
    BsClockFill,
    BsFileEarmarkMedicalFill
} from "react-icons/bs";
import RecordMateri from './RecordMateri'
import StudyGroup from './StudyGroup'
import ModalForm from '../../../components/ui/modal/ModalForm';
import StudyModule from './StudyModule';
import StudySchedule from './StudySchedule';
import StudyWillFInish from './StudyWillFinish';

const HomePage = () => {
    const {
        recordMateri,
        studyGroup,
        studyModule,
        setModalFormStudyGroup,
        modalFormStudyGroup,
        modalFormRecordMateri,
        setModalFormRecordMateri,
        modalFormStudyModule,
        setModalFormStudyModule,
        isLoadingTotal,
        total,
        getDataRecordMateri,
        getStudyGroup,
        getStudyModule,
        studySchedule,
        getStudySchedule,
        modalFormStudySchedule,
        setModalFormStudySchedule,
        setModalFormStudentWillFinish,
        modalFormStudentWillFinish,
        studentWillFinish,
        getStudyFinish
    } = useDashboard();

    const {
        token
    } = useAccess()
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
                    <div className='w-full grid gird-cols-1 lg:grid-cols-3 gap-2'>
                        <div className='w-full flex flex-col h-36 rounded-lg shadow-md justify-between bg-cyan-400'>
                            <div className='flex items-center '>
                                <div className='w-full flex flex-col m-4'>
                                    <label className='font-semibold text-3xl text-white'>{total.recordMateri}</label>
                                    <label className='text-white text-sm'>Siswa belum mendapatkan Record Materi</label>
                                </div>
                                <BsBoomboxFill
                                    className='h-16 w-16 text-white mr-4'
                                />
                            </div>
                            <div onClick={()=>getDataRecordMateri()} className='w-full border-t h-8 flex justify-center items-center hover:cursor-pointer'>
                                <label 
                                    className='font-medium text-sm text-white hover:cursor-pointer'
                                >Lihat data</label>
                            </div>
                        </div>
                        {
                            token?.userType === "admin" ? (
                                <div className='w-full flex flex-col h-36 rounded-lg shadow-md justify-between bg-green-500'>
                                    <div className='flex items-center '>
                                        <div className='w-full flex flex-col m-4'>
                                            <label className='font-semibold text-3xl text-white'>{total.studyGroup}</label>
                                            <label className='text-white text-sm'>Siswa belum mendapatkan grup belajar</label>
                                        </div>
                                        <BsBank2
                                            className='h-16 w-16 text-white mr-4'
                                        />
                                    </div>
                                    <div onClick={()=>getStudyGroup()} className='w-full border-t h-8 flex justify-center items-center hover:cursor-pointer'>
                                        <label 
                                            className='font-medium text-sm text-white hover:cursor-pointer'
                                        >Lihat data</label>
                                    </div>
                                </div>
                            ): null
                        }
                        {
                            token?.userType === "admin" ? ( 
                                <div className='w-full flex flex-col h-36 rounded-lg shadow-md justify-between bg-blue-500'>
                                    <div className='flex items-center '>
                                        <div className='w-full flex flex-col m-4'>
                                            <label className='font-semibold text-3xl text-white'>{total.studySchedule}</label>
                                            <label className='text-white text-sm'>Siswa belum memiliki jadwal</label>
                                        </div>
                                        <BsFileEarmarkMedicalFill
                                            className='h-16 w-16 text-white mr-4'
                                        />
                                    </div>
                                    <div onClick={()=>getStudySchedule()} className='w-full border-t h-8 flex justify-center items-center hover:cursor-pointer'>
                                        <label 
                                            className='font-medium text-sm text-white hover:cursor-pointer'
                                        >Lihat data</label>
                                    </div>
                                </div>
                            ) : null
                        }
                        {
                            token?.userType === "admin" ? ( 
                                <div className='w-full flex flex-col h-36 rounded-lg shadow-md justify-between bg-lime-600'>
                                    <div className='flex items-center '>
                                        <div className='w-full flex flex-col m-4'>
                                            <label className='font-semibold text-3xl text-white'>{total.studyModule}</label>
                                            <label className='text-white text-sm'>Siswa belum mendapatkan Module</label>
                                        </div>
                                        <BsBookHalf
                                            className='h-16 w-16 text-white mr-4'
                                        />
                                    </div>
                                    <div onClick={()=>getStudyModule()} className='w-full border-t h-8 flex justify-center items-center hover:cursor-pointer'>
                                        <label
                                            className='font-medium text-sm text-white hover:cursor-pointer'
                                        >Lihat data</label>
                                    </div>
                                </div>
                            ) : null
                        }
                        {
                            token?.userType === "admin" ? ( 
                                <div className='w-full flex flex-col h-36 rounded-lg shadow-md justify-between bg-purple-300'>
                                    <div className='flex items-center '>
                                        <div className='w-full flex flex-col m-4'>
                                            <label className='font-semibold text-3xl text-white'>{total.studentWillFinish}</label>
                                            <label className='text-white text-sm'>Siswa akan menyelesaikan bimbingan</label>
                                        </div>
                                        <BsClockFill
                                            className='h-16 w-16 text-white mr-4'
                                        />
                                    </div>
                                    <div onClick={()=>getStudyFinish()} className='w-full border-t h-8 flex justify-center items-center hover:cursor-pointer'>
                                        <label
                                            className='font-medium text-sm text-white hover:cursor-pointer'
                                        >Lihat data</label>
                                    </div>
                                </div>
                            ) : null
                        }
                        
                        <ModalForm
                            title=''
                            visible={modalFormRecordMateri.visible}
                            onClose={()=>setModalFormRecordMateri(state=>({
                                ...state,
                                visible: false
                            }))}
                        >
                            <RecordMateri 
                                recordMateri={recordMateri}
                            />
                        </ModalForm>
                        <ModalForm
                            title=''
                            visible={modalFormStudyGroup.visible}
                            onClose={()=>setModalFormStudyGroup(state=>({
                                ...state,
                                visible: false
                            }))}
                        >
                            <StudyGroup 
                                studyGroup={studyGroup}
                            />
                        </ModalForm>
                        <ModalForm
                            title=''
                            visible={modalFormStudyModule.visible}
                            onClose={()=>setModalFormStudyModule(state=>({
                                ...state,
                                visible: false
                            }))}
                        >
                            <StudyModule 
                                studyModule={studyModule}
                            />
                        </ModalForm>
                        <ModalForm
                            title=''
                            visible={modalFormStudySchedule.visible}
                            onClose={()=>setModalFormStudySchedule(state=>({
                                ...state,
                                visible: false
                            }))}
                        >
                            <StudySchedule
                                studySchedule={studySchedule}
                            />
                        </ModalForm>
                        <ModalForm
                            title=''
                            visible={modalFormStudentWillFinish.visible}
                            onClose={()=>setModalFormStudentWillFinish(state=>({
                                ...state,
                                visible: false
                            }))}
                        >
                            <StudyWillFInish
                                studentWillFinish={studentWillFinish}
                            />
                        </ModalForm>
                    </div>
                )
            }
        </div>
    )
}

export default HomePage