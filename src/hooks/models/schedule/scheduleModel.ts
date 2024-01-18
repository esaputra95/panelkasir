import { api } from "../../../services";
import {
	StudentGroupQueryInterface,
	SessionInputForm,
	TimeForm
} from "../../../interfaces/schedule/sessionInterface";
import { AxiosError } from "axios";

interface ParamSessionInterface extends StudentGroupQueryInterface {
	page?: number,
	limit?: number,
	order?: string
}

type BodyCheckSessionInterface = Omit<TimeForm, 'type'>

const getData = async (url:string, params:ParamSessionInterface) => {
	if(params.studyGroupId){
		const response = await api.get(url, { params: { ...params } });
		return response.data
	}
	return null
};

const postData = async (url:string, data:SessionInputForm) => {
	try {
		if(data.schedule.id){
			const response = await api.put(`${url}/${data.schedule.id}`, data)
			return response.data
		}else{
			const response = await api.post(url, data);
			return response.data
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

const checkSession = async (url:string, data:BodyCheckSessionInterface) => {
	try {
		const response = await api.post(`${url}`, data)
		return response.data.status
	} catch (error) {
		return error as AxiosError
	}
}

const cancelSession = async (url:string, id:string) => {
	try {
		const response = await api.post(`${url}?id=${id}`)
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
	getDataSelect,
	checkSession,
	cancelSession
};
