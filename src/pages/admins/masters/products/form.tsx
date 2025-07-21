import { FC } from 'react'
import { 
    InputText, 
    Button, 
    SelectOption, 
    LabelInput 
} from '../../../../components/input';
import { ProductFormProps } from '../../../../interfaces/masters/ProductInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';
import { Controller } from 'react-hook-form';
import InputNumeric from '../../../../components/input/inputNumeric';
import AsyncSelect from 'react-select/async';
import { useProductCategory } from '../../../../hooks/slices/masters/useProductCategory';
import { OptionSelectInterface } from '../../../../interfaces/globalInterface';
import { BsFillTrashFill } from "react-icons/bs";

const FormProduct: FC<ProductFormProps> = (props) => {
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
        fieldSettingPoints,
        appendSettingPoints,
        appendSettingPackages,
        setValue,
        watch
    } = props;
    const {t} = useTranslation();

    const { optionProductCategory } = useProductCategory();
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col '>
                <div className='grid grid-cols-2 gap-4'>
                    <InputText
                        {...register("code")}
                        errors={errors.code?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("code")} 
                    />
                    <InputText
                        {...register("name")}
                        errors={errors.name?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("name")} 
                    />
                    <div className='w-full'>
                        <LabelInput>{t("product-categories")}</LabelInput>
                        <Controller
                            name="productCategoryOption"
                            control={control}
                                render={({ field }) => 
                                <AsyncSelect 
                                    {...field}
                                    isDisabled={idDetail?true:false}
                                    placeholder='Pilih...'
                                    defaultOptions
                                    onChange={(e)=> (
                                        handleOnChange('productCategoryId', e as OptionSelectInterface)
                                    )}
                                    loadOptions={optionProductCategory}
                                    ref={(ref)=>ref}
                                />
                            }
                        />
                        <span className='text-red-300'>
                        {
                            errors.productCategoryId?.message
                        }
                        </span>
                    </div>
                    <SelectOption
                        {...register('type')}
                        label={t('type-product')}
                        option={[
                            {label:'Item', value:'item'},
                            {label:'Paket', value:'package'},
                        ]}
                        errors={errors.type?.message}
                    />
                    <Controller
                        name="purchasePrice"
                        control={control}
                        render={({ field: { ref, value, onChange} }) => (
                            <InputNumeric
                                label={t("purchase-price")}
                                ref={ref}
                                value={value}
                                onChange={(e)=>{
                                    return onChange(e.target.value.replace(/\./g, ''))
                                }}
                                groupSeparator='.'
                                decimalSeparator=','
                                error={errors.purchasePrice?.message}
                            />
                        )}
                    />
                    <Controller
                        name="sellingPrice"
                        control={control}
                        render={({ field: { ref, onChange, value } }) => (
                            <InputNumeric
                                label={t("selling-price")}
                                ref={ref}
                                value={value}
                                onChange={(e)=>{
                                    return onChange(e.target.value.replace(/\./g, ''))
                                }}
                                groupSeparator='.'
                                decimalSeparator=','
                                error={errors.sellingPrice?.message}
                            />
                        )}
                    />
                    <InputText
                        {...register("description")}
                        errors={errors.description?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("description")} 
                    />
                </div>
            </div>
            {
                watch('type') === 'package' ? (
                    <>
                        <div className=' border-gray-500 border-b mt-4' />
                        <div className='mt-4'>
                            <div className='flex justify-between'>
                                <label className='font-semibold text-sm'>{t("set product package")}</label>
                                <Button 
                                    type='button' 
                                    onClick={()=> appendSettingPackages({productId:0, quantity: 0})}
                                >
                                    +
                                </Button>
                            </div>
                            
                        </div> 
                    </>
                ) : null
            }
            <div className=' border-gray-500 border-b mt-4' />
            <div className='mt-4 space-y-2'>
                <div className='flex justify-between'>
                    <label className='font-semibold text-sm'>{t("set product points")}</label>
                    <Button 
                        type='button' 
                        onClick={()=> appendSettingPoints({agenTypeId:0, value: 0})}
                    >
                        +
                    </Button>
                </div>
                {
                    fieldSettingPoints.map((fields, index)=> (
                        <>
                            {
                                !watch(`settingPoints.${index}.delete`) ? (
                                    <div key={fields.id} className='flex items-center'>
                                    <InputText
                                        {...register(`settingPoints.${index}.value`)}
                                        errors={errors.settingPoints?.[index]?.value?.message} 
                                        readOnly={idDetail?true:false} 
                                    />
                                    <BsFillTrashFill 
                                        className='h-10 w-10 text-red-300' 
                                        onClick={()=>{
                                            if(watch(`settingPoints.${index}.id`)){
                                                setValue(`settingPoints.${index}.delete`, true)
                                            }
                                        }} 
                                    />
                                </div>
                                ) : null
                            }
                        </>
                    ))
                }
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

export default FormProduct