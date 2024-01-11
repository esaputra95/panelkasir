import { FC } from 'react'
import { StudentReportFilter } from '../../../../interfaces/reports/StudentReportInterface'
import { Button, InputText, SelectOption } from '../../../../components/input'
import { t } from 'i18next'
import { BsDownload } from "react-icons/bs";
import Spinner from '../../../../components/ui/Spinner';

const Filter: FC<StudentReportFilter> = (props) => {
    const {
        register,
        onSubmit,
        handleSubmit,
        onDownload,
        isLoadingMutate
    } = props
    return (
        <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
            <div className='w-full grid grid-cols-3 gap-2'>
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
                <SelectOption 
                    {...register('status')}
                    option={[
                        {label: t('active'), value:'1'},
                        {label: t('in-active'), value:'0'},
                    ]}
                    label={t('status')}
                />
            </div>
            <div className='w-full flex justify-end mt-4 mb-4 gap-4'>
                <Button 
                    type='button'
                    variant='success'
                    onClick={handleSubmit(onDownload)}
                >
                    {
                        isLoadingMutate ? <Spinner /> : <BsDownload/>
                    }
                </Button>
                <Button 
                    type='submit'
                >
                    {
                        isLoadingMutate ? <Spinner /> : t('view-data')
                    }
                </Button>
            </div>
        </form>
    )
}

export default Filter