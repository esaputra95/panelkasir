// import { ApiResponseSetting } from "../interfaces/settingInterface";
// import { getData as getDataSetting}  from "../hooks/models/settings/settingModel"
// import url from "../services/url";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import { t } from "i18next";
// import helperReport from "./headerReport";

const exportToPdf = async (
    data:string[][], 
    // header:
    //     'headerSalesReport'|
    //     'headerPointsReport'|
    //     'headerUserPointsReport'|
    //     'headerClaimPointsReport'|
    //     'headerClaimReward', 
    //     invoice?: {invoice?:string, date: string},
    ) => {
    try {
        const doc = new jsPDF();
        // const {
        //     Setting
        // } = url;
        // const headerData:ApiResponseSetting = await getDataSetting(Setting.get);
        // const icon = headerData.data.setting.find(value=> value.label === "icon")
        // const hotline = headerData.data.setting.find(value=> value.label === "hotline")
        // const address = headerData.data.setting.find(value=> value.label === "address")
        // const email = headerData.data.setting.find(value=> value.label === "email")

        // doc.addImage(`${import.meta.env.VITE_API_URL}/images/${icon?.value}`, 'JPEG', 12, 2, 25, 25);
        doc.setFontSize(9)
        // doc.text([
        //     t('ClaimRewards report'), 
        //     `Head Office: ${address?.value ?? ''}`,
        //     `hotline : ${hotline?.value ?? ''}`,
        //     `Email: ${email?.value ?? ''}`
        // ], 44, 6);

        // let newHead:string[]=[];
        // for (const value of helperReport[header]) {
        //     newHead=[...newHead,
        //         t(value)
        //     ]
        // }
        // doc.text([`${invoice?.invoice ? 'Invoice : ' +invoice.invoice :''}`], 12,30);
        // doc.text([`${invoice?.date ? 'Tanggal : ' +invoice.date :''}`], 12,34);
        autoTable(doc, {
            // head: [
            //     newHead
            // ],
            // margin: { left:12, right:12, top:40 },
            theme:'grid',
            styles:{halign:'left'},
            body: data??'',
        })
        doc.save(`${t('claim-points-report')}.pdf`)
    } catch (error) {
        return false
    }
}

export default exportToPdf;