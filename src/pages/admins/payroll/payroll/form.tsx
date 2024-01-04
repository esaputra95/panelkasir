import { FC } from 'react'
import { Button, InputText, LabelInput } from '../../../../components/input';
import { PayrollFormProps } from '../../../../interfaces/payroll/payrollInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import InputNumeric from '../../../../components/input/inputNumeric';
import { BsArrowClockwise } from "react-icons/bs";
import { SingleValue } from 'react-select';
import { OptionSelectInterface } from '../../../../interfaces/globalInterface';

const FormPayroll: FC<PayrollFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        isLoading,
        idDetail,
        control,
        optionTutor,
        getValues,
        dataOptionTutor,
        getPayrollSession,
        handleOnChange,
        fields,
        handleOnChangeText
    } = props;
    const {t} = useTranslation()
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 gap-4'>
                
                <div className='w-full'>
                    <InputText
                        {...register('month')}
                        label={t('month')}
                        type='month'
                        readOnly={idDetail?true:false}
                    />
                </div>
                <div className='w-full'>
                    <LabelInput>{t("tutors")}</LabelInput>
                    <Controller
                        name="userId"
                        control={control}
                            render={({ field }) => 
                            <AsyncSelect 
                                className='w-full'
                                {...field}
                                isDisabled={idDetail?true:false}
                                cacheOptions
                                defaultOptions
                                loadOptions={optionTutor}
                                placeholder='Select...'
                                onChange={
                                    (data: SingleValue<OptionSelectInterface>)=>
                                        handleOnChange(data)
                                }
                                value={ dataOptionTutor.filter(value=> 
                                    value.value === getValues(`userId`)
                                )
                            }
                                ref={(ref)=>ref}
                            />
                        }
                    />
                    <span className='text-red-300'>
                    {
                        errors.userId?.message
                    }
                    </span>
                </div>
                <div className='w-full'>
                    <LabelInput>{t("basic-salary")}</LabelInput>
                    <Controller
                        name="basicSalary"
                        control={control}
                        render={({ field: { ref, ...rest } }) => (
                        <InputNumeric
                            thousandSeparator=','
                            decimalSeparator='.'
                            readOnly={idDetail?true:false}
                            getInputRef={ref}
                            onValueChange={(value)=> {
                                handleOnChangeText('basicSalary', value)
                            }}
                            {...rest}
                        />
                        )}
                    />
                    <span className='text-red-300'>
                    {
                        errors.userId?.message
                    }
                    </span>
                </div>
                <div className='w-full'>
                    <LabelInput>{t("session-salary")}</LabelInput>
                    <Controller
                        name="sessionSalary"
                        control={control}
                        render={({ field: { ref, ...rest } }) => (
                        <InputNumeric
                            thousandSeparator=','
                            decimalSeparator='.'
                            readOnly
                            getInputRef={ref}
                            {...rest}
                        />
                        )}
                    />
                    <span className='text-red-300'>
                    {
                        errors.userId?.message
                    }
                    </span>
                </div>
                <div className='w-full'>
                    <LabelInput>{t("total")}</LabelInput>
                    <Controller
                        name="total"
                        control={control}
                        render={({ field: { ref, ...rest } }) => (
                        <InputNumeric
                            thousandSeparator=','
                            decimalSeparator='.'
                            getInputRef={ref}
                            {...rest}
                        />
                        )}
                    />
                    <span className='text-red-300'>
                    {
                        errors.userId?.message
                    }
                    </span>
                </div>
            </div>
            <div className="w-full flex justify-end items-center">
                <label className='text-xs text-gray-600 mr-2'>
                    {t("Press this button to calculate the salary for teaching sessions")}
                </label>
                <Button 
                    variant="success" 
                    type='button'
                    onClick={()=> getPayrollSession(getValues('userId'), getValues('month')??'')}
                    className='my-4' >

                        {isLoading?<Spinner />:<BsArrowClockwise className='h-6 w-6' />}
                </Button>
            </div>
            <div className='w-full'>
                <div className='w-full py-2'>
                    <label className='text-sm font-semibold'>{t('list of teaching times')}</label>
                </div>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th className='font-semibold text-sm'> {t('time')} </th>
                            <th> {t('price')} </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            fields.map((field, index)=> (
                                <tr key={field.id}>
                                    <td>
                                        <InputText 
                                            {...register(`payrollDetails.${index}.time`)}
                                            readOnly
                                        />
                                    </td>
                                    
                                    <td>
                                        <Controller
                                            name={`payrollDetails.${index}.price`}
                                            control={control}
                                            render={({ field: { ref, ...rest } }) => (
                                            <InputNumeric
                                                thousandSeparator=','
                                                decimalSeparator='.'
                                                readOnly
                                                getInputRef={ref}
                                                {...rest}
                                            />
                                            )}
                                        />
                                        <span className='text-red-300'>
                                        {
                                            errors.userId?.message
                                        }
                                        </span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
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

export default FormPayroll