import { FC, Fragment } from 'react'
import { InputText, Button } from '../../../../components/input';
import { SettingFormProps } from '../../../../interfaces/settings/settingInterface';
import { t } from 'i18next';
import { BsUpload } from "react-icons/bs";

const FormSetting: FC<SettingFormProps> = (props) => {
    const { 
        onSubmit,
        fields, 
        register,
        handleSubmit,
        label,
        handleOnChange,
        imageIcon,
        handleOnUpload
    } = props;
    
    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-2 gap-2'>
                    {
                        fields.map((field, index)=> (
                            <Fragment key={field.id}>
                            {
                                label[index] !== "icon" ? (
                                    <InputText 
                                        label={t(label[index])}
                                        {...register(`form.${index}.value`)}
                                    />
                                ) : null
                            }
                            </Fragment>
                        ))
                    }
                </div>
                
            </form>
            <div className='w-full flex justify-end space-x-2'>
                <Button
                    variant="primary"
                    type='submit'
                    size="medium"
                    onClick={()=>onSubmit}
                    className='my-4' 
                >
                    {t('update')}
                </Button>
            </div>
            <div className='w-full grid grid-cols-3 gap-1 items-end'>
                <div className='w-full'>
                    <InputText
                        type='file'
                        label='Icon'
                        accept='image/*'
                        onChange={(e)=> handleOnChange(e)}
                    />
                </div>
                <div >
                    <Button
                        type='button'
                        onClick={handleOnUpload}
                    >
                        <BsUpload />
                    </Button>
                </div>
                
            </div>
            <div className='w-full'>
                <img src={`${import.meta.env.VITE_API_URL}/images/${imageIcon}`} className='h-24 w-24 rounded-full' />
            </div>
        </Fragment>
    )
}

export default FormSetting