import { useTranslation } from "react-i18next";
import * as yup from "yup"

const SchoolYearSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        name: yup.string().required(`${t("name")} ${t("required")}`),
        startYear: yup.date().required(`${t("start-date")} ${t("required")}`),
        endYear: yup.date().required(`${t("start-date")} ${t("required")}`),
    });

    return {
        schema
    }
}
export default SchoolYearSchema