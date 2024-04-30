import { FC } from 'react'
import { InputText, Button, SelectOption, LabelInput } from '../../../../components/input';
import { BankFormProps } from '../../../../interfaces/masters/BankInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BankTypeDummy, StatusDummy } from '../../../../utils/dummy/master';

const FormBank: FC<BankFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        isLoading,
        idDetail,
        setValue,
        getValues
    } = props;
    const {t} = useTranslation()
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col space-y-4'>
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
                <InputText
                    {...register("branch")}
                    errors={errors.branch?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("branch")} 
                />
                <InputText
                    {...register("account_name")}
                    errors={errors.account_name?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("account_name")} 
                />
                <InputText
                    {...register("bank")}
                    errors={errors.bank?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("bank_name")} 
                />
                <InputText
                    {...register("account_number")}
                    errors={errors.account_number?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("account_number")} 
                />
                <SelectOption 
                    {...register('status')}
                    label={t("status")}
                    option={StatusDummy}
                    errors={errors.type?.message}
                />
                <SelectOption 
                    {...register('type')}
                    label={t("type")}
                    option={BankTypeDummy}
                    errors={errors.type?.message}
                />
                <InputText
                    {...register("description")}
                    errors={errors.description?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("description")} 
                />
                <div className='w-full'>
                    <LabelInput>{t('tutorial')}</LabelInput>
                    <CKEditor
                    editor={ ClassicEditor }
                    data={getValues('tutorial')??''}
                    onBlur={(_event, editor)=>{
                        setValue('tutorial', editor.getData());
                    }}
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

export default FormBank