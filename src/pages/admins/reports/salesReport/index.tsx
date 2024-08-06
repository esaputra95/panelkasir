import Filter from './filter'
import useSalesReport from '../../../../hooks/fetch/reports/useSalesReport'
// import { useTutor } from '../../../../hooks/fetch/mast';
import Data from './data';

const SalesReportPage = () => {
	const {
		register,
		control,
		handleSubmit,
		onSubmit,
		dataSalesReport,
		onDownload,
		isLoadingMutate,
		isLoadingMutateExcel,
		onExcel
	} = useSalesReport();

	// const {
	// 	optionTutor
	// } = useTutor()
	return (
		<div className='w-full'>
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
				dataSalesReport={dataSalesReport} 
			/>
		</div>
	)
}

export default SalesReportPage;