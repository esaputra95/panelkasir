import { useTranslation } from "react-i18next";
import * as yup from "yup"
import { methodeEnum, scheduleTypeEnum, typeEnum } from "../../interfaces/schedule/sessionInterface";

const SessionSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        schedule: yup.object().shape({
            scheduleType: yup.string().required().oneOf(
                [
                    scheduleTypeEnum.private, 
                    scheduleTypeEnum.regular
                ], 
                `${t("schedule-type")} ${t("required")}`
            ),
            method: yup.string().required().oneOf(
                [
                    methodeEnum.offline,
                    methodeEnum.online
                ], 
                `${t("method")} ${t("required")}`
            )
        }).required(),
        time: yup.array().of(
            yup.object().shape({
                date: yup.string().required(`${t("time")} ${t("required")}`),
                tentorId: yup.string().required(`${t("tutor")} ${t("required")}`),
                courseId: yup.string().required(`${t("room")} ${t("required")}`),
                type: yup.string().required().oneOf(
                    [typeEnum.study, typeEnum.try_out],
                    `${t("type")} ${t("required")}`
                ),
            })
        ).required(),
        // scheduleDetails: yup.array().of(
        //     yup.object().shape({
        //         student: yup.object().shape({
        //             label: yup.string().required(),
        //             value: yup.string().required(),
        //         }),
        //     }),
        // ).required()
    });

    return {
        schema
    }
}
export default SessionSchema