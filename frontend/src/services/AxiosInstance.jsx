import axios from 'axios';
import { store } from '../store/store';

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
});

axiosInstance.interceptors.request.use((config) => {

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  if (userDetails?.token) {
    config.headers.Authorization = `Bearer ${userDetails.token}`;
  }

  return config;
});

export default axiosInstance;
