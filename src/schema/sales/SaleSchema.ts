import { useTranslation } from "react-i18next";
import * as yup from "yup"

const SaleDetailSchema = yup.object({
    productId: yup.number().required(),
    quantity: yup.number().required(),
    sellingPrice: yup.number().required()
})
const SaleSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        invoice: yup.string().required(`${t("invoice")} ${t("required")}`),
        userId: yup.number().required(`${t("sales")} ${t("required")}`),
        warehouseId: yup.number().required(`${t("warehouse")} ${t("required")}`),
        // accountBankId: yup.number().required(`${t("bank")} ${t("required")}`),
        date: yup.string().required(`${t("date")} ${t("required")}`),
        status: yup.string().oneOf(['create', 'sent', 'return', 'finish']).required(),
        saleDetails : yup.array().of(SaleDetailSchema).required()
    });

    return {
        schema
    }
}
export default SaleSchema