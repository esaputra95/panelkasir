import { useTranslation } from "react-i18next";
import * as yup from "yup"

const ClassTypeSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        name: yup.string().required(`${t("name")} ${t("required")}`),
        price: yup.number().typeError(`${t("price")} ${t("mustNumber")}`).required(`${t("price")} ${t("required")}`),
        quantity: yup.number().typeError(`${t("quantity")} ${t("mustNumber")}`).required(`${t("price")} ${t("required")}`)
    });

    return {
        schema
    }
}
export default ClassTypeSchema