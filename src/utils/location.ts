import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const useLocatioanName = () => {
    const { t } = useTranslation();
    const location = useLocation()
    return {
        pathName: t(location.pathname.replace('/', '').split('/').slice(-1)[0]),
        pathNameOriginal: location.pathname.replace('/', '').split('/').slice(-1)[0]
    }
}

export default useLocatioanName