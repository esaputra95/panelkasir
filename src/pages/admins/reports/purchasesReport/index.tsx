import Filter from './filter'
import usePurchasesReport from '../../../../hooks/slices/reports/usePurcasesReport'
// import { useTutor } from '../../../../hooks/slices/mast';
import Data from './data';

const PurchasesReportPage = () => {
	const {
		register,
		control,
		handleSubmit,
		onSubmit,
		dataPurchasesReport,
		onDownload,
		isLoadingMutate,
		isLoadingMutateExcel,
		onExcel
	} = usePurchasesReport();

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
				dataPurchasesReport={dataPurchasesReport} 
			/>
		</div>
	)
}

export default PurchasesReportPage;