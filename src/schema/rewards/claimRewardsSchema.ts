import { useTranslation } from "react-i18next";
import * as yup from "yup"

const ClaimRewardsSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        date: yup.string().required(`${t("date")} ${t("required")}`),
    });

    return {
        schema
    }
}
export default ClaimRewardsSchema