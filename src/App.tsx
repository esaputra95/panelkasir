import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ThemeRouters from './routers'

const queryClient = new QueryClient()

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeRouters />
        </QueryClientProvider>
    )
}

export default App
