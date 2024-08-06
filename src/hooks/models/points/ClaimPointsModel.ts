import { api } from "../../../services";
import {
	ClaimPointsSearchInterface,
	FormInterface,
} from "../../../interfaces/points/ClaimPointsInterface";
import { AxiosError } from "axios";

interface ParamClaimPointsInterface extends ClaimPointsSearchInterface {
	page?: number,
	limit?: number,
	order?: string
}

const getData = async (url:string, params:ParamClaimPointsInterface) => {
	try {
		const response = await api.get(url, { params: { ...params } });
		return response.data
	} catch (error) {
		throw error as AxiosError
	}
};

const postData = async (url:string, data:FormInterface) => {
	try {
		const response = await api.post(url, data);
		if(response.status === 200) return response.data
		throw response;
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


const lastClaim = async (url: string, userId: number) => {
	try {
		const response = await api.post(url, {
			userId
		});

		return response.data.data.ClaimPoints
	} catch (error) {
		throw error as AxiosError;
	}
}

const totalPoint = async (url: string, endDate: string) => {
	try {
		const response = await api.post(url, {
			endDate,
		});
		return response.data.data.points
	} catch (error) {
		throw error as AxiosError;
	}
}

const getClaimPoints = async (url: string, id: number) => {
	try {
		const response = await api.post(url, {id});
		return response.data.data.points
	} catch (error) {
		throw error as AxiosError;
	}
}

export {
	getData,
	postData,
	deleteData,
	getDataById,
	getDataSelect,
	lastClaim,
	totalPoint,
	getClaimPoints
};
