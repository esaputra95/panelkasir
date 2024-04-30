import { useTranslation } from "react-i18next";
import * as yup from "yup"
import { ArticleTypeEnum, ArticlesStatusEnum } from "../../interfaces/articles/ArticleInterface";

const ArticleSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        title: yup.string().required(`${t("title")} ${t("required")}`),
        category_id: yup.number().required(`${t("category_id")} ${t("required")}`),
        type: yup.string().required(`${t("status")} ${t("required")}`).oneOf([
            ArticleTypeEnum.banner,
            ArticleTypeEnum.berbagi,
            ArticleTypeEnum.grid,
            ArticleTypeEnum.kenalilah_islam
        ]),
        status: yup.string().required(`${t("status")} ${t("required")}`).oneOf([
            ArticlesStatusEnum.draft,
            ArticlesStatusEnum.publish
        ]),
        content: yup.string().required(`${t("content")} ${t("required")}`),
        // image: yup.string().required(`${t("image")} ${t("required")}`),
    });

    return {
        schema
    }
}
export default ArticleSchema