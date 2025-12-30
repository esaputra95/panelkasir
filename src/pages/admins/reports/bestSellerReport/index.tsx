import CommonReportFilter from '../components/CommonReportFilter'
import CommonReportData from '../components/CommonReportData'
import useBestSellerReport from '../../../../hooks/slices/reports/useBestSellerReport'

const BestSellerReportPage = () => {
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
	} = useBestSellerReport();

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
				headers={['No', 'Kode', 'Product', 'Category', 'Image', 'Unit', 'Quantity']}
			/>
		</div>
	)
}

export default BestSellerReportPage;
