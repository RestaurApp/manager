import http from './BaseService';

export const loginUser = user => http.post('users/login', user)
 
export const registerUser = user => http.post('users/signup', user)
