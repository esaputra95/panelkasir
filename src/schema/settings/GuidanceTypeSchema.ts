import { useTranslation } from "react-i18next";
import * as yup from "yup"

const GuidanceTypeSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        name: yup.string().required(`${t("name")} ${t("required")}`),
        total: yup.number().required(`${t("total")} ${t("required")}`)
    });

    return {
        schema
    }
}
export default GuidanceTypeSchema