//Base Axios API
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.jayourbae.biz.id/api', 
});

api.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
