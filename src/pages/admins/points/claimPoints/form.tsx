import { FC } from 'react'
import { InputText, Button } from '../../../../components/input';
import { ClaimPointsFormProps } from '../../../../interfaces/points/ClaimPointsInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';
import { AiOutlineSync } from "react-icons/ai";

const FormClaimPoints: FC<ClaimPointsFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        isLoadingMutate,
        checkPoint,
        fields, 
        watch
    } = props;
    const {t} = useTranslation();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col '>
                <div className='flex justify-between items-end'>
                    <div className='flex items-center space-x-2'>
                        <InputText {...register('date')} type='datetime-local' />
                        <Button className='rounded-full' onClick={()=>checkPoint(watch('date'))}type='button' variant='success'>
                            <AiOutlineSync />
                        </Button>
                        
                    </div>
                    <div className='flex space-x-2'>
                        
                        <Button
                            type='button'
                            variant="error"
                            onClick={onCancel}
                            size="medium"
                            className='my-4' >
                                {t("cancel")}
                        </Button>
                        <Button 
                            disabled={isLoadingMutate?true:false} 
                            variant="primary" 
                            type='submit' 
                            size="medium" 
                            className='my-4' >
                                {t('save')} {isLoadingMutate?<Spinner />:null} {isLoadingMutate}
                        </Button>
                    </div>
                </div>
            </div>
            <div className='w-full flex flex-col space-y-4 mt-4 border-t-2 border-gray-200 pt-4'>
                {
                    fields.map((field, index) => (
                        <div key={field.id} className='w-full flex flex-row space-x-2'>
                            <InputText
                                label={t('name')}
                                {...register(`form.${index}.name`)}
                            />
                            <InputText
                                label={t('points')}
                                {...register(`form.${index}.point`)}
                            />
                            <InputText
                                label={t('prices')}
                                {...register(`form.${index}.price`)}
                            />
                            <InputText
                                label={t('total')}
                                {...register(`form.${index}.total`)}
                            />
                        </div>
                    ))
                }
            </div>
        </form>
    )
}

export default FormClaimPoints