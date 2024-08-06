import { FC } from 'react'
import { InputText, Button, LabelInput } from '../../../../components/input';
import { RewardFormProps } from '../../../../interfaces/masters/RewardInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { useAgenType } from '../../../../hooks/fetch/masters/useAgenType';
import { OptionSelectInterface } from '../../../../interfaces/globalInterface';

const FormReward: FC<RewardFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        idDetail,
        isLoadingMutate,
        control,
        handleOnChange,
        watch
    } = props;
    const {t} = useTranslation();

    const { optionAgenType, dataOptionAgenType } = useAgenType()
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col '>
                <div className='grid grid-cols-1 gap-4'>
                    <InputText
                        {...register("name")}
                        errors={errors.name?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("name")} 
                    />
                    <InputText
                        {...register("quantity")}
                        errors={errors.quantity?.message} 
                        readOnly={idDetail?true:false} 
                        type='number'
                        label={t("quantity")} 
                    />
                    <div className='w-full'>
                        <LabelInput>
                            {t('agen-types')}
                        </LabelInput>
                        <Controller
                            name={`agenTypeOption`}
                            control={control}
                                render={({ field }) => 
                                <AsyncSelect
                                    className='w-full'
                                    {...field}
                                    loadOptions={optionAgenType}
                                    isDisabled={idDetail? true : false}
                                    placeholder=''
                                    defaultOptions
                                    value={
                                        dataOptionAgenType.find(
                                            (e:OptionSelectInterface)=> e.value === watch(`agenTypeId`)
                                        )
                                    }
                                    onChange={(data)=> handleOnChange('agenTypeId', data as OptionSelectInterface )}
                                    ref={(ref)=> ref}
                                />
                            }
                        />
                        <span className='text-red-500 text-sm font-light'>
                        {
                            errors.agenTypeId?.message
                        }
                        </span>
                    </div>
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
                        disabled={isLoadingMutate?true:false} 
                        variant="primary" 
                        type='submit' 
                        size="medium" 
                        className='my-4' >
                            {t('save')} {isLoadingMutate?<Spinner />:null} {isLoadingMutate}
                    </Button>
                : null}
            </div>
        </form>
    )
}

export default FormReward