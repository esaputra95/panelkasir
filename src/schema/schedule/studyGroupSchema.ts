import { useTranslation } from "react-i18next";
import * as yup from "yup"

const StudyGroupSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        studyGroup: yup.object().shape({
            name: yup.string().required(`${t("name")} ${t("required")}`),
            total: yup.number().required(`${t("total")} ${t("required")}`),
            classId: yup.string().required(),
            guidanceTypeId: yup.string().required()
        }).required(),
        studyGroupDetails: yup.array().of(
            yup.object().shape({
                studentId: yup.string().required()
            }),
        ).required()
    });

    return {
        schema
    }
}
export default StudyGroupSchema