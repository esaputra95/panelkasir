import { useTranslation } from "react-i18next";
import * as yup from "yup"

const NotificationSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        title: yup.string().max(255, `${t("title")} ${t("max-255-characters")}`).optional(),
        body: yup.string().required(`${t("body")} ${t("required")}`),
        type: yup.string().max(50, `${t("type")} ${t("max-50-characters")}`).optional(),
        screen: yup.string().max(50, `${t("screen")} ${t("max-50-characters")}`).optional(),
        referenceId: yup.string().max(36, `${t("referenceId")} ${t("max-36-characters")}`).optional(),
        metadata: yup.string().optional(),
        userIds: yup.array()
            .of(yup.string().required())
            .min(1, `${t("users")} ${t("required")}`)
            .required(`${t("users")} ${t("required")}`),
    });

    return {
        schema
    }
}

export default NotificationSchema
