import { useState } from "react";
import { OptionSelectInterface } from "../../../interfaces/globalInterface";
import url from "../../../services/url";
import { getDataSelect } from "../../models/globalModel";

const useStore = () => {
    const [ dataOptionStore, setDataOptionStore] = useState<OptionSelectInterface[]>([{value:'', label:''}])
    const optionStore = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(url.store.select, {name: data});
        if(response.status){
            setDataOptionStore(response.data.store);
            return response.data.store
        }
        return [{value:'', label:''}]
    }

    return {
        optionStore,
        dataOptionStore
    }
};

export default useStore;