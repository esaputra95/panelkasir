import { api } from "../../../services";
import { RegistrationSearchInterface } from "../../../interfaces/registers/registratioInterface";
import { AxiosError } from "axios";

interface ParamRegistrationInterface extends RegistrationSearchInterface {
  	page?: number,
	limit?: number,
	order?: string
}

const getData = async (url:string, params:ParamRegistrationInterface) => {
	const response = await api.get(url, { params: { ...params } });
	return response.data
};

const postData = async (url:string, data:any) => {
	try {
		if(data.id){
			delete data.classType
			data.method = data.method.value
			const response = await api.put(`${url}/${data.id}`, data);
			if(response.status === 200) return response.data
			throw response;
		}else{
			delete data.classType
			data.method = data.method.value
			const response = await api.post(url, data);
			if(response.status === 200) return response.data
			throw response;
		}
	} catch (error) {
		throw error;
	}
}

const deleteData = async (url:string, id:string) => {
	try {
		const response = await api.delete(`${url}/${id}`)
		if(response.status===204) return true
	} catch (error) {
		return error
	}
}

const getDataById = async (url:string, id:string) => {
	try {
		const response = await api.get(`${url}/${id}`)
		if(response.status===200) return response.data
	} catch (error) {
		return error
	}
}

const getDataSelect = async (url:string, id:string) => {
	// try {
	// 	const response = await api.get(url, })
	// 	return response.data
	// } catch (error) {
	// 	let err = error as AxiosError
	// 	throw err;
	// }
}

const changeStatus = async (url:string, data:any) => {
	try {
		const response = await api.put(`${url}/${data.id}`, {
			id:data.id,
			status: data.status ? 0 : 1
		});
		if(response.status === 200) return response.data
		throw response;
	} catch (error) {
		let err = error as AxiosError
		throw err;
	}
}


export { getData, postData, deleteData, getDataById, getDataSelect, changeStatus };
