import { FC } from 'react'
import { DonationReportFilter } from '../../../../interfaces/reports/DonationReport'
import { Button, InputText, SelectOption } from '../../../../components/input'
import { t } from 'i18next'
import { BsDownload } from "react-icons/bs";
import Spinner from '../../../../components/ui/Spinner'

const Filter: FC<DonationReportFilter> = (props) => {
    const {
        register,
        onSubmit,
        handleSubmit,
        onDownload,
        isLoadingMutate
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
                <SelectOption
                    label='Status'
                    {...register('status')}
                    option={[
                        {value: 'open', label: 'Open'},
                        {value: 'fulfilled', label: 'Fulfilled'},
                        {value: 'closed', label: 'Closed'},
                    ]}
                />
            </div>
            <div className='w-full flex justify-end mt-4 mb-4 gap-4'>
                <Button 
                    type='button'
                    variant='success'
                    onClick={handleSubmit(onDownload)}
                    disabled={isLoadingMutate? true : false}
                >
                    {
                        isLoadingMutate ? 
                        <Spinner /> : <BsDownload/>
                    }
                    
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