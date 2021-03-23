import axios from 'axios';
import { refresh } from './AuthService';

const http = axios.create({
  baseURL: 'https://restaur-api.herokuapp.com/',
  withCredentials: true,
});

http.interceptors.request.use(
  async (config) => {
    config.headers = {
      ...config.headers,
      Authorization: JSON.parse(localStorage.getItem('restaurappUser'))?.token,
      'Content-Type': 'application/json',
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const user = JSON.parse(localStorage.getItem('restaurappUser'));
      refresh({ refreshToken: user.refreshToken })
        .then((access_token) => {
          const data = {
            ...user,
            token: access_token.data.token,
            refreshToken: access_token.data.refreshToken,
          };
          localStorage.setItem('restaurappUser', JSON.stringify(data));
          http.defaults.headers.common['Authorization'] = access_token.token;
          return http(originalRequest);
        })
        .catch((error) => {
          localStorage.clear();
          window.location.assign('/login');
        });
    }
    return Promise.reject(error);
  }
);

export default http;
