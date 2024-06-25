import { useTranslation } from "react-i18next";
import * as yup from "yup"
import { DonationsPublish, DonationStatusEnum } from "../../interfaces/donations/DonationInterface";

const DonationSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        name: yup.string().required(`${t("name")} ${t("required")}`),
        target: yup.number().required(`${t("phone")} ${t("required")}`),
        status: yup.string().required(`${t("status")} ${t("required")}`).oneOf([
            DonationStatusEnum.closed,
            DonationStatusEnum.fulfilled,
            DonationStatusEnum.open
        ]),
        publish: yup.string().required(`${t("status")} ${t("required")}`).oneOf([
            DonationsPublish.draft, 
            DonationsPublish.new,
            DonationsPublish.publish
        ]),
        category_id : yup.number().required(`${t("category")} ${t("required")}`),
        mosque_type: yup.string().required(`${t("name")} ${t("required")}`),
    });

    return {
        schema
    }
}
export default DonationSchema