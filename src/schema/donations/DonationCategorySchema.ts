import { useTranslation } from "react-i18next";
import * as yup from "yup"
import { CategoryStatusEnum } from "../../interfaces/donations/DonationCategoryInterface";

const DonationCategorySchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        name: yup.string().required(`${t("name")} ${t("required")}`),
        status: yup.string().required(`${t("status")} ${t("required")}`).oneOf([
            CategoryStatusEnum.draft,
            CategoryStatusEnum.publish
        ]),
    });

    return {
        schema
    }
}
export default DonationCategorySchema