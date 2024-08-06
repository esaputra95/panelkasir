import { useTranslation } from "react-i18next";
import * as yup from "yup"
import { UserRoleEnum } from "../../interfaces/settings/UserInterface";

const DonationCategorySchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        name: yup.string().required(`${t("name")} ${t("required")}`),
        email: yup.string().required(`${t("email")} ${t("required")}`),
        phone: yup.string().required(`${t("phone")} ${t("required")}`),
        address: yup.string().required(`${t("address")} ${t("required")}`),
        role: yup.string().oneOf([
            UserRoleEnum.admin, 
            UserRoleEnum.afiliator, 
            UserRoleEnum.agent, 
            UserRoleEnum.cashier, 
            UserRoleEnum.leader, 
            UserRoleEnum.superadmin]
        ).required(`${t("role")} ${t("required")}`),
        agentTypeId: yup.number().required(`${t("agen-types")} ${t("required")}`)
    });

    return {
        schema
    }
}
export default DonationCategorySchema