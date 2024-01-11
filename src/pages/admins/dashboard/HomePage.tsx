import useDashboard from '../../../hooks/fetch/useDashboard'
import useAccess from '../../../utils/useAccess';
import RecordMateri from './RecordMateri'
import StudyGroup from './StudyGroup'

const HomePage = () => {
    const {
        recordMateri,
        studyGroup
    } = useDashboard();

    const {
        token
    } = useAccess()
    return(
        <div className='w-full'>
            <div className='w-full grid grid-cols-2 gap-2'>
                <RecordMateri 
                    recordMateri={recordMateri}
                />
                {
                    token?.userType==="admin" ? (
                        <StudyGroup 
                            studyGroup={studyGroup}
                        /> 
                    ) : null
                }
            </div>
        </div>
    )
}

export default HomePage