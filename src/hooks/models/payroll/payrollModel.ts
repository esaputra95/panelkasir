import { api } from "../../../services";
import { PayrollSearchInterface } from "../../../interfaces/payroll/payrollInterface";
import { AxiosError } from "axios";

interface ParamPayrollInterface extends PayrollSearchInterface {
	page?: number,
	limit?: number,
	order?: string
}

const getData = async (url:string, params:ParamPayrollInterface) => {
	const response = await api.get(url, { params: { ...params } });
	return response.data
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

const getDataPayrollSession = async (url:string, tentorId: string, month:string) => {
	try {
		const response = await api.post(url, {
			tentorId, month
		});
		return response.data
	} catch (error) {
		return error as AxiosError
	}
}

const getPayrollDetail = async (url:string, id:string) => {
	try {
		const response = await api.get(`${url}/${id}`);
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
	getDataPayrollSession,
	getPayrollDetail
};
