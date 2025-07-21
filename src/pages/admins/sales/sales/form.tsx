import {  Button} from '../../../../components/input';
import { useTranslation } from 'react-i18next';
import { useSaleForm } from '../../../../hooks/slices/sales/sales/useSaleForm';
import { BsClipboard2CheckFill, BsFillPrinterFill } from "react-icons/bs";

const FormSalePage = () => {
    const {t} = useTranslation();
    const {
        handleSubmit,
        onSubmit,
        idPrint,
        onPrint
    } = useSaleForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col '>
            </div>
            <div className='w-full flex justify-end space-x-2'>
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