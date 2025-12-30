import CommonReportFilter from '../components/CommonReportFilter'
import CommonReportData from '../components/CommonReportData'
import useStockOpnameReport from '../../../../hooks/slices/reports/useStockOpnameReport'

const StockOpnameReportPage = () => {
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
	} = useStockOpnameReport();

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
				headers={['no', 'date', 'invoice', 'store', 'product', 'system-stock', 'actual-stock', 'difference', 'status']}
			/>
		</div>
	)
}

export default StockOpnameReportPage;
