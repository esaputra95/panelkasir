import { useTranslation } from "react-i18next";
import * as yup from "yup"

const StudyGroupSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        studyGroup: yup.object().shape({
            name: yup.string().required(`${t("name")} ${t("required")}`),
            total: yup.number().required(`${t("total")} ${t("required")}`),
            class: yup.object().shape({
                label: yup.string().required(),
                value: yup.string().required(),
            }),
            guidanceType: yup.object().shape({
                label: yup.string().required(),
                value: yup.string().required(),
            })
        }).required(),
        studyGroupDetails: yup.array().of(
            yup.object().shape({
                student: yup.object().shape({
                    label: yup.string().required(),
                    value: yup.string().required(),
                }),
                studentId: yup.string()
            }),
        ).required()
    });

    return {
        schema
    }
}
export default StudyGroupSchema