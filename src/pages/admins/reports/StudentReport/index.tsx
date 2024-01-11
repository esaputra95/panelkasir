import Filter from './filter'
import useStudentReport from '../../../../hooks/fetch/reports/useStudentReport'
import Data from './data';

const StudentReportPage = () => {
	const {
		register,
		control,
		handleSubmit,
		onSubmit,
		dataStudentReport,
		onDownload,
		isLoadingMutate
	} = useStudentReport();

	return (
		<div className='w-full'>
			<Filter
				register={register}
				control={control}
				onSubmit={onSubmit}
				handleSubmit={handleSubmit}
				onDownload={onDownload}
				isLoadingMutate={isLoadingMutate}
			/>
			<Data
				dataStudentReport={dataStudentReport} 
			/>
		</div>
	)
}

export default StudentReportPage;