import Filter from './filter'
import useSubscriptionReport from '../../../../hooks/slices/reports/useSubscriptionReport'
import Data from './data';

const SubscriptionReportPage = () => {
	const {
		register,
		control,
		handleSubmit,
		onSubmit,
		dataSubscriptionReport,
		onDownload,
		isLoadingMutate,
		isLoadingMutateExcel,
		onExcel
	} = useSubscriptionReport();

	return (
		<div className='w-full p-2 bg-white'>
			<Filter
				register={register}
				control={control}
				onSubmit={onSubmit}
				handleSubmit={handleSubmit}
				onDownload={onDownload}
				isLoadingMutate={isLoadingMutate}
				isLoadingMutateExcel={isLoadingMutateExcel}
				onExcel={onExcel}
			/>
			<Data
				dataSubscriptionReport={dataSubscriptionReport} 
			/>
		</div>
	)
}

export default SubscriptionReportPage;
