import { api } from "../../../services";
import { SessionInterface, SessionSearchInterface } from "../../../interfaces/settings/sessionInterface";
import { AxiosError } from "axios";

interface ParamSessionInterface extends SessionSearchInterface {
	page?: number,
	limit?: number,
	order?: string
}

const getData = async (url:string, params:ParamSessionInterface) => {
	const response = await api.get(url, { params: { ...params } });
	return response.data
};

const postData = async (url:string, data:SessionInterface) => {
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
		throw error as AxiosError
	}
}

const deleteData = async (url:string, id:string) => {
	try {
		const response = await api.delete(`${url}/${id}`)
		if(response.status===204) return true
	} catch (error) {
		throw error as AxiosError
	}
}

const getDataById = async (url:string, id:string) => {
	try {
		const response = await api.get(`${url}/${id}`)
		if(response.status===200) return response.data.data.session
	} catch (error) {
		throw error as AxiosError
	}
}

const getDataSelect = async (url:string, params: {name: string}) => {
	try {
		const response = await api.get(url, {params: {...params}})
		return response.data
	} catch (error) {
		throw error as AxiosError
	}
}

export { getData, postData, deleteData, getDataById, getDataSelect };
