import axios from 'axios';
import { refresh } from './AuthService';
import { useAuthContext } from '../contexts/AuthContext';

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
  async function (error) {
    try {
      const originalRequest = error.config;
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const user = JSON.parse(localStorage.getItem('restaurappUser'));
        const access_token = await refresh({ refreshToken: user.refreshToken });
        if (access_token) {
          const data = {
            ...user,
            token: access_token.data.token,
            refreshToken: access_token.data.refreshToken,
          };
          localStorage.setItem('restaurappUser', JSON.stringify(data));
          http.defaults.headers.common['Authorization'] = access_token.token;
          return http(originalRequest);
        } else {
          console.log('object');
          localStorage.removeItem('restaurappUser');
        }
      }
      return Promise.reject(error);
    } catch (error) {
      localStorage.clear();
      window.location.assign('/login');
    }
  }
);

export default http;
