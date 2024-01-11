import { useTranslation } from "react-i18next";
import * as yup from "yup"

const SettingSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        name: yup.string().required(`${t("name")} ${t("required")}`),
        quantity: yup.number().required(`${t("start-date")} ${t("required")}`)
    });

    return {
        schema
    }
}
export default SettingSchema