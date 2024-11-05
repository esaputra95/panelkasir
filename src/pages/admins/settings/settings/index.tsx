import { useSetting } from '../../../../hooks/slices/settings/useSetting'
import FormSetting from './form'

const SettingPage = () => {
    const { 
        onSubmit,
        handleSubmit,
        register,
        fields,
        label,
        handleOnChange,
        imageIcon,
        handleOnUpload
    } = useSetting()

    return (
        <div className='w-full'>
            <FormSetting
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
                register={register}
                fields={fields}
                label={label}
                handleOnChange={handleOnChange}
                imageIcon={imageIcon}
                handleOnUpload={handleOnUpload}
            />
        </div>
    )
}

export default SettingPage