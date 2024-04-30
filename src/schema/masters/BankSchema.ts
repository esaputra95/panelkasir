import { useTranslation } from "react-i18next";
import * as yup from "yup"
import { BankStatusEnum, BankTypeEnum } from "../../interfaces/masters/BankInterface";

const BankSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        code: yup.string().required(`${t("code")} ${t("required")}`),
        name: yup.string().required(`${t("name")} ${t("required")}`),
        account_name: yup.string().required(`${t("type")} ${t("required")}`),
        type: yup.string().required().oneOf([
            BankTypeEnum.ewallet, 
            BankTypeEnum.qr,
            BankTypeEnum.retail,
            BankTypeEnum.transfer,
            BankTypeEnum.va
        ], 'Invalid gender value'),
        status: yup.string().required(`${t("type")} ${t("required")}`).oneOf([BankStatusEnum.draft, BankStatusEnum.publish]),
    });

    return {
        schema
    }
}
export default BankSchema