import { useTranslation } from "react-i18next";
import * as yup from "yup"

const RegisterSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        studentId: yup.string().required(`${t("students")} ${t("required")}`),
        classId: yup.string().required(`${t("class")} ${t("required")}`),
        university: yup.string().required(`${t("university")} ${t("required")}`),
        amount: yup.number().required(`${t("amount")} ${t("required")}`),
        sessionId: yup.string().required(`${t("sessions")} ${t("required")}`),
        packageId: yup.string().required(`${t("packages")} ${t("required")}`),
        guidanceTypeId: yup.string().required(`${t("guidanceType")} ${t("required")}`),
        location: yup.string().required(`${t("location")} ${t("required")}`),
        schoolYearId: yup.string().required(`${t("school-year")} ${t("required")}`),
    });

    return {
        schema
    }
}

export default RegisterSchema;