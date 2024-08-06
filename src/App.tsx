import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ThemeRouters from './routers'
import "react-toastify/dist/ReactToastify.css";
import 'react-phone-number-input/style.css'
import 'quill/dist/quill.snow.css';
import "./i18n";
import { ToastContainer } from 'react-toastify';
import { Font } from '@react-pdf/renderer';


Font.register({
    family: 'Roboto', 
    fonts : [
        {src: './../../../../src/assets/fonts/Roboto/Roboto-Thin.ttf', fontWeight: 'ultralight'},
        {src: './../../../../src/assets/fonts/Roboto/Roboto-Light.ttf', fontWeight: 'light'},
        {src: './../../../../src/assets/fonts/Roboto/Roboto-Bold.ttf', fontWeight: 'bold'},
        {src: './../../../../src/assets/fonts/Roboto/Roboto-Medium.ttf', fontWeight: 'medium'},
    ]
});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            networkMode: 'online'
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
