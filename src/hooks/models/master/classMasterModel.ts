import { api } from "../../../services";
import { ClassMasterSearchInterface } from "../../../interfaces/master/classMasterInterface";
import { AxiosError } from "axios";

interface ParamClassMasterInterface extends ClassMasterSearchInterface {
	page?: number,
	limit?: number,
	order?: string
}

const getData = async (url:string, params:ParamClassMasterInterface) => {
	const response = await api.get(url, { params: { ...params } });
	return response.data
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
