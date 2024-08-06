import { useMutation } from "@tanstack/react-query";
import { getDataById } from "../../../models/sales/SaleModel";
import url from "../../../../services/url";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SaleInterface } from "../../../../interfaces/sales/SaleInterface";
import { getData } from "../../../models/settings/settingModel";
import { ApiResponseSetting } from "../../../../interfaces/settingInterface";

const useInvoice = () => {
    const [data, setData] = useState<SaleInterface>();
    const [image, setImage] = useState('')
    const params = useParams()
    const {Sale, Setting} = url

    useEffect(()=> {
        if(params.id){
            mutateSetting()
            mutate(Number(params.id))
        }
    },[]);

    const {mutate} = useMutation({
        mutationKey: ['get-sale-invoice'],
        mutationFn: (id: number) => getDataById(Sale.getById, id),
        onSuccess: (data) => {
            setData(data.data.Sale)
        }
    });
    const {mutate:mutateSetting} = useMutation({
        mutationKey: ['get-setting'],
        mutationFn: () => getData(Setting.get),
        onSuccess: (data:ApiResponseSetting) => {
            const icon = data.data.setting.find((value)=> value.label === "icon")
            setImage(icon?.value??'')
        }
    });

    return {
        data,
        image
    }
}

export default useInvoice;