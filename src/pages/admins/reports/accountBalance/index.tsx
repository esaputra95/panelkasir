import CommonReportFilter from '../components/CommonReportFilter'
import CommonReportData from '../components/CommonReportData'
import useAccountBalanceReport from '../../../../hooks/slices/reports/useAccountBalanceReport'

const AccountBalanceReportPage = () => {
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
	} = useAccountBalanceReport();

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
                headers={['no', 'account', 'balance']}
			/>
		</div>
	)
}

export default AccountBalanceReportPage;
