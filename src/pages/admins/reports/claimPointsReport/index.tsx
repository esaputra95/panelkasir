import Filter from './filter'
import useClaimPointsReport from '../../../../hooks/fetch/reports/useClaimPointsReport'
// import { useTutor } from '../../../../hooks/fetch/mast';
import Data from './data';

const ClaimPointsReportPage = () => {
	const {
		register,
		control,
		handleSubmit,
		onSubmit,
		dataClaimPointsReport,
		onDownload,
		isLoadingMutate
	} = useClaimPointsReport();

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
				dataClaimPointsReport={dataClaimPointsReport} 
			/>
		</div>
	)
}

export default ClaimPointsReportPage;