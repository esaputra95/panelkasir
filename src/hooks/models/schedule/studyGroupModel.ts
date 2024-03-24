import { api } from "../../../services";
import { StudentGroupQueryInterface, StudyGroupInputForm, StudyGroupInterface } from "../../../interfaces/schedule/studyGroupInterface";
import { AxiosError } from "axios";
import { StudyGroupDetailInterface } from "../../../interfaces/schedule/studyGroupDetailInterface";

interface ParamStudyGroupInterface extends StudentGroupQueryInterface {
	page?: number,
	limit?: number,
	order?: string
}

type StudyGroupDetailPostInterface = Omit<StudyGroupDetailInterface, 'student'>

type StudyGroupPostInterface = Omit<StudyGroupInterface, 'class' | 'guidanceType'>

const getData = async (url:string, params:ParamStudyGroupInterface) => {
	try {
		const response = await api.get(url, { params: { ...params } });
		return response.data
	} catch (error) {
		throw error as AxiosError
	}
};

const postData = async (url:string, data:StudyGroupInputForm) => {
	try {
		const studyGroup:StudyGroupPostInterface = {
			...data.studyGroup,
			classId: data.studyGroup.classId,
			guidanceTypeId: data.studyGroup.guidanceTypeId,
			name: data.studyGroup.name,
			total: data.studyGroup.total
		}
		let studyGroupDetail:StudyGroupDetailPostInterface[]=[];
		for (let index = 0; index < data.studyGroupDetails.length; index++) {
			studyGroupDetail=[...studyGroupDetail,
				{
					...data.studyGroupDetails[index],
					studentId: data.studyGroupDetails[index].studentId
				}
			]
		}
		if(data.studyGroup.id){
			return await api.put(`${url}/${data.studyGroup.id}`, {
				studyGroup: studyGroup,
				studyGroupDetails: studyGroupDetail
			});
		}else{
			return await api.post(url, {
				studyGroup: studyGroup,
				studyGroupDetails: studyGroupDetail
			});
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

const getDataSelect = async (url:string, params: {name: string}) => {
	try {
		const response = await api.get(url, {params: {...params}})
		return response.data
	} catch (error) {
		const err = error as AxiosError
		throw err;
	}
}

export { getData, postData, deleteData, getDataById, getDataSelect };
