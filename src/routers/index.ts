import { useRoutes } from 'react-router-dom';
import MainRouters from './MainRouter';
import AuthRouters from './AuthRouter';

const ThemeRouters = () => {
    return useRoutes([...MainRouters, ...AuthRouters]);
}

export default ThemeRouters