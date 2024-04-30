import { useTranslation } from "react-i18next";
import * as yup from "yup"
import { CustomerStatusEnum } from "../../interfaces/masters/CustomerInterface";

const CustomerSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        name: yup.string().required(`${t("name")} ${t("required")}`),
        email: yup.string().required(`${t("email")} ${t("required")}`),
        status: yup.string().required(`${t("status")} ${t("required")}`).oneOf([
            CustomerStatusEnum.active, 
            CustomerStatusEnum.block,
            CustomerStatusEnum.email_verify
        ]),
    });

    return {
        schema
    }
}
export default CustomerSchema