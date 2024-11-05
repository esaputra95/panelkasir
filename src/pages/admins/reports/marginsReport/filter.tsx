import { FC } from 'react'
import { MarginsReportFilter } from '../../../../interfaces/reports/MarginsReportInterface'
import { 
    Button,
    InputText,
} from '../../../../components/input'
import { t } from 'i18next'
import { 
    AiFillFileExcel,
    AiFillFilePdf
} from "react-icons/ai";
import Spinner from '../../../../components/ui/Spinner'

const Filter: FC<MarginsReportFilter> = (props) => {
    const {
        register,
        onSubmit,
        handleSubmit,
        onDownload,
        isLoadingMutate,
        isLoadingMutateExcel,
        onExcel
    } = props

    return (
        <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
            <div className='w-full flex flex-col lg:grid lg:grid-cols-3 lg:gap-2'>
                <InputText
                    {...register('startDate')}
                    type='date'
                    label={t('start-date')}
                />
                <InputText
                    {...register('endDate')}
                    type='date'
                    label={t('until-date')}
                />
            </div>
            <div className='w-full flex justify-end mt-4 mb-4 gap-4'>
                <Button 
                    type='button'
                    variant='alternative'
                    className='border-red-400 hover:bg-red-50'
                    onClick={handleSubmit(onDownload)}
                    disabled={isLoadingMutate? true : false}
                >
                    {
                        isLoadingMutate ? 
                        <Spinner /> : <AiFillFilePdf className='text-red-400'/>
                    }
                    <label className='text-red-400'>Pdf</label>
                </Button>
                <Button 
                    type='button'
                    variant='alternative'
                    className='border-green-500 hover:bg-green-50'
                    onClick={handleSubmit(onExcel)}
                    disabled={isLoadingMutate? true : false}
                >
                    {
                        isLoadingMutateExcel ? 
                        <Spinner /> : <AiFillFileExcel className='text-green-500' size={20} />
                    }
                    <label className='text-green-500'>Excel</label>
                </Button>
                <Button 
                    type='submit'
                    disabled={isLoadingMutate? true : false}
                >
                    {
                        isLoadingMutate ? 
                        <Spinner /> : t('view-data')
                    }
                </Button>
            </div>
        </form>
    )
}

export default Filter