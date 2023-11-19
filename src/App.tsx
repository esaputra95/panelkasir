import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ThemeRouters from './routers'
import "react-toastify/dist/ReactToastify.css";
import 'react-phone-number-input/style.css'
import "./i18n";
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient()

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer autoClose={3000} draggable={true} />
            <ThemeRouters />
        </QueryClientProvider>
    )
}

export default App
