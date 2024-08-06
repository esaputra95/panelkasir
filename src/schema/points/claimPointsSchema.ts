import { useTranslation } from "react-i18next";
import * as yup from "yup"

const ClaimPointsSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        userId: yup.number().required(`${t("users")} ${t("required")}`),
        endDate: yup.date().required(`${t("date")} ${t("required")}`),
    });

    return {
        schema
    }
}
export default ClaimPointsSchema