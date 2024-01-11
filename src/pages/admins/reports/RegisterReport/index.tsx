import Filter from './filter'
import useRegisterReport from '../../../../hooks/fetch/reports/useRegisterReport'
import Data from './data';

const RegisterReportPage = () => {
	const {
		register,
		control,
		handleSubmit,
		onSubmit,
		dataRegisterReport,
		onDownload,
		isLoadingMutate
	} = useRegisterReport();

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
				dataRegisterReport={dataRegisterReport} 
			/>
		</div>
	)
}

export default RegisterReportPage;