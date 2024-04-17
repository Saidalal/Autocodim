import LocalStorage from "./StorageUtil/LocalStorage";
import axios from 'axios';

const customFetch = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});


customFetch.interceptors.request.use((config) => {
  const user = LocalStorage.isLoggedIn();
  if (user) {
    config.headers["Authorization"] = `Bearer ${LocalStorage.getPassword()}`;
  }
  return config;
});

export const getHelper = async (url, setState,params, successMsg, errorMsg) => {
  try {
    const response = await customFetch.get(url, { params });
    // toast.success(successMsg)
    setState(response.data)
    
  } catch (error) {
    // toast.error(errorMsg)
  }
};

export const postHelper = async (url, data, successMsg, errorMsg) => {
  try {
    const response = await customFetch.post(url, data);
    // toast.success(successMsg)
    return response.data;
  } catch (error) {
    // toast.error(errorMsg)
  }
};