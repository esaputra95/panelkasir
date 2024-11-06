import { InputText, Button, LabelInput, SelectOption } from '../../../../components/input';
import { useTranslation } from 'react-i18next';
import { useSaleForm } from '../../../../hooks/slices/sales/sales/useSaleForm';
import { useUser } from '../../../../hooks/slices/settings/useUser';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { useWarehouse } from '../../../../hooks/slices/settings/useWarehouse';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useProduct } from '../../../../hooks/slices/masters/useProduct';
import InputNumeric from '../../../../components/input/inputNumeric';
import { Link } from 'react-router-dom';
import { BsClipboard2CheckFill, BsDashCircle, BsFillPrinterFill } from "react-icons/bs";
import useAccess from '../../../../utils/useAccess';
import { useMember } from '../../../../hooks/slices/masters/useMember';

const FormSalePage = () => {
    const {t} = useTranslation();
    const { token } = useAccess()
    const {
        handleSubmit,
        register,
        errors,
        onSubmit,
        control,
        fields,
        watch,
        setValue,
        append,
        handleOnchangeDetail,
        idPrint,
        onPrint
    } = useSaleForm();

    const {
        optionUser,
        dataOptionUser
    } = useUser();

    const {
        optionWarehouse,
        dataOptionWarehouse
    } = useWarehouse();

    const {
        optionProduct,
        dataOptionProduct
    } = useProduct()

    const {
        dataOptionMember,
        optionMember
    } = useMember()

    let total=0;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col '>
                <div className='grid grid-cols-1 gap-4'>
                    <div className={`grid gap-2 ${token?.level === "admin" ? "grid-cols-6" : "grid-cols-5"}`}>
                        <InputText
                            {...register("invoice")}
                            errors={errors.invoice?.message} 
                            label={t("invoice")} 
                        />
                        <InputText
                            {...register("date")}
                            errors={errors.date?.message} 
                            label={t("date")} 
                            type='date'
                        />
                        {
                            token?.level === 'admin' ? (
                                <SelectOption
                                    label={t('status')}
                                    {...register('status')}
                                    option={[
                                        {value:'create', label: 'Dibuat'},
                                        {value:'sent', label: 'Dikirim'},
                                        {value:'return', label: 'Retur'},
                                        {value:'canceled', label: 'Dibatalkan'},
                                        {value:'finish', label: 'Selesai'},
                                    ]}
                                    errors={errors.status?.message}
                                />) 
                            : null
                        }
                        
                        <div className='w-full'>
                            <LabelInput>{t("seller")}</LabelInput>
                            <Controller
                                name="userOption"
                                control={control}
                                    render={({ field }) => 
                                    <AsyncSelect 
                                        {...field}
                                        placeholder=''
                                        defaultOptions
                                        loadOptions={optionUser}
                                        ref={(ref)=>ref}
                                        value={
                                            dataOptionUser?.find(
                                                e=> e.value === watch(`userId`)
                                            )
                                        }
                                        onChange={(e)=> setValue('userId', e?.value as number)}
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
                            <LabelInput>{t("warehouses")}</LabelInput>
                            <Controller
                                name="warehouseOption"
                                control={control}
                                    render={({ field }) => 
                                    <AsyncSelect 
                                        {...field}
                                        placeholder=''
                                        defaultOptions
                                        loadOptions={optionWarehouse}
                                        ref={(ref)=>ref}
                                        onChange={(e)=> setValue('warehouseId', e?.value as number)}
                                        value={
                                            dataOptionWarehouse?.find(
                                                e=> e.value === watch(`warehouseId`)
                                            )
                                        }
                                    />
                                }
                            />
                            <span className='text-red-300'>
                            {
                                errors.warehouseId?.message
                            }
                            </span>
                        </div>
                        <div className='w-full'>
                            <LabelInput>{t("members")}</LabelInput>
                            <Controller
                                name="memberOption"
                                control={control}
                                    render={({ field }) => 
                                    <AsyncSelect 
                                        {...field}
                                        placeholder=''
                                        defaultOptions
                                        loadOptions={optionMember}
                                        ref={(ref)=>ref}
                                        onChange={(e)=> setValue('memberId', e?.value as number)}
                                        value={
                                            dataOptionMember?.find(
                                                e=> e.value === watch(`memberId`)
                                            )
                                        }
                                    />
                                }
                            />
                            <span className='text-red-300'>
                            {
                                errors.memberId?.message
                            }
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className='w-full border-b border-gray-400 my-4' />
                        <div className='flex justify-between'>
                            <label className='text-sm font-semibold'>Daftar Product</label>
                            <Button type='button' onClick={()=> append({productId:0,quantity:1,sellingPrice:0})}>+</Button>
                        </div>
                        <table className='w-full text-sm text-left'>
                            <thead className='text- font-semibold text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                <tr>
                                    <td className='w-16 p-2'>No</td>
                                    <td className='w-5/12'>Product</td>
                                    <td className='w-1/12'>Jumlah</td>
                                    <td className='w-1/12'>Potongan</td>
                                    <td className='w-2/12'>Harga</td>
                                    <td className='w-2/12'>Total</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                fields.map((field, index)=> {
                                    total+= (
                                        watch(`saleDetails.${index}.sellingPrice`) ?? 1) * 
                                        (watch(`saleDetails.${index}.quantity`) ?? 1
                                    )
                                    if(!watch(`saleDetails.${index}.deleted`)){
                                        return(
                                            <tr 
                                                key={field.id} 
                                                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                                            >
                                                <td className='p-2'>{index+1}</td>
                                                <td>
                                                    <Controller
                                                        name={`saleDetails.${index}.productOption`}
                                                        control={control}
                                                            render={({ field }) => 
                                                            <AsyncSelect 
                                                                {...field}
                                                                placeholder=''
                                                                defaultOptions
                                                                loadOptions={optionProduct}
                                                                ref={(ref)=>ref}
                                                                onChange={(e)=> (
                                                                    handleOnchangeDetail(index, 'productId', e?.value as number)
                                                                )}
                                                                value={
                                                                    dataOptionProduct?.find(
                                                                        e=> e.value === watch(`saleDetails.${index}.productId`)
                                                                    )
                                                                }
                                                            />
                                                        }
                                                    />
                                                </td>
                                                <td className=''>
                                                    <Controller
                                                        name={`saleDetails.${index}.quantity`}
                                                        control={control}
                                                        render={({ field: { ref, value} }) => (
                                                            <InputNumeric
                                                                ref={ref}
                                                                value={value ?? 0}
                                                                onChange={(e)=>{
                                                                    handleOnchangeDetail(
                                                                        index, 
                                                                        'quantity', 
                                                                        parseInt((e.target.value??'0').replace(/\./g, ''))
                                                                    )
                                                                }}
                                                                groupSeparator='.'
                                                                decimalSeparator=','
                                                                error={errors.saleDetails?.message}
                                                            />
                                                        )}
                                                    />
                                                </td>
                                                <td className=''>
                                                    <Controller
                                                        name={`saleDetails.${index}.discount`}
                                                        control={control}
                                                        render={({ field: { ref, value, onChange} }) => (
                                                            <InputNumeric
                                                                ref={ref}
                                                                value={value ?? 0}
                                                                onChange={(e)=>{
                                                                    return onChange(e.target.value.replace(/\./g, ''))
                                                                }}
                                                                groupSeparator='.'
                                                                decimalSeparator=','
                                                                error={errors.saleDetails?.message}
                                                            />
                                                        )}
                                                    />
                                                </td>
                                                <td className=''>
                                                    <Controller
                                                        name={`saleDetails.${index}.sellingPrice`}
                                                        control={control}
                                                        render={({ field: { ref, value, onChange} }) => (
                                                            <InputNumeric
                                                                ref={ref}
                                                                value={value ?? 0}
                                                                onChange={(e)=>{
                                                                    return onChange(e.target.value.replace(/\./g, ''))
                                                                }}
                                                                groupSeparator='.'
                                                                decimalSeparator=','
                                                                error={errors.saleDetails?.message}
                                                            />
                                                        )}
                                                    />
                                                </td>
                                                <td className=''>
                                                    <Controller
                                                        name={`saleDetails.${index}.total`}
                                                        control={control}
                                                        render={({ field: { ref} }) => (
                                                            <InputNumeric
                                                                ref={ref}
                                                                value={
                                                                    (watch(`saleDetails.${index}.sellingPrice`) ?? 1) * 
                                                                    (watch(`saleDetails.${index}.quantity`) ?? 1)}
                                                                groupSeparator='.'
                                                                decimalSeparator=','
                                                                error={errors.saleDetails?.message}
                                                            />
                                                        )}
                                                    />
                                                </td>
                                                <td>
                                                    <TrashIcon onClick={()=>setValue(`saleDetails.${index}.deleted`, true)} className='h-8 w-8' color='red' />
                                                </td>
                                            </tr>
                                        )
                                    }
                                })
                            }
                            </tbody>
                        </table>
                        <div>
                            <div className='w-full border-b border-gray-400 my-4' />
                            <div className='grid grid-cols-4 gap-4'>
                                <Controller
                                    name={`shippingCost`}
                                    control={control}
                                    render={({ field: { ref, value, onChange} }) => (
                                        <InputNumeric
                                            ref={ref}
                                            label={t('shipping-cost')}
                                            value={value ?? 0}
                                            onChange={(e)=> onChange(parseInt((e.target.value??'0').replace(/\./g, '')))}
                                            groupSeparator='.'
                                            decimalSeparator=','
                                            error={errors.shippingCost?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name={`total`}
                                    control={control}
                                    render={({ field: { ref} }) => (
                                        <InputNumeric
                                            ref={ref}
                                            label={t('total')}
                                            value={total + (watch('shippingCost') ?? 0)}
                                            groupSeparator='.'
                                            decimalSeparator=','
                                            error={errors.total?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name={`pay`}
                                    control={control}
                                    render={({ field: { ref, value, onChange} }) => (
                                        <InputNumeric
                                            ref={ref}
                                            label={t('pay')}
                                            value={value ?? 0}
                                            onChange={(e)=>onChange(parseInt((e.target.value??'0').replace(/\./g, '')))}
                                            groupSeparator='.'
                                            decimalSeparator=','
                                            error={errors.pay?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name={`remainder`}
                                    control={control}
                                    render={({ field: { ref } }) => (
                                        <InputNumeric
                                            ref={ref}
                                            label={t('remainder')}
                                            value={(watch('pay')??0) - (total + (watch('shippingCost') ?? 0))}
                                            groupSeparator='.'
                                            decimalSeparator=','
                                            error={errors.pay?.message}
                                        />
                                    )}
                                />
                            </div>
                            <div className='flex items-center mt-8 space-x-2'>
                                <label htmlFor="description">Catatan </label>
                                <textarea
                                    className='border border-gray-500 w-96 rounded-lg p-2'
                                    {...register('description', { required: true })}
                                />
                                {errors.description && <p>Description is required.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-end space-x-2'>
                <Link to={'/sales'}>
                    <Button
                        type='button'
                        variant="error"
                        size="medium"
                        className='my-4 flex space-x-2' 
                    >
                        <BsDashCircle className='w-6 h-6' />
                        <label>{t("cancel")}</label>
                    </Button>
                </Link>
                <Button 
                    // disabled={isLoadingMutate?true:false} 
                    variant="primary" 
                    type='submit' 
                    size="medium" 
                    className='my-4 flex space-x-2' >
                        <BsClipboard2CheckFill className='w-6 h-6' />
                        <label>{t('save')}</label>
                        
                </Button>
                <Button 
                    disabled={idPrint?false:true} 
                    variant={idPrint?'success':'alternative'}
                    type='button' 
                    size="medium" 
                    onClick={() => onPrint(idPrint)}
                    className='my-4 flex space-x-2' >
                        <BsFillPrinterFill className='w-6 h-6' />
                        <label>{t('print')}</label>
                </Button>
            </div>
        </form>
    )
}

export default FormSalePage