import { useTranslation } from "react-i18next";
import * as yup from "yup"

const DonationCategorySchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        name: yup.string().required(`${t("name")} ${t("required")}`),
        email: yup.string().required(`${t("email")} ${t("required")}`)
    });

    return {
        schema
    }
}
export default DonationCategorySchema