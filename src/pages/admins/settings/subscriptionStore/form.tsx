import { FC } from 'react'
import { InputText, Button, LabelInput } from '../../../../components/input';
import { SubscriptionStoreFormProps } from '../../../../interfaces/settings/SubscriptionStoreInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';
import AsyncSelect from 'react-select/async';
import useStore from '../../../../hooks/slices/masters/useStore';
import { Controller } from 'react-hook-form';

const FormSubscriptionStore: FC<SubscriptionStoreFormProps> = (props) => {
    const {t} = useTranslation()
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        isLoading,
        idDetail,
        control
    } = props;

	const {optionStore, dataOptionStore} = useStore()


    const getLabel = (value: string): string => {
        const found = dataOptionStore?.find((item) => item.value === value);
        return found?.label || '';
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col h-72 space-y-6'>
                <div>
                    <div>
                        <LabelInput>Nama Toko</LabelInput>
                    </div>
                    <Controller
                        name="storeId"
                        control={control}
                        render={({ field }) => (
                            <AsyncSelect
                                className='w-full'
                                cacheOptions
                                loadOptions={optionStore}
                                defaultOptions
                                value={field.value ? { label: getLabel(field.value), value: field.value } : null}
                                placeholder="Pilih Toko"
                                ref={(ref)=> ref}
                                onChange={(val) => field.onChange(val?.value)}
                            />
                        )}
                    />
                    <div>
                        <label className='text-red-500 text-sm font-light'>
                            {errors?.storeId?.message}
                        </label>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <InputText
                        {...register("startDate")}
                        type='date'
                        errors={errors.startDate?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("start-date")} 
                    />
                    
                    <InputText
                        {...register("endDate")}
                        type='date'
                        errors={errors.endDate?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("until-date")} 
                    />
                    
                </div>
            </div>
            <div className='w-full flex justify-end space-x-2'>
                <Button
                    type='button'
                    variant="error"
                    onClick={onCancel}
                    size="medium"
                    className='my-4' >
                        {t("cancel")}
                    </Button>
                {!idDetail ? 
                    <Button 
                        disabled={isLoading?true:false} 
                        variant="primary" 
                        type='submit' 
                        size="medium" 
                        className='my-4' >
                            {t('save')} {isLoading?<Spinner />:null}
                    </Button>
                : null}
            </div>
        </form>
    )
}

export default FormSubscriptionStore