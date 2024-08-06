import { useTranslation } from "react-i18next";
import * as yup from "yup"

const RewardSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        name: yup.string().required(`${t("name")} ${t("required")}`),
        quantity: yup.number().required(`${t("quantity")} ${t("required")}`),
        agenTypeId: yup.number().required(`${t("quantity")} ${t("required")}`)
    });

    return {
        schema
    }
}
export default RewardSchema