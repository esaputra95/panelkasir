import Filter from './filter'
import useClaimRewardsReport from '../../../../hooks/fetch/reports/useClaimRewardsReport'
// import { useTutor } from '../../../../hooks/fetch/mast';
import Data from './data';

const ClaimRewardsReportPage = () => {
	const {
		register,
		control,
		handleSubmit,
		onSubmit,
		dataClaimRewardsReport,
		onDownload,
		isLoadingMutate
	} = useClaimRewardsReport();

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
				dataClaimRewardsReport={dataClaimRewardsReport} 
			/>
		</div>
	)
}

export default ClaimRewardsReportPage;