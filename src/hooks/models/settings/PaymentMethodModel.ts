import { api } from "../../../services";
import { PaymentMethodInterface } from "../../../interfaces/settings/PaymentMethodInterface";
import { AxiosError } from "axios";


const getData = async <T>(url: string, params: T) => {
	try {
		const response = await api.get(url, { params: { ...params } });
		return response.data;
	} catch (error) {
		throw error as AxiosError;
	}
};

const postData = async (url:string, data:PaymentMethodInterface) => {
	try {
		if(data.id){
			const response = await api.put(`${url}/${data.id}`, data);
			if(response.status === 200) return response.data
			throw response;
		}else{
			const response = await api.post(url, data);
			if(response.status === 200) return response.data
			throw response;
		}
	} catch (error) {
		throw error as AxiosError;
	}
}

const deleteData = async (url:string, id:number) => {
	try {
		const response = await api.delete(`${url}/${id}`)
		if(response.status===204) return true
	} catch (error) {
		throw error as AxiosError
	}
}

const getDataById = async (url:string, id:number) => {
	try {
		const response = await api.get(`${url}/${id}`)
		if(response.status===200) return response.data
	} catch (error) {
		throw error as AxiosError
	}
}

const getDataSelect = async (url:string, params: {name: string}) => {
	try {
		const response = await api.get(url, {params: {...params}})
		return response.data
	} catch (error) {
		const err = error as AxiosError
		throw err;
	}
}


export { getData, postData, deleteData, getDataById, getDataSelect };
