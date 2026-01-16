import { FC, useEffect } from 'react'
import { InputText, Button, SelectOption, LabelInput } from '../../../../components/input';
import { StoreSubscriptionFormProps } from '../../../../interfaces/settings/StoreSubscriptionInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import useStore from '../../../../hooks/slices/masters/useStore';

const FormStoreSubscription: FC<StoreSubscriptionFormProps> = (props) => {
    const {t} = useTranslation()
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        isLoading,
        idDetail,
        control,
        watch,
        setValue
    } = props;

    const { optionStore, dataOptionStore } = useStore();

    const getLabel = (value: string): string => {
        const found = dataOptionStore?.find((item) => item.value === value);
        return found?.label || '';
    };

    // Calculate end date based on start date and duration
    const watchStartDate = watch('startDate');
    const watchDuration = watch('durationMonth');
    const watchType = watch('type');

    useEffect(() => {
        if (watchStartDate && watchDuration) {
            const startDate = new Date(watchStartDate);
            const endDate = new Date(startDate);
            endDate.setMonth(endDate.getMonth() + parseInt(watchDuration.toString()));
            setValue('endDate', endDate.toISOString().split('T')[0]);
        }
    }, [watchStartDate, watchDuration, setValue]);

    // Auto-set duration based on type
    useEffect(() => {
        if (watchType === 'TRIAL') {
            setValue('durationMonth', 1);
        } else if (watchType === 'PAID') {
            setValue('durationMonth', 1);
        } else if (watchType === 'yearly') {
            setValue('durationMonth', 12);
        }
    }, [watchType, setValue]);

    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col space-y-4'>
                <div className='w-full'>
                    <LabelInput>{t("store")}</LabelInput>
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
                                placeholder={t("select-store")}
                                isDisabled={idDetail ? true : false}
                                onChange={(val) => field.onChange(val?.value)}
                            />
                        )}
                    />
                    {errors.storeId && <p className='text-red-500 text-xs mt-1'>{errors.storeId.message}</p>}
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <SelectOption
                        {...register('type')}
                        label={t('type')}
                        option={[
                            {label: 'Trial', value: 'TRIAL'},
                            {label: 'Bayar', value: 'PAID'},
                        ]}
                        errors={errors.type?.message}
                        disabled={idDetail ? true : false}
                    />

                    <InputText
                        {...register("startDate")}
                        errors={errors.startDate?.message} 
                        readOnly={idDetail?true:false} 
                        type='date'
                        label={t("start-date")} 
                    />

                    <InputText
                        {...register("endDate")}
                        errors={errors.endDate?.message} 
                        readOnly={true}
                        type='date'
                        label={t("end-date")} 
                    />

                    <InputText
                        {...register("durationMonth")}
                        errors={errors.durationMonth?.message} 
                        readOnly={idDetail?true:false} 
                        type='number'
                        label={t("duration-month")} 
                    />

                    <InputText
                        {...register("price")}
                        errors={errors.price?.message} 
                        readOnly={idDetail?true:false} 
                        type='number'
                        step="0.01"
                        label={t("price")} 
                    />

                    <SelectOption
                        {...register('status')}
                        label={t('status')}
                        option={[
                            {label: 'Active', value: 'ACTIVE'},
                            {label: 'Expired', value: 'EXPIRED'},
                            {label: 'Cancelled', value: 'CANCELLED'},
                        ]}
                        errors={errors.status?.message}
                        disabled={idDetail ? true : false}
                    />
                    
                    <InputText
                        {...register("paymentRef")}
                        errors={errors.paymentRef?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("payment-reference")} 
                    />
                </div>
                
            </div>
            <div className='w-full flex justify-end space-x-2 mt-6'>
                <Button
                    type='button'
                    variant="error"
                    onClick={onCancel}
                    size="medium"
                >
                    {t("cancel")}
                </Button>
                {!idDetail ? 
                    <Button 
                        disabled={isLoading?true:false} 
                        variant="primary" 
                        type='submit' 
                        size="medium" 
                    >
                        {t('save')} {isLoading?<Spinner />:null}
                    </Button>
                : null}
            </div>
        </form>
    )
}

export default FormStoreSubscription
