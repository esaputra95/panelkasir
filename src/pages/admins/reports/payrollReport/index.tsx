import Filter from './filter'
import usePayrollReport from '../../../../hooks/fetch/reports/usePayrollReport'
import { useTutor } from '../../../../hooks/fetch/master/useTutor';
import Data from './data';

const PayrollReportPage = () => {
	const {
		register,
		control,
		handleSubmit,
		onSubmit,
		dataPayrollReport,
		onDownload,
		isLoadingMutate
	} = usePayrollReport();

	const {
		optionTutor
	} = useTutor()
	return (
		<div className='w-full'>
			<Filter
				register={register}
				optionTutor={optionTutor}
				control={control}
				onSubmit={onSubmit}
				handleSubmit={handleSubmit}
				onDownload={onDownload}
				isLoadingMutate={isLoadingMutate}
			/>
			<Data
				dataPayrollReport={dataPayrollReport} 
			/>
		</div>
	)
}

export default PayrollReportPage;