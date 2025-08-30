import { FC } from 'react'
import { InputText, Button } from '../../../../components/input';
import { WarehouseFormProps } from '../../../../interfaces/settings/WarehouseInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

const FormWarehouse: FC<WarehouseFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        idDetail,
        isLoadingMutate,
    } = props;
    const {t} = useTranslation();

    const user = useSelector((state:RootState)=> state.userReducer)
    
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
                        {...register("address")}
                        errors={errors.address?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("address")} 
                    />
                    {
                        user.level === 'superadmin' && (
                            <InputText
                                {...register("expiredDate")}
                                type='date'
                                errors={errors.expiredDate?.message} 
                                readOnly={idDetail?true:false} 
                                label={t("expiredDate")} 
                            />
                        )
                    }
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

export default FormWarehouse