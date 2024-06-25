import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ThemeRouters from './routers'
import "react-toastify/dist/ReactToastify.css";
import 'react-phone-number-input/style.css'
import 'quill/dist/quill.snow.css';
import "./i18n";
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

const App = () => {
    return (
        <QueryClientProvider  client={queryClient} >
            <ToastContainer className='w-6/12' autoClose={3000} draggable={true} />
            <ThemeRouters />
        </QueryClientProvider>
    )
}

export default App
