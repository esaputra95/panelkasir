import { useTranslation } from "react-i18next";
import * as yup from "yup"

const RecordMateriSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        date: yup.string().required(`${t("date")} ${t("required")}`),
        studyGroupId: yup.string().required(`${t("study-groups")} ${t("required")}`),
        detail: yup.array().of(
            yup.object().shape({
                studentId: yup.string().required(`${t("date")} ${t("required")}`),
                materiId: yup.string().required(`${t("materials")} ${t("required")}`),
            })
        ).required()
    });

    return {
        schema
    }
}
export default RecordMateriSchema