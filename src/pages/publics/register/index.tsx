import FormRegister from './form'
import useRegister from '../../../hooks/fetch/public/useRegister'
import { usePackage } from '../../../hooks/fetch/settings/usePackage';
import { useSession } from '../../../hooks/fetch/settings/useSession';
import { useGuidanceType } from '../../../hooks/fetch/settings/useGuidanceType';

const RegisterPage = () => {
    const { 
        register,
        errors,
        handleSubmit,
        onSubmit,
        control,
        handleOnChange,
        getValues
    } = useRegister();

    const { 
        optionPackage
    } = usePackage();

    const {
        optionSession
    } = useSession();

    const {
        optionGuidanceType
    } = useGuidanceType()

    return (
        <FormRegister
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            optionPackage={optionPackage}
            control={control}
            optionSession={optionSession}
            optionGuidanceType={optionGuidanceType}
            handleOnChange={handleOnChange}
            getValues={getValues}
        />
    )
}

export default RegisterPage