import { useRoutes } from 'react-router-dom';
import MainRouters from './MainRouter';
import AuthRouters from './AuthRouter';
import PublicRouters from './PublicRouter';

const ThemeRouters = () => {
    return useRoutes([...MainRouters, ...AuthRouters, ...PublicRouters]);
}

export default ThemeRouters