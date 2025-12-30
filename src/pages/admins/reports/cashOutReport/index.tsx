import CommonReportFilter from '../components/CommonReportFilter'
import CommonReportData from '../components/CommonReportData'
import useCashOutReport from '../../../../hooks/slices/reports/useCashOutReport'

const CashOutReportPage = () => {
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
	} = useCashOutReport();

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
                headers={['no', 'date', 'account', 'amount', 'description']}
			/>
		</div>
	)
}

export default CashOutReportPage;
