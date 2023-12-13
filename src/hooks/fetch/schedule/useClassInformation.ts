import { ClassInformationInterface, StudyGroup, TableClassInformationInterface } from "../../../interfaces/schedule/ClassInformationInterface";
import url from "../../../services/url";
import { ClassInformationDummy } from "../../../utils/dummy/scheduleDummy";
import { ChangeEvent, useState } from "react";
import { getData } from "../../models/schedule/classInformationModel";

export const useClassInformation = () => {
    const { ClassInformation } = url
    const [ query, setQuery ] = useState<ClassInformationInterface>(ClassInformationDummy);
    const [ dataClassInformation, setDataClassInformation] = useState<StudyGroup[][]>()

    const handleOnChange = (e:ChangeEvent<HTMLInputElement>)=> {
        setQuery({
            ...query,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSearch = async (queryData:ClassInformationInterface) => {
        const data:TableClassInformationInterface = await getData(ClassInformation.get, queryData);
        setDataClassInformation(data.data)
    }

    return{
        query,
        handleOnChange,
        handleOnSearch,
        dataClassInformation
    }
}