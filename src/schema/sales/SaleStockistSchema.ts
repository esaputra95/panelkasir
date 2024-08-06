import { useTranslation } from "react-i18next";
import * as yup from "yup"

const StockistDetailSchema = yup.object({
    productId: yup.number().required(),
    quantity: yup.number().required(),
    sellingPrice: yup.number().required()
})
const StockistSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        invoice: yup.string().required(`${t("invoice")} ${t("required")}`),
        userId: yup.number().required(`${t("Stockists")} ${t("required")}`),
        warehouseId: yup.number().required(`${t("warehouse")} ${t("required")}`),
        // accountBankId: yup.number().required(`${t("bank")} ${t("required")}`),
        date: yup.string().required(`${t("date")} ${t("required")}`),
        status: yup.string().oneOf(['create', 'sent', 'return', 'finish']).required(),
        SaleStockistDetails : yup.array().of(StockistDetailSchema).required()
    });

    return {
        schema
    }
}
export default StockistSchema