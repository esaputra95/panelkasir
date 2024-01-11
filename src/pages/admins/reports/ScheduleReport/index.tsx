import Filter from './filter'
import useScheduleReport from '../../../../hooks/fetch/reports/useScheduleReport'
import Data from './data';

const ScheduleReportPage = () => {
	const {
		register,
		control,
		handleSubmit,
		onSubmit,
		dataScheduleReport,
		onDownload,
		isLoadingMutate
	} = useScheduleReport();

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
				dataScheduleReport={dataScheduleReport} 
			/>
		</div>
	)
}

export default ScheduleReportPage;