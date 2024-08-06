import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const useLocatioanName = () => {
    const { t } = useTranslation();
    const location = useLocation();
    return {
        pathName: t(location.pathname.split('/')[1]),
        pathNameOriginal: location.pathname.split('/')[1]
    }
}

export default useLocatioanName