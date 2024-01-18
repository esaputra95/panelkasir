import { FC } from 'react'
import { PayrollReportFilter } from '../../../../interfaces/reports/payrollReportInterface'
import { Button, InputText, LabelInput } from '../../../../components/input'
import { t } from 'i18next'
import { Controller } from 'react-hook-form'
import AsyncSelect from 'react-select/async';
import { BsDownload } from "react-icons/bs";
import Spinner from '../../../../components/ui/Spinner'

const Filter: FC<PayrollReportFilter> = (props) => {
    const {
        register,
        optionTutor,
        control,
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
                <div className='w-full'>
                    <LabelInput>
                        {t('tutors')}
                    </LabelInput>
                    <Controller
                        name={`tentor`}
                        control={control}
                            render={({ field }) => 
                            <AsyncSelect
                                className='w-full'
                                {...field}
                                cacheOptions
                                loadOptions={optionTutor}
                                defaultOptions
                                placeholder={`${t('all')}...`}
                                ref={(ref)=> ref}
                            />
                        }
                    />
                </div>
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