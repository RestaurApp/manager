import axios from 'axios';

const http = axios.create({
  baseURL: 'https://restaur-api.herokuapp.com/',
  withCredentials: true
});

const localStorageUser = JSON.parse(localStorage.getItem('restaurappUser'))

const localStorageToken = localStorageUser ? localStorageUser.token : ''
console.log(localStorageToken)
http.interceptors.request.use(
  async (config) => {
    config.headers = {
      ...config.headers,
      Authorization: localStorageToken,
      'Content-Type': 'application/json',
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default http