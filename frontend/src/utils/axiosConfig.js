import axios from 'axios';
import Cookies from 'js-cookie';
import useAuthStore from '../store/authStore';


axios.interceptors.request.use(
    (config) => {
        const token = Cookies.get("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
        try {
            const response = await axios.post("auth/api/token/refresh/");
            const { access, refresh } = response.data;
            useAuthStore.getState().setToken(access, refresh); // Use setToken directly
            originalRequest.headers.Authorization = `Bearer ${access}`;
            return axios(originalRequest);
        } catch (error) {
            console.error("Token refresh error:", error);
        }
        }
        return Promise.reject(error);
    }
);