import { api } from "../../services";
import { UserInterface, UserSearchType } from "../../interfaces/userInterface";

interface ParamUserInterface extends UserSearchType {
  	page?: number,
	limit?: number,
	order?: string
}

const getUser = async (url:string, params:ParamUserInterface) => {
	try {
		const response = await api.get(url, { params: { ...params } });
		if (response.status === 200) return response.data;
		throw new Error(`Request failed with status ${response.status}`);
	} catch (error) {
		return `${error}`;
	}
};

const postUser = async (url:string, data:UserInterface) => {
	try {
		const response = await api.post(url, data);
		if(response.status === 200) return response.data
		throw new Error(`Request failed with status ${response.status}`);
	} catch (error) {
		throw new Error(`An error occurred: ${error}`);
	}
}

export { getUser, postUser };
