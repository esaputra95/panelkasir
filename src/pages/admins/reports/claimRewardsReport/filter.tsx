import { FC } from 'react'
import { ClaimRewardsReportFilter } from '../../../../interfaces/reports/ClaimRewardsReportInterface'
import { Button, InputText, LabelInput } from '../../../../components/input'
import { t } from 'i18next'
import { Controller } from 'react-hook-form'
import AsyncSelect from 'react-select/async';
import { BsDownload } from "react-icons/bs";
import Spinner from '../../../../components/ui/Spinner'
import { useUser } from '../../../../hooks/fetch/settings/useUser'

const Filter: FC<ClaimRewardsReportFilter> = (props) => {
    const {
        register,
        control,
        onSubmit,
        handleSubmit,
        onDownload,
        isLoadingMutate
    } = props

    const {optionUser} = useUser();
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
                <div className='w-full'>
                    <LabelInput>
                        {t('users')}
                    </LabelInput>
                    <Controller
                        name={`user`}
                        control={control}
                            render={({ field }) => 
                            <AsyncSelect
                                className='w-full'
                                {...field}
                                cacheOptions
                                loadOptions={optionUser}
                                defaultOptions
                                placeholder={``}
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