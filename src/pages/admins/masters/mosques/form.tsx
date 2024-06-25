/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react'
import { InputText, Button, LabelInput } from '../../../../components/input';
import { MosqueFormProps } from '../../../../interfaces/masters/MosqueInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import useAddress from '../../../../hooks/fetch/masters/useAddress';
import { OptionSelectInterface } from '../../../../interfaces/globalInterface';

const FormMosque: FC<MosqueFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        idDetail,
        control,
        watch,
        handleOnChangeSelect,
        handleOnChangeImage,
        loading
    } = props;
    const {t} = useTranslation()

    const {
        optionProvince,
        optionCity,
        dataOptionCity,
        dataOptionDistrict,
        optionDistrict
    } = useAddress();
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col space-y-4'>
                <InputText
                    {...register("name")}
                    errors={errors.name?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("name")} 
                />
                <InputText
                    {...register("phone")}
                    errors={errors.phone?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("phone")} 
                />
                <InputText
                    {...register("bankAccount")}
                    errors={errors.bankAccount?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("bank-account")} 
                />
                <div className='w-full z-50'>
                    <LabelInput>{t('province')}</LabelInput>
                    <Controller
                        name='provinceOption'
                        control={control}
                        render={({ field }) => 
                            <AsyncSelect 
                                className='w-full'
                                {...field}
                                defaultOptions
                                loadOptions={optionProvince}
                                onChange={(value)=>handleOnChangeSelect('province', value as OptionSelectInterface)}
                                ref={(ref)=>ref}
                            />
                        }
                        rules={{ required: true }}
                    />
                    <span className='text-red-300'>
                        {
                            errors.province?.message ?? null
                        }
                    </span>
                </div>
                <div className='w-full z-40'>
                    <LabelInput>{t('city')} {watch('city')} {JSON.stringify(dataOptionCity.find(e=>e.value === watch('city')))}</LabelInput>
                    <Controller
                        name='cityOption'
                        control={control}
                        render={({ field }) => 
                            <AsyncSelect 
                                className='w-full'
                                {...field}
                                defaultValue={dataOptionCity.find(e=>e.value === watch('city'))}
                                defaultOptions={dataOptionCity}
                                onFocus={()=>optionCity('', parseInt(watch('province')??''))}
                                loadOptions={(data)=>optionCity(data, parseInt(watch('province')??''))}
                                onChange={(value)=>handleOnChangeSelect('city', value as OptionSelectInterface)}
                                ref={(ref)=>ref}
                            />
                        }
                        rules={{ required: true }}
                    />
                    <span className='text-red-300'>
                        {
                            errors.city?.message ?? null
                        }
                    </span>
                </div>
                <div className='w-full z-30'>
                    <LabelInput>{t('district')}</LabelInput>
                    <Controller
                        name='districtOption'
                        control={control}
                        render={({ field }) => 
                            <AsyncSelect 
                                className='w-full'
                                {...field}
                                defaultOptions={dataOptionDistrict}
                                onFocus={()=>optionDistrict('', parseInt(watch('city')??''))}
                                loadOptions={(data)=>optionDistrict(data, parseInt(watch('city')??''))}
                                onChange={(value)=>handleOnChangeSelect('district', value as OptionSelectInterface)}
                                ref={(ref)=>ref}
                            />
                        }
                        rules={{ required: true }}
                    />
                    <span className='text-red-300'>
                        {
                            errors.district?.message ?? null
                        }
                    </span>
                </div>
                <InputText
                    {...register("address")}
                    errors={errors.address?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("address")} 
                />
                <div>
                <input 
                    id="dropzone-file"
                    type="file"
                    onChange={(e)=>handleOnChangeImage(e)}
                    accept='image/*'
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
                        disabled={loading?true:false} 
                        variant="primary" 
                        type='submit' 
                        size="medium" 
                        className='my-4' >
                            {t('save')} {loading?<Spinner />:null}
                    </Button>
                : null}
            </div>
        </form>
    )
}

export default FormMosque