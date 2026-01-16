import { useTranslation } from "react-i18next";
import * as yup from "yup"
import { StoreSubscriptionStatusEnum, StoreSubscriptionTypeEnum } from "../../interfaces/settings/StoreSubscriptionInterface";

const StoreSubscriptionSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        storeId: yup.string().required(`${t("store")} ${t("required")}`),
        type: yup.string().oneOf([
            StoreSubscriptionTypeEnum.TRIAL, 
            StoreSubscriptionTypeEnum.PAID,
        ]).required(`${t("type")} ${t("required")}`),
        startDate: yup.date().required(`${t("start-date")} ${t("required")}`),
        endDate: yup.date().required(`${t("end-date")} ${t("required")}`),
        durationMonth: yup.number().required(`${t("duration-month")} ${t("required")}`).min(1),
        price: yup.number().required(`${t("price")} ${t("required")}`).min(0),
        status: yup.string().oneOf([
            StoreSubscriptionStatusEnum.ACTIVE,
            StoreSubscriptionStatusEnum.EXPIRED,
            StoreSubscriptionStatusEnum.CANCELLED,
        ]).required(`${t("status")} ${t("required")}`),
        paymentRef: yup.string().nullable(),
    });

    return {
        schema
    }
}
export default StoreSubscriptionSchema
