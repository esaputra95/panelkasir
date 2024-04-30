import Filter from './filter'
import useDonationReport from '../../../../hooks/fetch/reports/useDonationReport'
import Data from './data';

const DonationReportPage = () => {
	const {
		register,
		control,
		handleSubmit,
		onSubmit,
		dataDonationReport,
		onDownload,
		isLoadingMutate
	} = useDonationReport();

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
				dataDonationReport={dataDonationReport} 
			/>
		</div>
	)
}

export default DonationReportPage;