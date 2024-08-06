import { useTranslation } from "react-i18next";
import * as yup from "yup"

const ProductSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        code: yup.string().required(`${t("code")} ${t("required")}`),
        name: yup.string().required(`${t("name")} ${t("required")}`),
        productCategoryId: yup.number().required(`${t("product-categories")} ${t("required")}`),
        type: yup.string().oneOf(['item', 'package']).required(`${t("type")} ${t("required")}`),
        sellingPrice: yup.number().required(`${t("selling-price")} ${t("required")}`),
        purchasePrice: yup.number().required(`${t("capital-price")} ${t("required")}`),
        settingPoints: yup.array().of(yup.object().shape({
            agenTypeId: yup.number().optional(),
            value: yup.number().required(),
        })).required(),
        settingPackages: yup.array().of(yup.object().shape({
            productId: yup.number().optional(),
            quantity: yup.number().required(),
        })).optional()
    });

    return {
        schema
    }
}
export default ProductSchema