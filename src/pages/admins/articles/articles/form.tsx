import { FC } from 'react'
import { InputText, Button, LabelInput, SelectOption } from '../../../../components/input';
import { ArticleFormProps } from '../../../../interfaces/articles/ArticleInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { BsXCircleFill } from "react-icons/bs";
import { apiKey, plugins, toolbar } from '../../../../utils/textEditorConfig';
import { OptionSelectInterface } from '../../../../interfaces/globalInterface';

const FormArticle: FC<ArticleFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        isLoading,
        idDetail,
        control,
        optionArticleCategory,
        setValue,
        handleOnChange,
        handleOnChangeImage,
        image,
        setImage
    } = props;
    const {t} = useTranslation()
    
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col space-y-4'>
                <div className='w-full grid grid-cols-2 gap-2'>
                    <InputText
                        {...register("title")}
                        errors={errors.title?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("title")} 
                    />
                    <div className='w-full z-10'>
                        <LabelInput>{t('category')}</LabelInput>
                        <Controller
                            name='categorySelect'
                            control={control}
                            render={({ field }) => 
                                <AsyncSelect 
                                    className='w-full'
                                    {...field}
                                    defaultOptions
                                    loadOptions={optionArticleCategory}
                                    onChange={(value)=>handleOnChange('category_id', 'categorySelect', value as OptionSelectInterface)}
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
                        {...register('status')}
                        option={[
                            {value: 'active', label:'Active'},
                            {value: 'draft', label:'Draft'},
                        ]}
                        label={t('status')}
                    />
                    <SelectOption
                        {...register('type')}
                        option={[
                            {value: 'grid', label:'grid'},
                            {value: 'banner', label:'banner'},
                            {value: 'berbagi', label:'berbagi'},
                            {value: 'kenalilah_islam', label:'kenalilah_islam'},
                        ]}
                        label={t('type')}
                    />
                </div>
                <div className='flex'>
                    <div className='w-9/12 space-x-2'>
                        <Editor
                            apiKey={apiKey}
                            onBlur={(_a, b)=> {
                                setValue('content', b.getContent())
                            }}
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
                                    <img src={image} className='w-full' />
                                </div>
                            ):(
                                <div className="flex items-center justify-center w-full">
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

export default FormArticle