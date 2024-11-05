import Filter from './filter'
import useMarginsReport from '../../../../hooks/slices/reports/useMarginsReport'
// import { useTutor } from '../../../../hooks/slices/mast';
import Data from './data';

const MarginsReportPage = () => {
	const {
		register,
		control,
		handleSubmit,
		onSubmit,
		dataMarginsReport,
		onDownload,
		isLoadingMutate,
		isLoadingMutateExcel,
		onExcel
	} = useMarginsReport();

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
				dataMarginsReport={dataMarginsReport} 
			/>
		</div>
	)
}

export default MarginsReportPage;