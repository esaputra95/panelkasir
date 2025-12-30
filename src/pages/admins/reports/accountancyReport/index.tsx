import CommonReportFilter from '../components/CommonReportFilter'
import CommonReportData from '../components/CommonReportData'
import useAccountancyReport from '../../../../hooks/slices/reports/useAccountancyReport'

const AccountancyReportPage = () => {
	const {
		register,
		control,
		handleSubmit,
		onSubmit,
		dataReport,
		onDownload,
		isLoadingMutate,
		isLoadingMutateExcel,
		onExcel
	} = useAccountancyReport();

	return (
		<div className='w-full p-2 bg-white'>
			<CommonReportFilter
				register={register}
				control={control}
				onSubmit={onSubmit}
				handleSubmit={handleSubmit}
				onDownload={onDownload}
				isLoadingMutate={isLoadingMutate}
				isLoadingMutateExcel={isLoadingMutateExcel}
				onExcel={onExcel}
			/>
			<CommonReportData
				data={dataReport}
				headers={['no', 'date', 'account', 'debit', 'credit']}
			/>
		</div>
	)
}

export default AccountancyReportPage;
