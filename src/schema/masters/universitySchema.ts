import { useTranslation } from "react-i18next";
import * as yup from "yup"

const UniversitySchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        name: yup.string().required(`${t("name")} ${t("required")}`)
    });

    return {
        schema
    }
}
export default UniversitySchema