import { api, apiImage } from "../../../services";
import { FormSetting } from "../../../interfaces/settings/settingInterface";
import { AxiosError } from "axios";


const getData = async (url:string) => {
	const response = await api.get(url);
	return response.data
};

const updateData = async (url:string, data:FormSetting) => {
	try {
		const response = await api.post(url, data);
		if(response.status === 200) return response.data
		return response.data;
	} catch (error) {
		throw error as AxiosError
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const upload = async (url:string, data:any) => {
	try {
		const formData = new FormData();
		formData.append("images", data);
		const upload = await apiImage.post(`${url}/images`, formData);
		const update = await api.put(url, {image : upload.data.data})
		return update.data
	} catch (error) {
		throw error as AxiosError
	}
}

const getDataOne = async (url:string, query:string) => {
	try {
		const response = await api.get(url, {
			params: {
				name: query
			}
		})
		return response.data
	} catch (error) {
		throw error as AxiosError
	}
}

export { getData, updateData, upload, getDataOne };