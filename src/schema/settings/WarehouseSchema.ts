import { useTranslation } from "react-i18next";
import * as yup from "yup"

const WarehouseSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        name: yup.string().required(`${t("name")} ${t("required")}`),
        phone: yup.string().optional(),
        email: yup.string().email().optional(),
        address: yup.string().optional(),
        description: yup.string().optional(),
        expiredDate: yup.string().optional(),
    });

    return {
        schema
    }
}
export default WarehouseSchema