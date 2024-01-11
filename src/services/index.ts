import axios from 'axios';

const api = axios.create();

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        config.baseURL = 'http://localhost:3000'
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
        const token = localStorage.getItem('token');
        config.baseURL = 'http://localhost:3000'
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