import Filter from './filter'
import usePointsReport from '../../../../hooks/fetch/reports/usePointsReport'
// import { useTutor } from '../../../../hooks/fetch/mast';
import Data from './data';

const PointsReportPage = () => {
	const {
		register,
		control,
		handleSubmit,
		onSubmit,
		dataPointsReport,
		onDownload,
		isLoadingMutate
	} = usePointsReport();

	// const {
	// 	optionTutor
	// } = useTutor()
	return (
		<div className='w-full'>
			<Filter
				register={register}
				// optionTutor={optionTutor}
				control={control}
				onSubmit={onSubmit}
				handleSubmit={handleSubmit}
				onDownload={onDownload}
				isLoadingMutate={isLoadingMutate}
			/>
			<Data
				dataPointsReport={dataPointsReport} 
			/>
		</div>
	)
}

export default PointsReportPage;