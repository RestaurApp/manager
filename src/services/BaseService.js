import axios from 'axios';

const http = axios.create({
  baseURL: 'https://restaur-api.herokuapp.com/',
  withCredentials: true
});

http.interceptors.request.use(
  async (config) => {
    config.headers = {
      ...config.headers,
      Authorization: JSON.parse(localStorage.getItem('restaurappUser'))?.token ,
      'Content-Type': 'application/json',
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default http