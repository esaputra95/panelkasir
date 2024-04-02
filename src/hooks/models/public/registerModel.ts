import { AxiosError } from "axios";
import { RegisterInterface } from "../../../interfaces/public/registerInterface";
import { api, apiImage } from "../../../services";

interface ParamRegisterInterface{
	page?: number,
	limit?: number,
	order?: string
}

const getData = async (url:string, params:ParamRegisterInterface) => {
	const response = await api.get(url, { params: { ...params } });
	return response.data
};

const postData = async (url:string, data:RegisterInterface) => {
	try {
		if(data.id){
			
			const formData = new FormData();
			formData.append("images", data.imageUpload[0]);

			const upload = await apiImage.post('registers/images', formData);
			const response = await api.put(`${url}/${data.id}`, {
				...data,
				image: upload.data.data
			});
			if(response.status === 200) return response.data
			throw response;
		}else{
			const formData = new FormData();
			formData.append("images", data.imageUpload[0]);

			const upload = await apiImage.post('registers/images', formData);
			
			const response = await api.post(url, {
				...data,
				image: upload.data.data
			});

			if(response.status === 200) return response.data
			throw response;
		}
	} catch (error) {
		throw error as AxiosError;
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
		if(response.status===200) return response.data
	} catch (error) {
		throw error as AxiosError
	}
}

export { getData, postData, deleteData, getDataById };
