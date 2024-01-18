import { useTranslation } from "react-i18next";
import * as yup from "yup"

const ClassMasterSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        name: yup.string().required(`${t("name")} ${t("required")}`),
        price: yup.number().required(`${t("price")} ${t("required")}`),
        quantity: yup.number().required(`${t("student-quantity")} ${t("required")}`),
        classType: yup.object().shape({
            label: yup.string().required(),
            value: yup.string().required(),
        })
    });

    return {
        schema
    }
}
export default ClassMasterSchema