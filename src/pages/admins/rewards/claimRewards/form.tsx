import { FC } from 'react'
import { Button, InputText } from '../../../../components/input';
import { ClaimRewardsFormProps } from '../../../../interfaces/rewards/ClaimRewardsInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';
import { BsArrowClockwise } from "react-icons/bs";

const FormClaimRewards: FC<ClaimRewardsFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        onCancel,
        errors,
        idDetail,
        isLoadingMutate,
        checkTotalPoint,
        register,
        fields
    } = props;
    const {t} = useTranslation();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-row items-end space-x-2'>
                <InputText
                    className='w-72'
                    {...register('date')}
                    type='date'
                    errors={errors.date?.message}
                />
                <div>
                    <Button 
                        onClick={checkTotalPoint} 
                        variant="success" 
                        type='button'
                    >
                        <div className='flex space-x-2 items-center'>
                            <BsArrowClockwise size={18} className='text-white text-lg' />
                        </div>
                    </Button>
                </div>
            </div>
            <div className='w-full mt-8'>
                <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                            <th className='w/4/12 px-2 py-2'>{t('name')}</th>
                            <th className='w/2/12 px-2 py-2'>{t('points')}</th>
                            <th className='w-6/12 px-2 py-2'>{t('rewards')}</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        fields.map((fields, index)=>(
                            <tr key={fields.id}>
                                <td>
                                    <InputText
                                        {...register(`claimRewardDetails.${index}.name`)}
                                    />
                                </td>
                                <td>
                                        <InputText
                                            {...register(`claimRewardDetails.${index}.point`)}
                                        />
                                </td>
                                <td>
                                    <InputText
                                        {...register(`claimRewardDetails.${index}.rewardName`)}
                                    />
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
                        disabled={isLoadingMutate?true:false} 
                        variant="primary" 
                        type='submit' 
                        size="medium" 
                        className='my-4' >
                            {t('continue-claim')} {isLoadingMutate?<Spinner />:null} {isLoadingMutate}
                    </Button>
                : null}
            </div>
        </form>
    )
}

export default FormClaimRewards