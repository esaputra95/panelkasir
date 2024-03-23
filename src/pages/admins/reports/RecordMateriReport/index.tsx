import Filter from './filter'
import useRecordMateriReport from '../../../../hooks/fetch/reports/useRecordMateriReport'
import { useTutor } from '../../../../hooks/fetch/master/useTutor';
import Data from './data';
import { useStudent } from '../../../../hooks/fetch/master/useStudent';
import { useCourse } from '../../../../hooks/fetch/master/useCourse';

const RecordMateriReportPage = () => {
	const {
		register,
		control,
		handleSubmit,
		onSubmit,
		dataRecordMateriReport,
		onDownload,
		getValues
	} = useRecordMateriReport();

	const {
		optionTutor
	} = useTutor();

	const {
		optionStudentAll
	} = useStudent();

	const {
		optionCourse
	} = useCourse()

	return (
		<div className='w-full'>
			<Filter
				register={register}
				optionTutor={optionTutor}
				control={control}
				onSubmit={onSubmit}
				handleSubmit={handleSubmit}
				onDownload={onDownload}
				optionCourse={optionCourse}
				optionStudentAll={optionStudentAll}
			/>
			<Data
				dataRecordMateriReport={dataRecordMateriReport} 
				getValues={getValues}
			/>
		</div>
	)
}

export default RecordMateriReportPage;