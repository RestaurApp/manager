import axios from 'axios';

const http = axios.create({
  baseURL: 'https://restaur-api.herokuapp.com/',
  withCredentials: true
});

export default http