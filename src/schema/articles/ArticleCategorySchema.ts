import { useTranslation } from "react-i18next";
import * as yup from "yup"
import { CategoryStatusEnum } from "../../interfaces/articles/ArticleCategoryInterface";

const ArticleCategorySchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        name: yup.string().required(`${t("title")} ${t("required")}`),
        status: yup.string().required(`${t("status")} ${t("required")}`).oneOf([
            CategoryStatusEnum.draft,
            CategoryStatusEnum.publish
        ]),
    });

    return {
        schema
    }
}
export default ArticleCategorySchema