import { useTranslation } from "react-i18next";
import * as yup from "yup"
import { UserManagementRoleEnum } from "../../interfaces/settings/UserManagementInterface";

const DonationCategorySchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        name: yup.string().required(`${t("name")} ${t("required")}`),
        email: yup.string().required(`${t("email")} ${t("required")}`),
        level: yup.string().oneOf([
            UserManagementRoleEnum.admin, 
            UserManagementRoleEnum.cashier, 
            UserManagementRoleEnum.superadmin,
            UserManagementRoleEnum.owner,
            UserManagementRoleEnum.supervisor
        ]
        ).required(`${t("role")} ${t("required")}`),
    });

    return {
        schema
    }
}
export default DonationCategorySchema