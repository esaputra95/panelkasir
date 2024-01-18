import { useTranslation } from "react-i18next";
import * as yup from "yup"

const TentorNotAvailableSchema = () => {
    const {t} = useTranslation();
    const schema = yup.object({
        // tentorId: yup.string().required(`${t("tutor")} ${t("required")}`),
        startDate: yup.string().required(`${t("start-date")} ${t("required")}`),
        untilDate: yup.string().required(`${t("until-date")} ${t("required")}`),
    });

    return {
        schema
    }
}
export default TentorNotAvailableSchema