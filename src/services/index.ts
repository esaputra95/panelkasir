import axios from 'axios';

const api = axios.create();

api.interceptors.request.use(
    config => {
        // Mendapatkan token dari tempat penyimpanan yang sesuai (localStorage, cookie, dll.)
        const token = localStorage.getItem('token');

            config.baseURL = 'http://localhost:3000'
        // Menambahkan header Authorization ke setiap permintaan dengan token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export {api}