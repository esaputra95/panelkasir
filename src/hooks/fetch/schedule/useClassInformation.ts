import {
    ClassInformationInterface,
    StudyGroup,
    TableClassInformationInterface
} from "../../../interfaces/schedule/ClassInformationInterface";
import url from "../../../services/url";
import { ClassInformationDummy } from "../../../utils/dummy/scheduleDummy";
import { useState } from "react";
import { getData } from "../../models/schedule/classInformationModel";

export const useClassInformation = () => {
    const { ClassInformation } = url
    const [ query, setQuery ] = useState<ClassInformationInterface>(ClassInformationDummy);
    const [ dataClassInformation, setDataClassInformation] = useState<StudyGroup>({room:[], event:[]})

    const handleOnChange = (name:string, value:string)=> {
        setQuery({
            ...query,
            [name]: value
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