import { api } from "../../../services";
import { RegistrationInterface, RegistrationSearchInterface } from "../../../interfaces/registers/registrationInterface";
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

const postData = async (url:string, data:RegistrationInterface) => {
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
		return error;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const changeStatus = async (url:string, data:any) => {
	try {
		const response = await api.put(`${url}/${data.id}`, {
			id:data.id,
			status: data.status ? 0 : 1
		});
		if(response.status === 200) return response.data
		throw response;
	} catch (error) {
		const err = error as AxiosError
		throw err;
	}
}

const updateModule = async (url:string, data: {id:string, isModule: number}) => {
	try {
		const response = await api.put(`${url}/${data.id}`, data)
		return response.data
	} catch (error) {
		return error as AxiosError
	}
}


export {
	getData,
	postData,
	deleteData,
	getDataById,
	changeStatus,
	updateModule
};
