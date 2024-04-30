import { useTranslation } from "react-i18next";
import * as yup from "yup"

const MosqueSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        name: yup.string().required(`${t("name")} ${t("required")}`),
        phone: yup.string().required(`${t("phone")} ${t("required")}`),
        address: yup.string().required(`${t("address")} ${t("required")}`),
    });

    return {
        schema
    }
}
export default MosqueSchema