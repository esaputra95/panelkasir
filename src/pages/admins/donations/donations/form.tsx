import { FC } from 'react'
import { InputText, Button, LabelInput, SelectOption } from '../../../../components/input';
import { DonationFormProps } from '../../../../interfaces/donations/DonationInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { Editor } from '@tinymce/tinymce-react';
import { apiKey, plugins, toolbar } from '../../../../utils/textEditorConfig';
import { BsXCircleFill } from 'react-icons/bs';
import { SingleValue } from 'react-select';
import { OptionSelectInterface } from '../../../../interfaces/globalInterface';

const FormDonation: FC<DonationFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        idDetail,
        control,
        setValue,
        optionDonationCategory,
        optionMosque,
        handleOnChangeImage,
        image,
        setImage,
        handleOnChange,
        getValues,
        isLoadingMutate,
    } = props;
    const {t} = useTranslation();
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col '>
                <div className='grid grid-cols-2 gap-4'>
                    <InputText
                        {...register("name")}
                        errors={errors.name?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("name")} 
                    />
                    <InputText
                        {...register("target")}
                        errors={errors.target?.message} 
                        readOnly={idDetail?true:false} 
                        type='number'
                        label={t("target")} 
                    />
                    <div className='w-full z-10'>
                        <LabelInput>{t('mosque')}</LabelInput>
                        <Controller
                            name='placeOption'
                            control={control}
                            render={({ field }) => 
                                <AsyncSelect 
                                    className='w-full'
                                    {...field}
                                    defaultOptions
                                    loadOptions={optionMosque}
                                    onChange={(value)=>handleOnChange('place_id', 'placeOption', value as OptionSelectInterface)}
                                    ref={(ref)=>ref}
                                />
                            }
                            rules={{ required: true }}
                        />
                        <span className='text-red-300'>
                            {
                                errors.place_id?.message ?? null
                            }
                        </span>
                    </div>
                    <div className='w-full z-10'>
                        <LabelInput>{t('category')}</LabelInput>
                        <Controller
                            name='categoryOption'
                            control={control}
                            render={({ field }) => 
                                <AsyncSelect 
                                    className='w-full'
                                    {...field}
                                    defaultOptions
                                    value={field.value}
                                    loadOptions={optionDonationCategory}
                                    placeholder='Pilih...'
                                    defaultValue={{label:'', value:''}}
                                    onChange={(value: SingleValue<OptionSelectInterface>)=>handleOnChange('category_id', 'categoryOption', value as OptionSelectInterface)}
                                    ref={(ref)=>ref}
                                />
                            }
                            rules={{ required: true }}
                        />
                        <span className='text-red-300'>
                            {
                                errors.category_id?.message ?? null
                            }
                        </span>
                    </div>
                    <SelectOption
                        {...register('publish')}
                        label={t('publish')}
                        errors={errors.publish?.message}
                        option={[
                            {label:'Publish', value:'publish'},
                            {label:'Draft', value:'draft'},
                            {label:'New', value:'new'},
                        ]}
                    />
                    <SelectOption
                        {...register('place_type')}
                        label={t('place_type')}
                        errors={errors.publish?.message}
                        option={[
                            {label:'Masjid', value:'mosque'},
                            {label:'Pendidikan', value:'study'},
                        ]}
                    />
                    <SelectOption
                        {...register('status')}
                        label={t('status')}
                        errors={errors.status?.message}
                        option={[
                            {label:'Open', value:'open'},
                            {label:'Closed', value:'closed'},
                            {label:'Fulfilled', value:'fulfilled'},
                        ]}
                    />
                </div>
                <div className='flex mt-4'>
                    <div className='w-9/12 gap-4'>
                        <Editor
                            apiKey={apiKey}
                            onBlur={(a, b)=> {
                                setValue('text', b.getContent())
                            }}
                            value={getValues('text')}
                            init={{
                                height: 500,
                                menubar: true,
                                plugins: [
                                    ...plugins
                                ],
                                toolbar: toolbar,
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                    </div>
                    <div className='w-3/12 ml-2'>
                        
                        {
                            image ? (
                                <div className='relative'>
                                    <div className='flex absolute top-0 right-0 bg-white rounded-full w-10 h-10 items-center justify-center'>
                                        <BsXCircleFill
                                            title='Change'
                                            className='w-8 h-8 text-red-400 hover:text-red-700 hover:cursor-pointer'
                                            onClick={()=>setImage('')}
                                        />
                                    </div>
                                    <img src={`${image}&sz=w200`}  alt="" className='w-full' />
                                </div>
                            ):(
                                <div className="flex items-center justify-center text-center w-full">
                                    <label
                                        htmlFor="dropzone-file"
                                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 16"
                                            >
                                                <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                                            </p>
                                        </div>
                                        <input id="dropzone-file" type="file" onChange={(e)=>handleOnChangeImage(e)} accept='image/*' className="hidden" />
                                    </label>
                                </div>
                            )
                        }
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

export default FormDonation