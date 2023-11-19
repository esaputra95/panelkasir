import { api } from "../../../services";
import { RoomInterface, RoomSearchInterface } from "../../../interfaces/master/roomInterface";

interface ParamRoomInterface extends RoomSearchInterface {
  	page?: number,
	limit?: number,
	order?: string
}

const getData = async (url:string, params:ParamRoomInterface) => {
	const response = await api.get(url, { params: { ...params } });
	return response.data
};

const postData = async (url:string, data:RoomInterface) => {
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
		throw error;
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
		if(response.status===200) return response.data.data.Room
	} catch (error) {
		return error
	}
}

export { getData, postData, deleteData, getDataById };
