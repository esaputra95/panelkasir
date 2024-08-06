import { FC } from 'react'
import { SalesReportFilter } from '../../../../interfaces/reports/SalesReportInterface'
import { 
    Button,
    InputText,
    LabelInput,
    SelectOption
} from '../../../../components/input'
import { t } from 'i18next'
import { Controller } from 'react-hook-form'
import AsyncSelect from 'react-select/async';
import { 
    AiFillFileExcel,
    AiFillFilePdf
} from "react-icons/ai";
import Spinner from '../../../../components/ui/Spinner'
import { useWarehouse } from '../../../../hooks/fetch/settings/useWarehouse'
import { useUser } from '../../../../hooks/fetch/settings/useUser'

const Filter: FC<SalesReportFilter> = (props) => {
    const {
        register,
        control,
        onSubmit,
        handleSubmit,
        onDownload,
        isLoadingMutate,
        isLoadingMutateExcel,
        onExcel
    } = props

    const {optionWarehouse} = useWarehouse();

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
                        {t('warehouses')}
                    </LabelInput>
                    <Controller
                        name={`warehouse`}
                        control={control}
                            render={({ field }) => 
                            <AsyncSelect
                                className='w-full'
                                {...field}
                                cacheOptions
                                loadOptions={optionWarehouse}
                                defaultOptions
                                placeholder={``}
                                ref={(ref)=> ref}
                            />
                        }
                    />
                </div>
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
                <SelectOption
                    label={t('status')}
                    {...register('status')}
                    option={[
                        {label: 'Dibuat', value:'create'},
                        {label: 'Dikirim', value:'sent'},
                        {label: 'Retur', value:'return'},
                        {label: 'Selesai', value:'finish'},
                    ]}
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