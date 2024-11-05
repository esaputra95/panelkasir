import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import store from './redux/store.ts'
import { ThemeProvider } from "@material-tailwind/react";
import { CookiesProvider } from 'react-cookie'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
    <ThemeProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
    </ThemeProvider></CookiesProvider>
  </React.StrictMode>,
)
