import Filter from './filter'
import useUserPointsReport from '../../../../hooks/fetch/reports/useUserPointsReport'
import Data from './data';

const UserPointsReportPage = () => {
	const {
		register,
		control,
		handleSubmit,
		onSubmit,
		dataUserPointsReport,
		onDownload,
		isLoadingMutate
	} = useUserPointsReport();
	
	return (
		<div className='w-full'>
			<Filter
				register={register}
				// optionTutor={optionTutor}
				control={control}
				onSubmit={onSubmit}
				handleSubmit={handleSubmit}
				onDownload={onDownload}
				isLoadingMutate={isLoadingMutate}
			/>
			<Data
				dataUserPointsReport={dataUserPointsReport} 
			/>
		</div>
	)
}

export default UserPointsReportPage;