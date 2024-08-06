import { api, apiImage } from "../../../services";
import { BankAccountSearchInterface } from "../../../interfaces/masters/BankAccountInterface";
import { AxiosError } from "axios";

interface ParamDonationInterface extends BankAccountSearchInterface {
	page?: number,
	limit?: number,
	order?: string
}

const getData = async (url:string, params:ParamDonationInterface) => {
	try {
		const response = await api.get(url, { params: { ...params } });
		return response.data
	} catch (error) {
		throw error as AxiosError
	}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postData = async (url:string, data:any) => {
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

const uploadImage = async (url:string, data:Blob|undefined) => {
	try {
		const formData = new FormData();
		formData.append("images", data??'');
		const upload = await apiImage.post(`${url}`, formData);
		return upload.data.data
	} catch (error) {
		throw error as AxiosError
	}
}


export {
	getData,
	postData,
	deleteData,
	getDataById,
	getDataSelect,
	uploadImage
};
