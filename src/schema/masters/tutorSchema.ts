import { useTranslation } from "react-i18next";
import * as yup from "yup"
import { UserType } from "../../interfaces/master/tutorInterface";

const TentorSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        name: yup.string().required(`${t("name")} ${t("required")}`),
        email: yup.string().email(`Must be a valid email address`).required(`${t("email")} ${t("required")}`),
        username: yup.string().required(`${t("username")} ${t("required")}`),
        password: yup.string().required(`${t("password")} ${t("required")}`),
        userType: yup.string().required().oneOf(
            [UserType.admin, UserType.tentor],
            `${t("user-type")} ${t("required")}`
        ),
        nickname: yup.string().required(`${t("nickname")} ${t("required")}`),
        phone: yup.string().required(`${t("phone")} ${t("required")}`),
    });

    return {
        schema
    }
}
export default TentorSchema