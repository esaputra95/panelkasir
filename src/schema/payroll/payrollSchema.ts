import { useTranslation } from "react-i18next";
import * as yup from "yup"

const PayrollSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        userId: yup.string().required(`${t("name")} ${t("required")}`),
        basicSalary: yup.string().required(`${t("basic-salary")} ${t("required")}`),
        sessionSalary: yup.string().required(`${t("session-salary")} ${t("required")}`),
        total: yup.string().required(`${t("name")} ${t("required")}`),
        payrollDetails: yup.array().of(
            yup.object().shape({
                scheduleId: yup.string().required(),
                price: yup.string().required()
            })
        ).required()
    });

    return {
        schema
    }
}
export default PayrollSchema