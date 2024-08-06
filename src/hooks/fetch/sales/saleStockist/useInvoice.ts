import { useMutation } from "@tanstack/react-query";
import { getDataById } from "../../../models/sales/SaleStockistModel";
import url from "../../../../services/url";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SaleStockistInterface } from "../../../../interfaces/sales/SaleStockistInterface";

const useInvoice = () => {
    const [data, setData] = useState<SaleStockistInterface>()
    const params = useParams()
    const {SaleStockist} = url

    useEffect(()=> {
        if(params.id){
            mutate(Number(params.id))
        }
    },[]);

    const {mutate} = useMutation({
        mutationKey: ['get-SaleStockist-invoice'],
        mutationFn: (id: number) => getDataById(SaleStockist.getById, id),
        onSuccess: (data) => {
            console.log({data});
            
            setData(data.data.SaleStockist)
        }
    });

    return {
        data
    }
}

export default useInvoice;