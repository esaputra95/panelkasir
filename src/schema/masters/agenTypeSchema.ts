import { useTranslation } from "react-i18next";
import * as yup from "yup"

const AgenTypeSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        name: yup.string().required(`${t("name")} ${t("required")}`),
        description: yup.string().required(`${t("description")} ${t("required")}`),
        type : yup.string().oneOf(['stockist', 'point', 'referral']).required(`${t("type")} ${t("required")}`),
        level: yup.number().required(`${t("level")} ${t("required")}`)
    });

    return {
        schema
    }
}
export default AgenTypeSchema