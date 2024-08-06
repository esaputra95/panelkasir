import { useTranslation } from "react-i18next";
import * as yup from "yup"

const WarehouseSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        name: yup.string().required(`${t("name")} ${t("required")}`),
        phone: yup.string().required(`${t("phone")} ${t("required")}`),
        email: yup.string().email().required(`${t("email")} ${t("required")}`),
        address: yup.string().required(`${t("address")} ${t("required")}`),
        description: yup.string().optional(),
    });

    return {
        schema
    }
}
export default WarehouseSchema