import { AxiosError, AxiosResponse } from "axios";
import { api } from "../../../services";
import { OptionSelectInterface } from "../../../interfaces/globalInterface";

const getDataSelect = async (url:string, params: {name: string}) => {
	try {
		const response: AxiosResponse = await api.get<OptionSelectInterface[]>(url, {params: {...params}})
		return response.data.data.student
	} catch (error) {
		const err = error as AxiosError
		return err;
	}
}

export { getDataSelect }