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


export { getDataSelect, downloadFile }