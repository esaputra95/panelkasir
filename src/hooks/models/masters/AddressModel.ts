import { api } from "../../../services";
import { AxiosError } from "axios";


const getDataSelect = async (url:string, params: {name: string, provinceId?: number}) => {
	try {
		const response = await api.get(url, {params: {...params}})
		return response.data
	} catch (error) {
		const err = error as AxiosError
		throw err;
	}
}
const getDataDistrict = async (url:string, params: {name: string, cityId?: number}) => {
	try {
		const response = await api.get(url, {params: {...params}})
		return response.data
	} catch (error) {
		const err = error as AxiosError
		throw err;
	}
}


export {getDataSelect, getDataDistrict};
