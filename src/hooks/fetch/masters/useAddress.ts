// import { useState } from "react";
import { useState } from "react";
import { OptionSelectInterface } from "../../../interfaces/globalInterface";
import url from "../../../services/url";
import { getDataDistrict, getDataSelect } from "../../models/masters/AddressModel";

const useAddress = () => {
    const [dataOptionCity, setDataOptionCity] = useState<OptionSelectInterface[]>([{value:'', label:''}])
    const [dataOptionDistrict, setDataOptionDistrict] = useState<OptionSelectInterface[]>([{value:'', label:''}])
    const {Address} = url;
    const optionProvince = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(Address.province, {name: data});
        if(response.status){
            // setDataOptionProvince(response.data);
            return response.data.map(
                (value: {
                    id: number; 
                    province_name: string
                })=> 
                    (
                        {value: value.id, label: value.province_name}
                    )
                )
        }
        return [{value:'', label:''}]
    }

    const optionCity = async (name?: string, provinceId?: number): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(Address.city, {name: name ?? '', provinceId});
        if(response.status){
            setDataOptionCity(response.data.map(
                (value: {
                    id: number; 
                    city_name: string
                })=> 
                    (
                        {value: value.id, label: value.city_name}
                    )
                )
            );

            return response.data.map(
                (value: {
                    id: number; 
                    city_name: string
                })=> 
                    (
                        {value: value.id, label: value.city_name}
                    )
                )
        }
        return [{value:'', label:''}]
    }

    const optionDistrict = async (name?: string, cityId?: number): Promise<OptionSelectInterface[]> => {
        const response = await getDataDistrict(Address.district, {name: name ?? '', cityId});
        if(response.status){
            setDataOptionDistrict(response.data.map(
                (value: {
                    id: number; 
                    district_name: string
                })=> 
                    (
                        {value: value.id, label: value.district_name}
                    )
                )
            );

            return response.data.map(
                (value: {
                    id: number; 
                    district_name: string
                })=> 
                    (
                        {value: value.id, label: value.district_name}
                    )
                )
        }
        return [{value:'', label:''}]
    }

    return {
        optionProvince,
        dataOptionCity,
        optionCity,
        dataOptionDistrict,
        optionDistrict
    }
};

export default useAddress;