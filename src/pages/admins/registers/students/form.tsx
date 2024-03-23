import { FC } from 'react'
import { InputText, Button, SelectOption } from '../../../../components/input';
import { StudentFormProps } from '../../../../interfaces/registers/studentInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';
import InputCheckBox from '../../../../components/input/inputCheckBox';

const FormStudent: FC<StudentFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        isLoading,
        idDetail,
        // control,
        // classTypeOption
    } = props;
    const {t} = useTranslation()
    
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
                    {...register("studyProgram")}
                    errors={errors.studyProgram?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("study-program")} 
                />
                <InputText
                    {...register("phone")}
                    errors={errors.phone?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("phone")} 
                />
                <InputText
                    {...register("school")}
                    errors={errors.phone?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("school")} 
                />
                <InputText
                    {...register("placeBirth")}
                    errors={errors.placeBirth?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("place-birth")} 
                />
                <InputText
                    {...register("dateBirth")}
                    errors={errors.dateBirth?.message} 
                    readOnly={idDetail?true:false} 
                    type='date'
                    label={t("date-birth")} 
                />
                <InputText
                    {...register("address")}
                    errors={errors.address?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("address")} 
                />
                <SelectOption 
                    {...register('gender')}
                    label={t('gender')}
                    option={[
                        {value:'laki_laki', label:'Laki-Laki'},
                        {value:'perempuan', label:'Perempuan'},
                    ]}
                    errors={errors.gender?.message}
                />
                <InputText
                    {...register("email")}
                    errors={errors.email?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("email")} 
                />
                <InputText
                    {...register("classGrade")}
                    errors={errors.classGrade?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("class-grade")} 
                />
                <InputText
                    {...register("university")}
                    errors={errors.university?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("university")} 
                />
                <InputText
                    {...register("country")}
                    errors={errors.country?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("country")} 
                />
                <InputText
                    {...register("province")}
                    errors={errors.province?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("province")} 
                />
                <InputText
                    {...register("city")}
                    errors={errors.city?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("city")} 
                />
                <InputText
                    {...register("parentName")}
                    errors={errors.parentName?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("parent-name")} 
                />
                <InputText
                    {...register("parentPhone")}
                    errors={errors.parentPhone?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("parent-phone")} 
                />
                <InputCheckBox
                    {...register('agreement')}
                    value={1}
                    label='Menyetujui semua persyaratan'
                />
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

export default FormStudent