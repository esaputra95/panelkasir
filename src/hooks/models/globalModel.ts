import { AxiosError } from "axios";
import { api } from "../../services";

const getDataSelect = async (url:string, params: {name: string}) => {
	try {
		const response = await api.get(url, {params: {...params}})
		return response.data
	} catch (error) {
		const err = error as AxiosError
		throw err;
	}
}

const downloadFile = async (urlDownload:string, fileName:string) => {
	try {
		const response = await api.get(urlDownload, {
			responseType: 'blob'
		})
		const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.xlsx`; // Replace with the desired file name
        a.click();
        window.URL.revokeObjectURL(url);
		return response
	} catch (error) {
		return error as AxiosError
	}
}

const postData = async <T extends { id?: string | number }>(url: string, data: T) => {
	try {
		if (data.id) {
			const response = await api.put(`${url}/${data.id}`, data);
			if (response.status === 200) return response.data;
			throw response;
		} else {
			const response = await api.post(url, data);
			if (response.status === 200) return response.data;
			throw response;
		}
	} catch (error) {
	throw error as AxiosError;
	}
};

const getData = async<T> (url:string, params?:T) => {
	try {
		const response = await api.get(url, { params: { ...params } });
		return response.data
	} catch (error) {
		throw error as AxiosError
	}
};

const getDataById = async (url:string, id:string | number) => {
	try {
		const response = await api.get(`${url}/${id}`)
		if(response.status===200) return response.data
	} catch (error) {
		throw error as AxiosError
	}
}

export {
	getDataSelect,
	downloadFile,
	postData,
	getData,
	getDataById
}