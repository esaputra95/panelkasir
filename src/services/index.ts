import axios from "axios";

export const getToken = () => {
    return window.localStorage.getItem('token')
}
export const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'X-Custom-Header': 'foobar',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
    }
});