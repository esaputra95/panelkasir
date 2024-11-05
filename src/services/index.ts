import axios from 'axios';
import { Cookies } from 'react-cookie';

const api = axios.create();
const cookies = new Cookies();

api.interceptors.request.use(
    config => {
        const token = cookies.get('token');
        config.baseURL = import.meta.env.VITE_API_URL
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const apiImage = axios.create();

apiImage.interceptors.request.use(
    config => {
        const token = cookies.get('token');
        config.baseURL = import.meta.env.VITE_API_URL
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers['Content-Type'] = "multipart/form-data";
        config.headers['Accept'] = "application/json"
        config.headers['X-Custom-Header'] = 'foobar'
        
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

export {api, apiImage}