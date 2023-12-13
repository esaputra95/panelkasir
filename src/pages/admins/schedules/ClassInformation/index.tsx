import Filter from './Filter'
import { useClassInformation } from '../../../../hooks/fetch/schedule/useClassInformation'
import { useTutor } from '../../../../hooks/fetch/master/useTutor'
import TableClassInformation from './Table'

const ClassInformationPage = () => {
    const {
        handleOnChange,
        query,
        handleOnSearch,
        dataClassInformation
    } = useClassInformation()

    const {
        optionTutor,
        dataOptionTutor
    } = useTutor()

    return (
        <div className='w-full'>
            <Filter
                handleOnChange={handleOnChange}
                query={query}
                optionTutor={optionTutor}
                dataOptionTutor={dataOptionTutor}
                handleOnSearch={handleOnSearch}
            />
            <TableClassInformation 
                dataClassInformation={dataClassInformation}
            />
        </div>
    )
}

export default ClassInformationPage