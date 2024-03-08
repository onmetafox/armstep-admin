import axios from "axios";

export default function (baseURL) {
    const Axios = axios.create({
        responseType: 'json',
        baseURL: baseURL ? `/api/${baseURL}` : '/',
    });
    Axios.interceptors.request.use(function (config) {
        config.headers.Authorization = localStorage.getItem('token');
        return config;
    });
    return Axios;
}