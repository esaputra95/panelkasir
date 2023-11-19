import { useTranslation } from "react-i18next";
import * as yup from "yup"

const classTypeSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        name: yup.string().required(`${t("name")} ${t("required")}`),
        price: yup.number().typeError(`${t("price")} ${t("mustNumber")}`).required(`${t("price")} ${t("required")}`)
    });

    return {
        schema
    }
}
export default classTypeSchema