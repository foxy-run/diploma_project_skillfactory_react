import axios from 'axios';

export const API_URL = process.env.REACT_APP_BASE_URL;
console.log(API_URL)

const api = axios.create({
    withCredentials: false,
    baseURL: API_URL,
    headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

export default api;